using Microsoft.EntityFrameworkCore;
using QnomyTestTask.Logic.Database;
using QnomyTestTask.Logic.Services;
using Serilog;
using Serilog.Events;

namespace QnomyTestTask.WebApi;

public static class ConfigureServices
{
    public static void AddWebApiServices(this IHostApplicationBuilder builder)
    {
        // Serilog
        var logger = new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
            .MinimumLevel.Override("Microsoft.EntityFrameworkCore.Database.Command", LogEventLevel.Warning)
            .WriteTo.Console()
            .CreateLogger();
        builder.Services.AddSerilog(logger);
        
        // Swagger
        builder.Services.AddSwaggerGen();
        
        // Controllers
        builder.Services.AddControllers();
        
        // SqlServer
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));
        
        // Services
        builder.Services.AddScoped<IClientsService, ClientsService>();
    }
}