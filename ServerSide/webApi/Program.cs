using Bll.IServices;
using Bll.Services;
using Dal.IRepositories;
using Dal.Modules;
using Dal.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TripsContext>(options => options.UseSqlServer("Server=.;Database=Trips;TrustServerCertificate=True;Trusted_Connection=True;"));
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped(typeof(ITripDal),typeof(TripDal));
builder.Services.AddScoped(typeof(ITripBll),typeof(TripBll));

builder.Services.AddScoped(typeof(IUserDal), typeof(UserDal));
builder.Services.AddScoped(typeof(IUserBll), typeof(UserBll));

builder.Services.AddScoped(typeof(ITripTypeDal), typeof(TripTypeDal));
builder.Services.AddScoped(typeof(ITripTypeBll), typeof(TripTypeBll));

builder.Services.AddScoped(typeof(IBookingPlaceDal), typeof(BookingPlaceDal));
builder.Services.AddScoped(typeof(IBookingPlaceBll), typeof(BookingPlaceBll));


builder.Services.AddCors(opotion => opotion.AddPolicy("all",
                p => p.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()));
//builder.Services.AddControllers()
//           .AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);

var app = builder.Build();
app.UseCors("all");
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
