using Dal.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.IRepositories
{
    public interface ITripDal
    {
        Task<List<Trip>> GetAllTrips();
        Task<Trip> GetTripById(int code);
        Task<List<BookingPlace>> GetInvitesToTrip(int code);
        Task<int> AddTrip(Trip trip);
        Task<bool> DeleteTrip(int code);
        Task<bool> UpdateTrip(Trip trip);
        Task<bool> isFirstAid(Trip trip);

    }
}
