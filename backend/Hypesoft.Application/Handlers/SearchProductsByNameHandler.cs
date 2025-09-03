using MediatR;
using AutoMapper;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Application.Queries;
using backend.Hypesoft.Application.DTOs;

public class SearchProductsByNameHandler : IRequestHandler<SearchProductsByNameQuery, IEnumerable<ProductDto>>
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;
    public SearchProductsByNameHandler(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    public async Task<IEnumerable<ProductDto>> Handle(SearchProductsByNameQuery request, CancellationToken cancellationToken)
    {
        var products = await _repo.SearchByNameAsync(request.Name);
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }
}
