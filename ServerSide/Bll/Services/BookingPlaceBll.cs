using AutoMapper;
using Bll.IServices;
using Dal.IRepositories;
using Dal.Modules;
using Dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Services
{
    public class BookingPlaceBll : IBookingPlaceBll
    {
        IBookingPlaceDal dal;
        IMapper mapper;
        public BookingPlaceBll(IBookingPlaceDal dal)
        {
            this.dal = dal;

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Dto.Classes.Mapper>();
            });
            mapper = config.CreateMapper();
        }

        public async Task<int> AddPlace(BookingPlaceDto bp)
        {
            if (bp.NumOfPlaces > 0 && bp.TripDate>DateTime.Now)
            {
                
                BookingPlace b=mapper.Map<BookingPlace>(bp);
               
                b.BookingTime=(TimeSpan?)DateTime.Now.TimeOfDay;
                b.BookingDate=DateTime.Now;
                return await dal.AddBookingPlace(b);

         
            }
            return -1;
        }
            
        public async Task<List<BookingPlaceDto>> GetBookingPlaceByTrip(int code)
        {
            List<BookingPlace> b=await dal.GetBookingPlaceByTrip(code);
            return mapper.Map<List<BookingPlaceDto>>(b);
        }

        public async Task<List<BookingPlaceDto>> GetAllBookingPlace()
        {
            List<BookingPlace> l=await dal.GetAllBookingPlace();
            return mapper.Map<List<BookingPlaceDto>>(l);
        }

        public async Task<bool> RemovePlace(int id)
        {
            return await dal.DeleteBookingPlace(id);
        }
    }
}
