using Dal.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.IRepositories
{
    public interface ITripTypeDal
    {
        Task<List<TripType>> GetAllTripType();
        Task<int> AddTripType(string typeName);
        Task<bool> DeleteTripType(int code);
    }
}
