namespace backend.Hypesoft.Application.Commands;

using MediatR;
using backend.Hypesoft.Application.DTOs;

public class CreateProductCommand : IRequest<ProductDto>
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public string Category { get; set; } = null!;
    public int StockQuantity { get; set; }
}