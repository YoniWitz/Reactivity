using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
    public interface IActivitiesApp : IDisposable
    {
        Task<List<Activity>> GetActivities();

        Task<Activity> GetActivity(Guid id);

        Task<bool> PostActivity(Activity activity);

        Task<Activity> PutActivity(Activity activity);

        Task<bool> DeleteActivity(Guid id);
    }

}