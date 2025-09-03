namespace backend.Hypesoft.Application.Handlers;

using MediatR;
using AutoMapper;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Application.DTOs;
using backend.Hypesoft.Application.Commands;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;

    public CreateProductHandler(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            Price = request.Price,
            Category = request.Category,
            StockQuantity = request.StockQuantity
        };
        await _repo.AddAsync(product);
        return _mapper.Map<ProductDto>(product);
    }
}