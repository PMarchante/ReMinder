using System;
using System.Net;
using System.Threading.Tasks;
using App.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke (HttpContext context){
            try{
                await _next(context);
            }
            catch(Exception e){
                await HandleExceptionAsync(context, e, _logger);
            };
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;

            switch(exception)
            {
                case RestException rest:
                logger.LogError(exception, "REST ERROR");
                errors=rest.Error;
                context.Response.StatusCode = (int)rest.Code;
                break;

                case Exception e:
                logger.LogError(exception, "SERVER ERROR");
                errors= string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                break;
            }

            context.Response.ContentType = "application/json";
            if(errors !=null)
            {
                var result = JsonConvert.SerializeObject(new{
                    errors
                });

                await context.Response.WriteAsync(result);
            }
        }
    }
}