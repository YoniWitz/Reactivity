using System;
using System.Collections.Generic;
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

        public async Task<Activity> GetActivity(Guid id)
        {
            var activity = await _context.Activities.FindAsync(id);
            return activity;
        }

        public async Task<List<Activity>> GetActivities()
        {
            var activities = await _context.Activities.ToListAsync();
            return activities;
        }

        public async Task<bool> PostActivity(Activity activity)
        {
            _context.Activities.Add(activity);
            var success = await _context.SaveChangesAsync() > 0;
            
            if (success) return success;
            else throw new Exception("problem saving activity");
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
