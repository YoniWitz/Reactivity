using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
     public interface IActivitiesApp : IDisposable
    {   
           Task<List<Activity>> GetActivities();

        // void InsertBlog(Activity blog);

        // void Save();
    }
    
}