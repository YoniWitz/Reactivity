using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Domain.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class AppUserApp : IAppUserApp
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
       
        public AppUserApp(IHttpContextAccessor httpContextAccessor, DataContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<AppUserDTO> Register(AppUserRegisterDTO appUserRegisterDTO)
        {
            var appUserDTO = new AppUserDTO();

            if (await _context.Users.Where(x => x.Email == appUserRegisterDTO.Email).AnyAsync())
            {
                appUserDTO.Message.Add("Email already in system");
            }
            // if (await _context.Users.Where(x => x.UserName == appUserRegisterDTO.UserName).AnyAsync())
            // {
            //     appUserDTO.Message.Add("User name already in system");
            // }
            var newUser = new AppUser
            {
                DisplayName = appUserRegisterDTO.UserName,
                Email = appUserRegisterDTO.Email,
                UserName = appUserRegisterDTO.UserName
            };

            var newUserResult = await _userManager.CreateAsync(newUser, appUserRegisterDTO.Password);

            if (newUserResult.Succeeded)
            {
                appUserDTO.DisplayName = newUser.DisplayName;
                appUserDTO.Token = _jwtGenerator.CreateToken(newUser);
                appUserDTO.UserName = newUser.UserName;
                appUserDTO.Image = null;
            }
            else
            {
                 foreach(var Error in newUserResult.Errors)
                     appUserDTO.Message.Add(Error.Description);
            }
            return appUserDTO;
        }

        public async Task<AppUserDTO> Login(AppUserLoginDTO appUserLoginDto)
        {
            var appUser = await _userManager.FindByEmailAsync(appUserLoginDto.Email);

            var appUserResult = await _signInManager.CheckPasswordSignInAsync(appUser, appUserLoginDto.Password, false);

            if (appUserResult.Succeeded)
            {
                return new AppUserDTO
                {
                    DisplayName = appUser.DisplayName,
                    Token = _jwtGenerator.CreateToken(appUser),
                    UserName = appUser.UserName,
                    Image = null
                };
            }
            return null;
        }

        public string GetCurrentUsername()
        {
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return username;
        }
        private static AppUserDTO AppUserToDTO(AppUser appUser) =>
             new AppUserDTO
             {
                //  Email = appUser.Email
             };

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _userManager.Dispose();
                    // _signInManager.Dispose();
                }
            }
            _disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


    }
}