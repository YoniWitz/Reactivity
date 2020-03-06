using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
    public interface IActivitiesApp : IDisposable
    {
        Task<List<ActivityDTO>> GetActivitiesDTOs();

        Task<ActivityDTO> GetActivityDTO(Guid id);

        Task<ActivityDTO> PostActivityDTO(ActivityDTO activityDto);

        Task<ActivityDTO> PutActivityDTO(ActivityDTO activityDto);

        Task<bool> DeleteActivity(Guid id);
    }

}