using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class ActivitiesApp : IActivitiesApp
    {
        private readonly DataContext _context;
        public ActivitiesApp(DataContext context)
        {
            _context = context;
        }

        public async Task<ActivityDTO> GetActivityDTO(Guid id)
        {
            var activity = await _context.Activities.FindAsync(id);
            return ActivityToDTO(activity);
        }

        public async Task<List<ActivityDTO>> GetActivitiesDTOs()
        {
            var activitiesDtos = await _context.Activities.Select(x => ActivityToDTO(x)).ToListAsync();
            return activitiesDtos;
        }

        public async Task<ActivityDTO> PostActivityDTO(ActivityDTO activityDto)
        {
            var activity = new Activity{
                Id = activityDto.Id,
                 Category = activityDto.Category,
                 City = activityDto.City,
                 Date = activityDto.Date,
                 Description = activityDto.Description,
                 Title = activityDto.Title,
                 Venue = activityDto.Venue
            };

            _context.Activities.Add(activity);
            var success = await _context.SaveChangesAsync() > 0;

            if (success) return ActivityToDTO(activity);
            else throw new Exception("problem saving activity");
        }

        public async Task<ActivityDTO> PutActivityDTO(ActivityDTO activityDto)
        {
            var currentActivity = await _context.Activities.FindAsync(activityDto.Id);
            if (currentActivity == null)
            { return null; }

            currentActivity.Category = activityDto.Category ?? currentActivity.Category;
            currentActivity.Title = activityDto.Title ?? currentActivity.Title;
            currentActivity.City = activityDto.City ?? currentActivity.City;
            currentActivity.Date = activityDto.Date ?? currentActivity.Date;
            currentActivity.Description = activityDto.Description ?? currentActivity.Description;
            currentActivity.Venue = activityDto.Venue ?? currentActivity.Venue;

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return ActivityToDTO(currentActivity);
            else throw new Exception("problem saving activity");
        }

        public async Task<bool> DeleteActivity(Guid id)
        {
            var activity = await _context.Activities.FindAsync(id);

            if (activity == null)
                return false;

            _context.Activities.Remove(activity);
            var success = await _context.SaveChangesAsync() > 0;

            if (success) return true;
            else throw new Exception("error deleting record");
        }

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private static ActivityDTO ActivityToDTO(Activity activity) =>
             new ActivityDTO
             {
                 Id = activity.Id,
                 Category = activity.Category,
                 City = activity.City,
                 Date = activity.Date,
                 Description = activity.Description,
                 Title = activity.Title,
                 Venue = activity.Venue
             };
    }
}
