using AutoMapper;
using Domain;

namespace App.Reminders
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Reminder, ReminderDTO>();
        }
    }
}