using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class UserActivity
    {
        [ForeignKey("AppUser")]
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        [ForeignKey("Activity")]
        public System.Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}