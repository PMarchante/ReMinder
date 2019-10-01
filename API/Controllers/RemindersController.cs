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
    public class RemindersController : BaseController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<Reminder>>> List ()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}