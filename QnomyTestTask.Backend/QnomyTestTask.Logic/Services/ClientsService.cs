using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QnomyTestTask.Domain.Entities;
using QnomyTestTask.Domain.Enums;
using QnomyTestTask.Logic.Database;

namespace QnomyTestTask.Logic.Services;

public class ClientsService : IClientsService
{
    private readonly AppDbContext _dbContext;
    private readonly ILogger<ClientsService> _logger;

    public ClientsService(AppDbContext dbContext, ILogger<ClientsService> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<List<Client>> GetAllClients()
    {
        return await _dbContext.Clients.ToListAsync();
    }

    public async Task<List<Client>> GetClientsInLine()
    {
        return await _dbContext.Clients
            .Where(x => x.Status == ClientStatus.InLine)
            .OrderBy(x => x.NumberInLine)
            .ToListAsync();
    }

    public async Task<Client?> GetClientInService()
    {
        return await _dbContext.Clients
            .FirstOrDefaultAsync(x => x.Status == ClientStatus.InService);
    }

    public async Task AddClientToLine(string clientFullName)
    {
        if (string.IsNullOrWhiteSpace(clientFullName))
        {
            _logger.LogWarning("Attempted to add a client with an empty name");
            throw new ArgumentException("Client full name cannot be empty or whitespace.", nameof(clientFullName));
        }

        var lastNumber = await _dbContext.Clients
            .Where(c => c.Status == ClientStatus.InLine || c.Status == ClientStatus.InService)
            .MaxAsync(c => (int?)c.NumberInLine) ?? 0;
        
        var newClient = new Client
        {
            FullName = clientFullName,
            CheckInTime = DateTime.UtcNow,
            Status = ClientStatus.InLine,
            NumberInLine = lastNumber + 1
        };
        
        await _dbContext.Clients.AddAsync(newClient);
        await _dbContext.SaveChangesAsync();
        
        _logger.LogInformation("Added new client {ClientFullName} with number {ClientNumberInLine} to the line", 
            newClient.FullName, newClient.NumberInLine);
    }

    public async Task CallNextClient()
    {
        var inService = await _dbContext.Clients
            .FirstOrDefaultAsync(x => x.Status == ClientStatus.InService);
        
        if (inService is not null)
        {
            inService.Status = ClientStatus.Served;
            await _dbContext.SaveChangesAsync();
            
            _logger.LogInformation("Client {ClientFullName} with number {ClientNumberInLine} has been served", 
                inService.FullName, inService.NumberInLine);
        }
        
        var nextClient = await _dbContext.Clients
            .Where(x => x.Status == ClientStatus.InLine)
            .OrderBy(x => x.NumberInLine)
            .FirstOrDefaultAsync();

        if (nextClient is null)
        {
            _logger.LogInformation("No clients in line to call next");
            return;
        }
        
        nextClient.Status = ClientStatus.InService;
        
        await _dbContext.SaveChangesAsync();
    }
}