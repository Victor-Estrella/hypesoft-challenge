namespace backend.Hypesoft.Application.Commands;

using MediatR;
using backend.Hypesoft.Application.DTOs;

public class UpdateProductStockCommand : IRequest<ProductDto>
{
    public Guid Id { get; set; }
    public int StockQuantity { get; set; }
}