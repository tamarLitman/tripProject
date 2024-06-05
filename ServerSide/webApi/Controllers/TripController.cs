using Bll.IServices;
using Dal.IRepositories;
using Dto.Classes;
//using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController:ControllerBase
    {
        ITripBll bll;
        public TripController(ITripBll bll)
        {
            this.bll = bll;
        }

        [HttpGet]
        public async Task<List<TripDto>> GetAllTrips()
        {
            return await bll.GetAllTrips();
        }

        [HttpGet("{tripCode}")]
        public async Task<TripDto> GetTripById(int tripCode)
        {
            return await bll.GetTripByid(tripCode);
        }

        [HttpPost]
        public async Task<int> AddTrip([FromBody] TripDto t)
        {
            return await bll.AddTrip(t);
        }

       [HttpGet]
        [Route("getInvites/{tripCode:int}")]
        public async Task<List<BookingPlaceDto>> GetInvitesToTrip( int tripCode)
        {
            return await bll.GetInvitesToTrip(tripCode);
        }

        [HttpPut]
    
        public async Task<bool> UpdateTrip([FromBody] TripDto t)
        {
            return await bll.UpdateTrip(t);
        }

        [HttpDelete]
        public async Task<bool> DeleteTrip([FromBody] int code)
        {
            return await bll.DeleteTrip(code);
        }
    }
}
