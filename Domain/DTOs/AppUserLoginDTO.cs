using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class AppUserLoginDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}