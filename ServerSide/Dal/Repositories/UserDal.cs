using Dal.IRepositories;
using Dal.Modules;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Repositories
{
    public class UserDal : IUserDal
    {
        TripsContext db;
        public UserDal(TripsContext db)
        {
            this.db = db;
        }
        public async Task<int> AddUser(User user)
        {
            try
            {
                await db.Users.AddAsync(user);
                await db.SaveChangesAsync();
                return user.UserCode;
            }
            catch
            {
                return -1;
            }
        }

        public async Task<bool> DeleteUser(int id)
        {
            try
            {
                //מוחק רק אם אין טיולים
                var u = await db.Users.FirstOrDefaultAsync(us=>us.UserCode==id);
                if (u != null)
                {
                    var place = await db.BookingPlaces.FirstOrDefaultAsync(us => us.UserCode == u.UserCode && us.TripCodeNavigation.TripDate > new DateTime());
                    if (place != null)
                        return false;
                    db.Users.Remove(u);
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

        public async Task<List<User>> GetAllUsers()
        {
            try
            {
                return await db.Users.ToListAsync();
            }
            catch
            {
                return null;
            }
        }

        public async Task<User> GetByMailAndPasword(string email, string password)
        {
            //try
            //{
            return await db.Users.FirstOrDefaultAsync(u => u.LoginPassword == password && u.Email == email);
            //    var user= await db.Users.FirstOrDefaultAsync(u=>u.Email==email && u.LoginPassword == password) ;
            //    if(user != null) 
            //        return user;
            //    return null;

            //}
            //catch
            //{
            //    return null;
            //}
        }
        //get trips
        public async Task<List<Trip>> GetAllTrip(int userId)
        {
            try
            {
                List<Trip> tripList = new List<Trip>();
                var l = await db.BookingPlaces.Where(u => u.UserCode == userId).ToListAsync();
                foreach (var trip in l)
                    tripList.Add(await db.Trips.FirstOrDefaultAsync(t => t.TripCode == trip.TripCode));
                return tripList;
            }
            catch 
            {
                return null;
            }
        }
        public async Task<bool> UpdateUser(User user)
        {
            try
            {
                User u = await db.Users.FindAsync(user.UserCode);
                if (u != null)
                {
                    u.UserCode = user.UserCode;
                    u.FirstName = user.FirstName;
                    u.LastName = user.LastName;
                    u.Phone = user.Phone;
                    u.Email = user.Email;
                    u.LoginPassword = user.LoginPassword;
                    u.FirstAidCertificate = user.FirstAidCertificate;
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

     
    }
}
