using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        private readonly DataContext _context;
        public List(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Activity>> getActivities(){
            var activities = await _context.Activities.ToListAsync();
            return activities;
        }
    }
}
