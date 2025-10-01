using QnomyTestTask.Domain.Entities.Shared;
using QnomyTestTask.Domain.Enums;

namespace QnomyTestTask.Domain.Entities;

public class Client : BaseEntity
{
    public required string FullName { get; set; }
    public required int NumberInLine { get; set; }
    public required DateTime CheckInTime { get; set; }
    public required ClientStatus Status { get; set; }
}