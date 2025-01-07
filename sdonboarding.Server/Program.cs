using System.Configuration;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Retrieve the connection string from environment variables
var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString");

// If the connection string is not found, log a warning and optionally throw an exception
if (string.IsNullOrEmpty(connectionString))
{
    Console.WriteLine("WARNING: Connection string 'DefaultConnectionString' not found.");
    // Uncomment the next line to enforce failure if the connection string is not set
    // throw new Exception("Connection string 'DefaultConnectionString' is not configured.");
}

// Configure the DbContext to use the connection string
builder.Services.AddDbContext<OnBoardingProjectContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();

// Enable CORS
app.UseCors("AllowAll");

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Dispatch API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
