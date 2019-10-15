using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using App.Reminders;
using MediatR;
using Domain;
using API.Controllers;

namespace API
{
    public class ReminderController : BaseController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<ReminderDTO>>> List ()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create (Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit (Guid id ,Update.Command update)
        {   update.Id = id;
            return await Mediator.Send(update);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReminderDTO>> SingleReminder (Guid id)
        {
            
            return await Mediator.Send(new Detail.Query{Id=id});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id=id});
        }
    }
}