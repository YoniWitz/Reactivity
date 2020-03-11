using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Domain.DTOs;
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
        public AppUserApp(DataContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<AppUserDTO> Register(AppUserRegistrationDTO appUserRegistrationDTO)
        {
            var appUserDTO = new AppUserDTO();

            if (await _context.Users.Where(x => x.Email == appUserRegistrationDTO.Email).AnyAsync())
            {
                appUserDTO.ErrorMessage = "Email already in system";
                return appUserDTO;
            }
            if (await _context.Users.Where(x => x.UserName == appUserRegistrationDTO.UserName).AnyAsync())
            {
                appUserDTO.ErrorMessage = "User name already in system";
                return appUserDTO;
            }
            var newUser = new AppUser
            {
                DisplayName = appUserRegistrationDTO.UserName,
                Email = appUserRegistrationDTO.Email,
                UserName = appUserRegistrationDTO.UserName
            };

            var newUserResult = await _userManager.CreateAsync(newUser, appUserRegistrationDTO.Password);

            if (newUserResult.Succeeded)
            {
                appUserDTO.DisplayName = newUser.DisplayName;
                appUserDTO.Token = _jwtGenerator.CreateToken(newUser);
                appUserDTO.UserName = newUser.UserName;
                appUserDTO.Image = null;
            }

            else
            {
                appUserDTO.ErrorMessage = "Error registering new user";
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