namespace backend.Hypesoft.Application.Handlers;

using MediatR;
using AutoMapper;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Application.DTOs;
using backend.Hypesoft.Application.Commands;

public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, ProductDto>
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;

    public UpdateProductHandler(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<ProductDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _repo.GetByIdAsync(request.Id);
        if (product == null) return null;

        product.Name = request.Name;
        product.Description = request.Description;
        product.Price = request.Price;
        product.Category = request.Category;
        product.StockQuantity = request.StockQuantity;

        await _repo.UpdateAsync(product);
        return _mapper.Map<ProductDto>(product);
    }
}