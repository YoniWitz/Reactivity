using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.DTOs
{
    public class ActivityDTO
    {
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public DateTime? Date { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Venue { get; set; }
        public string Message { get; set; }
        [JsonPropertyName("attendees")]
        public ICollection<AttendeeDTO> UserActivities { get; set; }

    }
}