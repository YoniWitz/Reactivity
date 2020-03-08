using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class AppUserDTO
    {
        [Required]
        public string Email {get;set;}
        [Required]
        public string Password {get;set;}
    }
}