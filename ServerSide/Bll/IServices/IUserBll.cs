using Dal.Modules;
using Dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.IServices
{
    public interface IUserBll
    {
        Task<List<UserDto>> GetAllUsers();
        Task<UserDto> GetUserByMailAndPassword(string email, string password);
        Task<int> AddUser(UserDto user);
        Task<bool> UpdateUser(UserDto user);
        Task<bool> DeleteUser(int code);
        Task<List<TripDto>> GetAllTrips(int code);
    }
}
