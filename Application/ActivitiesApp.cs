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

        public async Task<ActivityDTO> GetActivity(Guid id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null) return null;
            return ActivityToDTO(activity);
        }

        public async Task<List<ActivityDTO>> GetActivities()
        {
            var activitiesDTOs = await _context.Activities.Select(x => ActivityToDTO(x)).ToListAsync();
            return activitiesDTOs;
        }

        public async Task<ActivityDTO> PostActivity(ActivityDTO activityDTO)
        {
            var activity = new Activity
            {
                Id = activityDTO.Id,
                Category = activityDTO.Category,
                City = activityDTO.City,
                Date = activityDTO.Date,
                Description = activityDTO.Description,
                Title = activityDTO.Title,
                Venue = activityDTO.Venue
            };

            _context.Activities.Add(activity);
            var success = await _context.SaveChangesAsync() > 0;

            if (success) return ActivityToDTO(activity);
            else return null;
        }

        public async Task<ActivityDTO> PutActivity(ActivityDTO activityDTO)
        {
            var currentActivity = await _context.Activities.FindAsync(activityDTO.Id);
            if (currentActivity == null)
            { return new ActivityDTO { Message = "Activity not found" }; }

            currentActivity.Category = activityDTO.Category ?? currentActivity.Category;
            currentActivity.Title = activityDTO.Title ?? currentActivity.Title;
            currentActivity.City = activityDTO.City ?? currentActivity.City;
            currentActivity.Date = activityDTO.Date ?? currentActivity.Date;
            currentActivity.Description = activityDTO.Description ?? currentActivity.Description;
            currentActivity.Venue = activityDTO.Venue ?? currentActivity.Venue;

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return ActivityToDTO(currentActivity);
            { return new ActivityDTO { Message = "Error updating activity" }; }
        }

        public async Task<bool> DeleteActivity(Guid id)
        {
            var activity = await _context.Activities.FindAsync(id);

            if (activity == null)
                return false;

            _context.Activities.Remove(activity);
            var success = await _context.SaveChangesAsync() > 0;

            if (success) return true;
            return false;
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
