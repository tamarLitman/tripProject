using AutoMapper;
using Dal.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Classes
{
    public class Mapper:Profile
    {

        public Mapper()
        {
            //trip
            CreateMap<Trip, TripDto>()
                .ForMember(dest => dest.TypeName, opt => opt.MapFrom(src => src.TypeCodeNavigation.TypeName));
            CreateMap<TripDto,Trip>()
                .ForMember(dest=>dest.TripCode,opt=>opt.Ignore());
           
            //users
            CreateMap<User, UserDto>().ReverseMap();
            
            //tripType
            CreateMap<TripType,TripTypeDto>().ReverseMap();

            //booking place
            CreateMap<BookingPlaceDto, BookingPlace>();
            CreateMap<BookingPlace, BookingPlaceDto>()
                .ForMember(dest=>dest.UserName,opt=>opt.MapFrom(src=>src.UserCodeNavigation.FirstName+" "+src.UserCodeNavigation.LastName))
                .ForMember(dest=>dest.TripDestination,opt=>opt.MapFrom(src=>src.TripCodeNavigation.TripDestination))
                .ForMember(dest=>dest.TripDate,opt=>opt.MapFrom(src=>src.TripCodeNavigation.TripDate));
        }
    }
}
