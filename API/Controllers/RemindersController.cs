using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using App.Reminders;
using MediatR;
using Domain;

namespace API
{
    [Route ("api/[controller]")]
    [ApiController]
    public class RemindersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RemindersController (IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<Reminder>>> List ()
        {
            return await _mediator.Send(new List.Query());
        }
    }
}