using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class UserActivity
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public System.Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}