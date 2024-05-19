using AutoMapper;
using Bll.IServices;
using Dal.IRepositories;
using Dal.Modules;
using Dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Services
{
    public class TripBll : ITripBll
    {
        ITripDal dal;
        IMapper mapper;
        public TripBll(ITripDal dal)
        {
            this.dal = dal;

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Dto.Classes.Mapper>();
            });
            mapper=config.CreateMapper();
        }

        public async Task<int> AddTrip(TripDto trip)
        {
            if(trip.TripDate>DateTime.Now && trip.TripDurationHours>=3 && trip.TripDurationHours<12 && trip.AvailablePlaces>0 && trip.Price<500 && trip.Price>0)
                 return await dal.AddTrip(mapper.Map<TripDto, Trip>(trip));
            return -1;
            //int code = await dal.AddTrip(mapper.Map<TripDto, Trip>(trip)):
            //    if (code != -1)
            //        return code;
            //    return -1;
        }

        public async Task<bool> DeleteTrip(int id)
        {
             return await dal.DeleteTrip(id);
        }

        public async Task<List<TripDto>> GetAllTrips()
        {
            List<Trip> t=await dal.GetAllTrips();
            //isMedic....
            return mapper.Map<List<Trip>, List<TripDto>>(t);
       
        }

        public async Task<List<BookingPlaceDto>> GetInvitesToTrip(int code)
        {
            List<BookingPlace> b=await dal.GetInvitesToTrip(code);
            return mapper.Map<List<BookingPlaceDto>>(b);
        }

        public async Task<TripDto> GetTripByid(int id)
        {
            Trip t=await dal.GetTripById(id);
            if(t!=null)
                return mapper.Map<Trip,TripDto>(t);
            //isMedic.......
            return null;
        }


        public async Task<bool> UpdateTrip(TripDto trip)
        {
            if (trip.TripDate<DateTime.Now && trip.TripDurationHours >= 3 && trip.TripDurationHours < 12 && trip.AvailablePlaces > 0 && trip.Price < 500 && trip.Price > 0)
                return await dal.UpdateTrip(mapper.Map<TripDto, Trip>(trip));
            return false;
        }
    }
}
