using System;
using System.Threading.Tasks;
using Domain.DTOs;

namespace Application.Interfaces
{
    public interface IAppUserApp  : IDisposable
    {
           Task<AppUserDTO> Login(AppUserLoginDTO appUserLoginDto);
           Task<AppUserDTO> Register(AppUserRegisterDTO appUserRegisterDTO);
    }
}