using Bll.IServices;
using Dto.Classes;
using Microsoft.AspNetCore.Mvc;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserBll bll;
        public UserController(IUserBll bll)
        {
            this.bll = bll;
        }

        [HttpGet]
        public async Task<List<UserDto>> GetAllUsers()
        {
            return await bll.GetAllUsers();
        }

        [HttpGet]
        [Route("GetByMailAndPass")]
        public async Task<UserDto> GetUserByMailAndPassword(string email, string password)
        {
            return await bll.GetUserByMailAndPassword(email, password);
        }

        [HttpGet("{userId}")]

        public async Task<List<TripDto>> GetAllTrips(int userId)
        {
            return await bll.GetAllTrips(userId);
        }

        [HttpPost]
        public async Task<int> AddUser([FromBody] UserDto u)
        {
            return await bll.AddUser(u);
        }

        [HttpPut]
        public async Task<bool> UpdateUser([FromBody] UserDto u)
        {
            return await bll.UpdateUser(u);
        }

        [HttpDelete("{code}")]

        public async Task<bool> DeleteUser(int code)
        {
            return await bll.DeleteUser(code);
        }
    }
}
