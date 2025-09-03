using MediatR;
using AutoMapper;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Application.Queries;
using backend.Hypesoft.Application.DTOs;

public class GetProductByIdHandler : IRequestHandler<GetProductByIdQuery, ProductDto>
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;
    public GetProductByIdHandler(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    public async Task<ProductDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _repo.GetByIdAsync(request.Id);
        return _mapper.Map<ProductDto>(product);
    }
}
