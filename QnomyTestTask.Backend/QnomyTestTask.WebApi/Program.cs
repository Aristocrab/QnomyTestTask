using Microsoft.EntityFrameworkCore;
using QnomyTestTask.Logic.Database;
using QnomyTestTask.WebApi;
using QnomyTestTask.WebApi.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.AddWebApiServices();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapGet("/", () => Results.Redirect("/swagger"));
}

app.UseMiddleware<LoggingMiddleware>();
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.MapControllers();

app.Run();