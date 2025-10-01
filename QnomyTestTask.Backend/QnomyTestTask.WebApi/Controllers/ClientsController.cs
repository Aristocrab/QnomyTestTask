using Microsoft.AspNetCore.Mvc;
using QnomyTestTask.Logic.Services;

namespace QnomyTestTask.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly IClientsService _clientsService;

    public ClientsController(IClientsService clientsService)
    {
        _clientsService = clientsService;
    }

    [HttpGet("getAllClients")]
    public async Task<IActionResult> GetAllClients()
    {
        var allClients = await _clientsService.GetAllClients();
        return Ok(allClients);
    }

    [HttpGet("getClientsInLine")]
    public async Task<IActionResult> GetClientsInLine()
    {
        var clientsInLine = await _clientsService.GetClientsInLine();
        return Ok(clientsInLine);
    }

    [HttpGet("getClientInService")]
    public async Task<IActionResult> GetClientInService()
    {
        var clientInService = await _clientsService.GetClientInService();
        return Ok(clientInService);
    }
    
    [HttpPost("addClientToLine")]
    public async Task<IActionResult> AddClientToLine(string clientFullName)
    {
        var newClient = await _clientsService.AddClientToLine(clientFullName);
        return Ok(newClient);
    }

    [HttpPost("callNextClient")]
    public async Task<IActionResult> CallNextClient()
    {
        var nextClient = await _clientsService.CallNextClient();
        return Ok(nextClient);
    }
}