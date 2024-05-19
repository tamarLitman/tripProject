using System;
using System.Collections.Generic;

namespace Dal.Modules;

public partial class User
{
    public int UserCode { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public string? LoginPassword { get; set; }

    public bool? FirstAidCertificate { get; set; }

    public virtual ICollection<BookingPlace> BookingPlaces { get; set; } = new List<BookingPlace>();
}
