using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class AppUserRegistrationDTO
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}