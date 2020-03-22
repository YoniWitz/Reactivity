using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.DTOs;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class ActivitiesApp : IActivitiesApp
    {
        private readonly DataContext _context;
        private readonly IAppUserApp _appUserApp;
        private readonly IMapper _mapper;

        public ActivitiesApp(DataContext context, IAppUserApp appUserApp, IMapper mapper)
        {
            _appUserApp = appUserApp;
            _mapper = mapper;
            _context = context;
        }

        public async Task<ActivityDTO> GetActivity(Guid id)
        {
            var activity = await _context.Activities
            .Include(x => x.UserActivities)
            .ThenInclude(x => x.AppUser)
            .SingleOrDefaultAsync(x => x.Id == id);

            if (activity == null) return null;
            return _mapper.Map<Activity, ActivityDTO>(activity);
        }

        public async Task<List<ActivityDTO>> GetActivities()
        {
            var user = await _context.Users.
            SingleOrDefaultAsync(x => x.UserName == _appUserApp.GetCurrentUsername());

            var activities = await _context.Activities
            .Include(x => x.UserActivities)
            .ThenInclude(x => x.AppUser)
            .ToListAsync();

            return _mapper.Map<List<Activity>, List<ActivityDTO>>(activities);
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

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _appUserApp.GetCurrentUsername());

            var attendee = new UserActivity
            {
                AppUser = user,
                Activity = activity,
                IsHost = true,
                DateJoined = DateTime.Now
            };

            _context.UserActivities.Add(attendee);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return _mapper.Map<Activity, ActivityDTO>(activity);
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

            if (success) return _mapper.Map<Activity, ActivityDTO>(currentActivity);
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
    }
}
