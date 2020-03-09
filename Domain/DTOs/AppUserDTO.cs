using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class AppUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
    }
}