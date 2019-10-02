using System.Net;
using System.Threading;
using System.Threading.Tasks;
using App.Errors;
using App.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace App.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string email { get; set; }
            public string password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(e => e.email).NotEmpty().EmailAddress();
                RuleFor(p => p.password).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _signInManager = signInManager;
                _userManager = userManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.email);

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.password, false);

                if (result.Succeeded)
                    
                    return new User
                    {
                        Username = user.UserName,
                        Token = _jwtGenerator.CreateToken(user),
                        Email = user.Email
                    };

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}