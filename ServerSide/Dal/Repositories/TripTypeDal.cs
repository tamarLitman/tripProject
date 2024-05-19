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
    public class TripTypeDal : ITripTypeDal
    {

        TripsContext db;
        public TripTypeDal(TripsContext db)
        { this.db = db; }
        public   async Task<int> AddTripType(string typeName)
        {
            try
            {
                TripType newTT=new TripType();
                newTT.TypeName = typeName;
                var tripType = await db.TripTypes.FirstOrDefaultAsync(t => t.TypeName == typeName);
                if (tripType != null)
                    return -1;
                await db.TripTypes.AddAsync(newTT);
                await db.SaveChangesAsync();
                newTT=await db.TripTypes.FirstOrDefaultAsync(t=>t.TypeName == typeName);
                return newTT.TypeCode;
            }
            catch
            {
                return -1;
            }
        }

        public async Task<bool> DeleteTripType(int code)
        {
            try
            {
                TripType t = await db.TripTypes.FindAsync(code);
                if (t != null)
                {
                    db.TripTypes.Remove(t);
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


        public async Task<List<TripType>> GetAllTripType()
        {
            try
            {
                return await db.TripTypes.ToListAsync();
            }
            catch
            {
                return null;
            }
        }
    }
}
