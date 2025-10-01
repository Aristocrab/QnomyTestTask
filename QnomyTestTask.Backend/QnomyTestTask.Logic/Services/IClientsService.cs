using QnomyTestTask.Domain.Entities;

namespace QnomyTestTask.Logic.Services;

public interface IClientsService
{
    Task<List<Client>> GetAllClients();
    Task<List<Client>> GetClientsInLine();
    Task<Client?> GetClientInService();
    Task<Client> AddClientToLine(string clientFullName);
    Task<Client?> CallNextClient();
}