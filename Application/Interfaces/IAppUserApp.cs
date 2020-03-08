using System;
using System.Threading.Tasks;
using Domain.DTOs;

namespace Application.Interfaces
{
    public interface IAppUserApp  : IDisposable
    {
           Task<AppUserDTO> GetAppUserDTO(AppUserDTO appUserDto);
    }
}