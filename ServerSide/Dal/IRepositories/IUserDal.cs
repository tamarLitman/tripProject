using Dal.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.IRepositories
{
    public interface IUserDal
    {
        Task<List<User>> GetAllUsers();
        Task<User> GetByMailAndPasword(string email, string password);
        Task<List<Trip>> GetAllTrip(int userId);
        Task<int> AddUser(User user);
        Task<bool> DeleteUser(int id);
        Task<bool> UpdateUser(User user);

    }
}
