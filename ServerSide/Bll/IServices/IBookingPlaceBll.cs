using Dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.IServices
{
    public interface IBookingPlaceBll
    {
        Task<List<BookingPlaceDto>> GetAllBookingPlace();
        Task<List<BookingPlaceDto>> GetBookingPlaceByTrip(int code);
        Task<int> AddPlace(BookingPlaceDto dto);
        Task<bool> RemovePlace(int id);
    }
}
