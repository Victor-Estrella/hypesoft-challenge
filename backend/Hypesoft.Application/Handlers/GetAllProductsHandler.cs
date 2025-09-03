namespace backend.Hypesoft.Application.Handlers;

using MediatR;
using AutoMapper;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Application.DTOs;
using backend.Hypesoft.Application.Queries;

public class GetAllProductsHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<ProductDto>>
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;

    public GetAllProductsHandler(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _repo.GetAllAsync(request.PageNumber, request.PageSize);
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }
}