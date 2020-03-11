using System.Threading.Tasks;
using Application;
using Application.Interfaces;
using Domain.DTOs;
using Microsoft.AspNetCore.Authorization;
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
        [AllowAnonymous]
        public async Task<ActionResult<AppUserDTO>> Login(AppUserDTO appUserDTO){
            var loggedInUser = await _appUserApp.Login(appUserDTO);
            if(loggedInUser == null)
            {
                return NotFound();
            }
            return loggedInUser;
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<AppUserDTO>> Register(AppUserRegistrationDTO appUserRegistrationDTO){
            var registeredUserDTO = await _appUserApp.Register(appUserRegistrationDTO);
            if(registeredUserDTO == null)
            {
                 return BadRequest("error");
            }
              return registeredUserDTO;
        }
    }
}