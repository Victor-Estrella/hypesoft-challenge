using MediatR;
using AutoMapper;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Application.Queries;
using backend.Hypesoft.Application.DTOs;

public class GetLowStockProductsHandler : IRequestHandler<GetLowStockProductsQuery, IEnumerable<ProductDto>>
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;
    public GetLowStockProductsHandler(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    public async Task<IEnumerable<ProductDto>> Handle(GetLowStockProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _repo.GetLowStockAsync(request.Threshold);
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }
}
