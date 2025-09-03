namespace backend.Hypesoft.Application.Commands;

using MediatR;
using backend.Hypesoft.Application.DTOs;

public class UpdateProductCommand : IRequest<ProductDto>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public string Category { get; set; } = null!;
    public int StockQuantity { get; set; }
}