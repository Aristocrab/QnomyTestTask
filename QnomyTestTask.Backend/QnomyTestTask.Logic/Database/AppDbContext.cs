using Microsoft.EntityFrameworkCore;
using QnomyTestTask.Domain.Entities;

namespace QnomyTestTask.Logic.Database;

public class AppDbContext : DbContext
{
    public required DbSet<Client> Clients { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
}