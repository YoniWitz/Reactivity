using System.Threading.Tasks;
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
         //POST api/appusers/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<AppUserDTO>> Login(AppUserLoginDTO appUserLoginDTO){
            var loggedInUser = await _appUserApp.Login(appUserLoginDTO);
            if(loggedInUser == null)
            {
                return NotFound();
            }
            return loggedInUser;
        }
        //POST api/appusers/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<AppUserDTO>> Register(AppUserRegisterDTO appUserRegisterDTO){
            var registeredUserDTO = await _appUserApp.Register(appUserRegisterDTO);
            if(registeredUserDTO.Message.Count > 0)
            {
                 return BadRequest(registeredUserDTO.Message);
            }
              return Created("", registeredUserDTO);
        }
    }
}