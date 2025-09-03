namespace backend.Hypesoft.Application.Queries;

using MediatR;
using backend.Hypesoft.Application.DTOs;
using System.Collections.Generic;

public class GetAllProductsQuery : IRequest<IEnumerable<ProductDto>>
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}