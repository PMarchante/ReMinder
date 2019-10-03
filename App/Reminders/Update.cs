using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using App.Errors;
using App.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Reminders
{
    public class Update
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public DateTime? Date { get; set; }
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
                var reminder = await _context.Reminders.FindAsync(request.Id);
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var userId = user.Id;

                if (reminder != null && userId == reminder.UserId)
                {
                    reminder.Title = request.Title ?? reminder.Title;
                    reminder.Date = request.Date ?? reminder.Date;
                    reminder.Description = request.Description ?? reminder.Description;
                    reminder.Location = request.Location ?? reminder.Location;

                    var success = await _context.SaveChangesAsync() > 0;

                    if (success)
                        return Unit.Value;
                }

                throw new RestException(HttpStatusCode.BadRequest, new { reminder="Could not update reminder"});
            }
        }
    }
}