using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.DTOs;

namespace Application.Interfaces
{
    public interface IActivitiesApp : IDisposable
    {
        Task<List<ActivityDTO>> GetActivities();

        Task<ActivityDTO> GetActivity(Guid id);

        Task<ActivityDTO> PostActivity(ActivityDTO activityDTO);

        Task<ActivityDTO> PutActivity(ActivityDTO activityDTO);

        Task<bool> DeleteActivity(Guid id);
    }

}