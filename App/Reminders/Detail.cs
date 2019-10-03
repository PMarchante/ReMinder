using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using App.Errors;
using App.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Reminders
{
    public class Detail
    {
        public class Query : IRequest<ReminderDTO>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ReminderDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _mapper = mapper;
                _context = context;
            }

            public async Task<ReminderDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var reminder = await _context.Reminders.FindAsync(request.Id);
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var userId = user.Id;
                if (reminder != null && userId==reminder.UserId)
                {
                    var detailedReminder = _mapper.Map<Reminder, ReminderDTO>(reminder);

                    return detailedReminder;
                }
                throw new RestException(HttpStatusCode.NotFound, new { Reminder = "Could not find reminder" });
            }
        }



    }
}