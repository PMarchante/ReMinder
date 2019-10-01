using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using App.User;
using Domain;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

    }
}