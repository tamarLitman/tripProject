using Dal.IRepositories;
using Dal.Modules;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Repositories
{
    public class TripDal : ITripDal
    {
        TripsContext db;
        public TripDal(TripsContext db)
        { this.db = db; }

        public async Task<int> AddTrip(Trip trip)
        {
            try
            {
                trip.DepartureTime = TimeSpan.Zero;
                
                 await db.Trips.AddAsync(trip);
                 await db.SaveChangesAsync();
                return trip.TripCode;
            }
            catch 
            {
                return -10;
            }
        }

        public async Task<bool> DeleteTrip(int code)
        {
            try
            {
                var t=await db.Trips.FindAsync(code);
                if (t != null)
                {
                    db.Trips.Remove(t);
                    await db.SaveChangesAsync();
                }
                return true;
            }
            catch 
            {
                return false;            }
            }

        public async Task<List<Trip>> GetAllTrips()
        {
            try
            {
                return await db.Trips
                    .Include(t=>t.TypeCodeNavigation).ToListAsync();
            }
            catch
            {
                return null;
            }
        }
         
        public async Task<List<BookingPlace>> GetInvitesToTrip(int code)
        {
            return await db.BookingPlaces.Where(t=>t.TripCode== code).ToListAsync();
        }

        public async Task<Trip> GetTripById(int code)
        {
            try
            {
                var trip= await db.Trips
                    .Include(t => t.TypeCodeNavigation)
                    .FirstOrDefaultAsync(t => t.TripCode == code);
                return trip;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> isFirstAid(Trip trip)
        {
            return true;
        //    try
        //    {
        //        Trip t=await db.Trips.FirstAsync(tt=>tt.TripCode==trip.TripCode);
        //        t.IsFirstAid=
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        }

        public async Task<bool> UpdateTrip(Trip trip)
        {
            try
            {
                if (trip.TripDate > new DateTime())
                {
                    var t = await db.Trips.FindAsync(trip.TripCode);
                    if (t != null)
                    {
                        t.AvailablePlaces = trip.AvailablePlaces;
                        await db.SaveChangesAsync();
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
