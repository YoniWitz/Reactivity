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
            if (await _context.Users.Where(x =>
            (x.Email == appUserRegistrationDTO.Email) ||
            (x.UserName == appUserRegistrationDTO.UserName))
            .AnyAsync())
            {
                return null;
            }

            var newUser = new AppUser
            {
                DisplayName = appUserRegistrationDTO.UserName,
                Email = appUserRegistrationDTO.Email,
                UserName = appUserRegistrationDTO.UserName
            };

            var createdUser = await _userManager.CreateAsync(newUser, appUserRegistrationDTO.Password);

            if (createdUser.Succeeded)
            {
                return new AppUserDTO
                {
                    DisplayName = newUser.DisplayName,
                    Token = _jwtGenerator.CreateToken(newUser),
                    UserName = newUser.UserName,
                    Image = null
                };
            }

            return null;
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