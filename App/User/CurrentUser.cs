using System.Threading;
using System.Threading.Tasks;
using App.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace App.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler (IUserAccessor userAccessor, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _userAccessor = userAccessor;
            }

            public async Task<User> Handle (Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                return new User
                {
                    Username = user.UserName,
                    Displayname = user.Displayname,
                    Token = _jwtGenerator.CreateToken(user),
                    Email= user.Email
                };
            }
        }
    }
}