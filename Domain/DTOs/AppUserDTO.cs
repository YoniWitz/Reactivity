using System.Collections.Generic;

namespace Domain.DTOs
{
    public class AppUserDTO
    {
        public AppUserDTO()
        {
            Message = new List<string>();
        }

        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public List<string> Message { get; set; }
    }
}