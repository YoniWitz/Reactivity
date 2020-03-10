using System;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Domain.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Application
{
    public class AppUserApp : IAppUserApp
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        public AppUserApp(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<AppUserDTO> Login(AppUserDTO appUserDto)
        {
            var appUser = await _userManager.FindByEmailAsync(appUserDto.Email);

            var result = await _signInManager.CheckPasswordSignInAsync(appUser, appUserDto.Password, false);

            if (result.Succeeded)
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
                 Email = appUser.Email
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