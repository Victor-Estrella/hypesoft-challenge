using MediatR;
using AutoMapper;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Application.Commands;
using backend.Hypesoft.Application.DTOs;

public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, bool>
{
    private readonly IProductRepository _repo;
    public DeleteProductHandler(IProductRepository repo)
    {
        _repo = repo;
    }
    public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _repo.GetByIdAsync(request.Id);
        if (product == null) return false;
        await _repo.DeleteAsync(request.Id);
        return true;
    }
}
