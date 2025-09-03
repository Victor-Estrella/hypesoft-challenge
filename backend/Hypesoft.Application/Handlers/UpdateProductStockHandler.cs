using MediatR;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Application.Commands;
using backend.Hypesoft.Application.DTOs;
using AutoMapper;

public class UpdateProductStockHandler : IRequestHandler<UpdateProductStockCommand, ProductDto>
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;
    public UpdateProductStockHandler(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    public async Task<ProductDto> Handle(UpdateProductStockCommand request, CancellationToken cancellationToken)
    {
        var product = await _repo.GetByIdAsync(request.Id);
        if (product == null) return null;
        product.StockQuantity = request.StockQuantity;
        await _repo.UpdateAsync(product);
        return _mapper.Map<ProductDto>(product);
    }
}
