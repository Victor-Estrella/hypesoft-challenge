namespace backend.Hypesoft.Application.Queries;

using MediatR;
using backend.Hypesoft.Application.DTOs;
using System.Collections.Generic;

public class GetProductsByCategoryQuery : IRequest<IEnumerable<ProductDto>>
{
    public string Category { get; set; } = null!;
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}