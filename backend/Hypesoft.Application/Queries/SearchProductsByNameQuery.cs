namespace backend.Hypesoft.Application.Queries;

using MediatR;
using backend.Hypesoft.Application.DTOs;
using System.Collections.Generic;

public class SearchProductsByNameQuery : IRequest<IEnumerable<ProductDto>>
{
    public string Name { get; set; } = null!;
}