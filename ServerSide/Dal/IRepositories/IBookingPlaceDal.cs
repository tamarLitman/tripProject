using Dal.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.IRepositories
{
    public interface IBookingPlaceDal
    {
        Task<List<BookingPlace>> GetAllBookingPlace();   
        Task<List<BookingPlace>> GetBookingPlaceByTrip(int id);
        Task<int> AddBookingPlace(BookingPlace bookingPlace);
        Task<bool> DeleteBookingPlace(int id);
    }
}
