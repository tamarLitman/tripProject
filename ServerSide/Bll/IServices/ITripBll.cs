using Dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.IServices
{
    public interface ITripBll
    {
        Task<List<TripDto>> GetAllTrips();
        Task<TripDto> GetTripByid(int id);
        Task<List<BookingPlaceDto>> GetInvitesToTrip(int code);
        Task<int> AddTrip(TripDto trip);
        Task<bool> UpdateTrip(TripDto trip);
        Task<bool> DeleteTrip(int id);

    }
}
