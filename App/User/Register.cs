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

namespace App.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string Username { get; set; }
            public string Displayname { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator ()
            {
                RuleFor(x => x.Displayname).NotEmpty();
                RuleFor (e => e.Email).NotEmpty ().EmailAddress ();
                RuleFor (u => u.Username).NotEmpty ();
                RuleFor (p => p.Password).NotEmpty ().MinimumLength(6).WithMessage("Password must be atleast 6 characters")
                .Matches("[A-Z]").WithMessage("Password must contain an uppercase letter")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain a non alphanumeric")
                .Matches("[0-9]").WithMessage("Password must contain a number")
                .Matches("[a-z]").WithMessage("Password must contain a lowercase letter");
            }
        }
        public class Handler : IRequestHandler<Command, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly DataContext _context;
            public Handler (UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, DataContext context)
            {
                _context = context;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<User> Handle (Command request, CancellationToken cancellationToken)
            {
                if(await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new{email="Email is in use"});

                var user = new AppUser
                {
                    Email= request.Email,
                    UserName = request.Username
                };
                var result = await _userManager.CreateAsync(user, request.Password);
                
                if(result.Succeeded)
                {
                    return new User
                    {
                        Username=request.Username,//this is unique
                        Displayname=request.Displayname,
                        Email=request.Email,
                        Token= _jwtGenerator.CreateToken(user)
                    };
                }
                    throw new RestException(HttpStatusCode.BadRequest, new {profile="Error creating user"});
                
            }
        }
    }
}