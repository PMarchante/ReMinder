using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using App.Errors;
using MediatR;
using Persistence;

namespace App.Reminders
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var reminder = await _context.Reminders.FindAsync(request.Id);

                if(reminder != null){
                    _context.Reminders.Remove(reminder);
                    var success = await _context.SaveChangesAsync() > 0;
                }
                else 
                    throw new RestException(HttpStatusCode.NotFound, new {Reminder = "Could not find reminder"});
                
                return Unit.Value;
            }
        }
    }
}