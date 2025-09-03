using MediatR;
using AutoMapper;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Application.Queries;
using backend.Hypesoft.Application.DTOs;

public class GetProductsByCategoryHandler : IRequestHandler<GetProductsByCategoryQuery, IEnumerable<ProductDto>>
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;
    public GetProductsByCategoryHandler(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    public async Task<IEnumerable<ProductDto>> Handle(GetProductsByCategoryQuery request, CancellationToken cancellationToken)
    {
        var products = await _repo.GetByCategoryAsync(request.Category, request.PageNumber, request.PageSize);
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }
}
