using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using App.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Reminders
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public DateTime Date { get; set; }
            public string Description { get; set; }
            public string Location { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Location).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command>
            {
                private readonly DataContext _context;
                private readonly IUserAccessor _userAccessor;
                public Handler(DataContext context, IUserAccessor userAccessor)
                {
                    _userAccessor = userAccessor;
                    _context = context;
                }

                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {
                    var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername());
                    var reminder = new Reminder
                    {
                        Id= request.Id,
                        Title= request.Title,
                        Date= request.Date,
                        Description= request.Description,
                        Location= request.Location,
                        UserId = user.Id
                    };

                    _context.Reminder.Add(reminder);

                    var success = await _context.SaveChangesAsync() >0;

                    if(success)
                        return Unit.Value;

                    throw new Exception("Couldnt save");
                }
            }
    }
}