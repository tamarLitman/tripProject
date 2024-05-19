using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Classes
{
    public class BookingPlaceDto
    {
        public int BookingCode { get; set; }

        public int? UserCode { get; set; }

        public DateTime? BookingDate { get; set; }

        public TimeSpan? BookingTime { get; set; }

        public int? TripCode { get; set; }

        public int? NumOfPlaces { get; set; }
        //
        public string? UserName {  get; set; }
        public string? TripDestination {  get; set; }
        public DateTime? TripDate { get; set;}
    }
}
