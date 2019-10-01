using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Reminders
{
    public class List
    {
        public class Query : IRequest<List<Reminder>> { }

        public class Handler : IRequestHandler<Query, List<Reminder>>
        {
            private readonly DataContext _context;
            public Handler (DataContext context)
            {
                _context = context;

            }

            public async Task<List<Reminder>> Handle(Query request, CancellationToken cancellationToken)
            {
               var reminders = await _context.Reminders.ToListAsync();

               return reminders;
            }
        }

    }
}