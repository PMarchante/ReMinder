using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Persistence;
using MediatR;
using App.Reminders;
using Domain;
using Microsoft.AspNetCore.Identity;
using FluentValidation.AspNetCore;
using App.User;
using API.Middleware;
using App.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {   services.AddDbContext<DataContext>(opt =>{
            opt.UseSqlite(Configuration.GetConnectionString("Default Connection"));
        });
            services.AddMvc().AddFluentValidation(cnfg => cnfg.RegisterValidatorsFromAssemblyContaining<Login>())
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors(pol => pol.AddPolicy("Policy", p =>{
                p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
            }));
            services.AddMediatR(typeof(Login.Handler).Assembly);

            //add the services needed for identity
            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            services.AddScoped<IJwtGenerator, JwtGenerator>();

            var 
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt => {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key
                }
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseMiddleware<ErrorHandlingMiddleware>();
                //app.UseDeveloperExceptionPage();
            }
            else
            {
                
               
            }
            app.UseCors("Policy");
            app.UseMvc();
        }
    }
}
