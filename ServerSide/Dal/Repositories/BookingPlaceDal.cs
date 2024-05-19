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
    public class BookingPlaceDal : IBookingPlaceDal
    {
        TripsContext db;
        public BookingPlaceDal(TripsContext db)
        { this.db = db; }

        public async Task<int> AddBookingPlace(BookingPlace bookingPlace)
        {
            try
            {
                await db.BookingPlaces.AddAsync(bookingPlace);
                await db.SaveChangesAsync();
                return bookingPlace.BookingCode;
            }
            catch
            {
                return -1;
            }
        }

        public async Task<bool> DeleteBookingPlace(int id)
        {
            try
            {
                BookingPlace b=await db.BookingPlaces.FindAsync(id);
                if (b!=null)
                {
                    db.BookingPlaces.Remove(b);
                    await db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<BookingPlace>> GetAllBookingPlace()
        {
            try
            {
                return await db.BookingPlaces.
                    Include(b=>b.TripCodeNavigation)
                    .Include(b=>b.UserCodeNavigation)
                    .ToListAsync();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<BookingPlace>> GetBookingPlaceByTrip(int code)
        {
            try
            {
                List<BookingPlace> l = await db.BookingPlaces.ToListAsync();
                List<BookingPlace> re = new List<BookingPlace>();
                foreach (BookingPlace b in l)
                    if(b.TripCode==code)
                        re.Add(b);
                return re;

            }
            catch
            {
                return null;
            }
        }
    }
}
