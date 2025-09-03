namespace backend.Hypesoft.Application.Queries;

using MediatR;
using backend.Hypesoft.Application.DTOs;
using System.Collections.Generic;

public class GetLowStockProductsQuery : IRequest<IEnumerable<ProductDto>>
{
    public int Threshold { get; set; } = 10;
}