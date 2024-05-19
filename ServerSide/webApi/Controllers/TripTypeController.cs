using Bll.IServices;
using Dal.Modules;
using Dto.Classes;
using Microsoft.AspNetCore.Mvc;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripTypeController : Controller
    {
        ITripTypeBll bll;
        public TripTypeController(ITripTypeBll bll)
        {
            this.bll = bll;
        }

        [HttpGet]
        public async Task<List<TripTypeDto>> GetAllTripTypes()
        {
            return await bll.GetAllTripTypes();
        }

        [HttpPost]
        public async Task<int> AddTripType([FromBody]string typeName)
        {
            return await bll.AddTripType(typeName);
        }

        [HttpDelete]
        public async Task<bool> DeleteTripType([FromBody]int code)
        {
            return await bll.DeleteTripType(code);
        }
    }
}
