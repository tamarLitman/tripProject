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
        IUserDal udal;
        IMapper mapper;
        public TripBll(ITripDal dal,IUserDal udal)
        {
            this.dal = dal;
            this.udal = udal;
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
        }

        public async Task<bool> DeleteTrip(int id)
        {
             return await dal.DeleteTrip(id);
        }

        public async Task<List<TripDto>> GetAllTrips()
        {
            List<Trip> trips=await dal.GetAllTrips();
            if(trips!=null)
            {
                 List<TripDto> lt = mapper.Map<List<Trip>, List<TripDto>>(trips);
                for(int i = 0;i<lt.Count; i++)
                {
                    List<BookingPlace> lbp = await dal.GetInvitesToTrip(lt[i].TripCode);
                    if (lbp != null)
                    {
                        foreach (var bp in lbp)
                        {
                            User u = await udal.GetById(bp.UserCode);
                            if (u.FirstAidCertificate == true)
                                lt[i].IsFirstAid = true;
                        }
                    }
                }
                return lt;
            }
            return null;
       
        }

        public async Task<List<BookingPlaceDto>> GetInvitesToTrip(int code)
        {
            List<BookingPlace> b=await dal.GetInvitesToTrip(code);
            return mapper.Map<List<BookingPlaceDto>>(b);
        }

        public async Task<TripDto> GetTripByid(int id)
        {
            Trip t=await dal.GetTripById(id);
            bool isFirstAid = false;
            //puts true if firstaid
            if (t != null)
            {
                
                List<BookingPlace> lbp = await dal.GetInvitesToTrip(t.TripCode);
                if (lbp != null)
                {
                    foreach (var bp in lbp)
                    {
                        User u = await udal.GetById(bp.UserCode);
                        if (u.FirstAidCertificate == true)
                            isFirstAid = true;
                    }
                }
            }
            TripDto trip= mapper.Map<Trip, TripDto>(t);
            if (t != null)
            {
                trip.IsFirstAid = isFirstAid;
            }
            return trip;
        }

   
        public async Task<bool> UpdateTrip(TripDto trip)
        {
            if (trip.TripDate<DateTime.Now && trip.TripDurationHours >= 3 && trip.TripDurationHours < 12 && trip.AvailablePlaces > 0 && trip.Price < 500 && trip.Price > 0)
                return await dal.UpdateTrip(mapper.Map<TripDto, Trip>(trip));
            return false;
        }
    }
}
