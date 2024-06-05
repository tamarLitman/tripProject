using Bll.IServices;
using Dto.Classes;
using Microsoft.AspNetCore.Mvc;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingPlaceController : ControllerBase
    {
        IBookingPlaceBll bll;
        public BookingPlaceController(IBookingPlaceBll bll)
        {
            this.bll = bll;
        }
        [HttpGet]
        public async Task<List<BookingPlaceDto>> GetAllBookingPlace()
        {
            return await bll.GetAllBookingPlace();

        }

        [HttpGet("{tripCode}")]
        public async Task<List<BookingPlaceDto>> GetAllBookingPlaces(int tripCode)
        {
            return await bll.GetBookingPlaceByTrip(tripCode);
        }

        [HttpPost]
        public async Task<int> AddBookingPlace([FromBody] BookingPlaceDto bp)
        {
            return await bll.AddPlace(bp);
        }


        [HttpDelete]
        [Route("delete/{code:int}")]
        public async Task<bool> DeletePlace(int code)
        {
            return await bll.RemovePlace(code);
        }
    }
}
