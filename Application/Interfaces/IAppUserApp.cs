using System;
using System.Threading.Tasks;
using Domain.DTOs;

namespace Application.Interfaces
{
    public interface IAppUserApp  : IDisposable
    {
           Task<AppUserDTO> Login(AppUserDTO appUserDto);
           Task<AppUserDTO> Register(AppUserRegistrationDTO appUserDto);
    }
}