using AutoMapper;
using Domain;
using Domain.DTOs;

namespace Application
{
    public class ActivityMapping :Profile
    {
        public ActivityMapping(){
            CreateMap<Activity, ActivityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}