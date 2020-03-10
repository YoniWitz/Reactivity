using System.Threading.Tasks;
using Application;
using Application.Interfaces;
using Domain.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppUsersController : BaseController
    {
        private readonly IAppUserApp _appUserApp;

        public AppUsersController(IAppUserApp appUserApp)
        {
            _appUserApp = appUserApp;
        }
         //POST api/appusers
        [HttpPost("login")]
        public async Task<ActionResult<AppUserDTO>> Login(AppUserDTO appUserDTO){
            var loggedInUser = await _appUserApp.Login(appUserDTO);
            if(loggedInUser == null)
            {
                return NotFound();
            }
            return loggedInUser;
        }
    }
}