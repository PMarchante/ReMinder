using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using App.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Reminders
{
    public class List
    {
        public class Query : IRequest<List<ReminderDTO>> { }

        public class Handler : IRequestHandler<Query, List<ReminderDTO>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _userManager = userManager;
                _context = context;

            }

            public async Task<List<ReminderDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                var reminderList = await _context.Reminder.Where(x => x.UserId == user.Id).ToListAsync();
                
                var reminderToReturn = _mapper.Map<List<Reminder>, List<ReminderDTO>>(reminderList);
                return reminderToReturn;
            }
        }

    }
}