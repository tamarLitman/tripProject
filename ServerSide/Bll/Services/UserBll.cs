using AutoMapper;
using Bll.IServices;
using Dal.IRepositories;
using Dal.Modules;
using Dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Services
{
    public class UserBll : IUserBll
    {
        IUserDal dal;
        IMapper mapper;
        public UserBll(IUserDal dal)
        {
            this.dal = dal;
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Dto.Classes.Mapper>();
            });
            mapper=config.CreateMapper();
        }

        public async Task<int> AddUser(UserDto user)
        {
            try
            {
                return await dal.AddUser(mapper.Map<UserDto, User>(user));
            }
            catch
            {
                return -1;
            }
        }

        public async Task<bool> DeleteUser(int code)
        {
            return await dal.DeleteUser(code);
        }

        public async Task<List<TripDto>> GetAllTrips(int code)
        {
            List<Trip> t = await dal.GetAllTrip(code);
            return mapper.Map<List<TripDto>>(t);
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            List<User> u= await dal.GetAllUsers();
            return mapper.Map<List<User>, List<UserDto>>(u);
     
        }

        public async Task<UserDto> GetUserByMailAndPassword(string email, string password)
        {
            User u = await dal.GetByMailAndPasword(email, password);
            return mapper.Map<User, UserDto>(u);
        }

        public async Task<bool> UpdateUser(UserDto user)
        {
            return await dal.UpdateUser(mapper.Map<UserDto, User>(user));
        }

    }
}
