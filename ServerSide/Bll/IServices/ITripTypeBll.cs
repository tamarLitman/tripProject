using Dal.Modules;
using Dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.IServices
{
    public interface ITripTypeBll
    {
        Task<List<TripTypeDto>> GetAllTripTypes();
        Task<int> AddTripType(string typeName);
        Task<bool> DeleteTripType(int code);
       
    }
}
