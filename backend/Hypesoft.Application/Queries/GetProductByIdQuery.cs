using backend.Hypesoft.Application.DTOs;
using MediatR;

namespace backend.Hypesoft.Application.Queries
{

    public class GetProductByIdQuery : IRequest<ProductDto>
    {
        public Guid Id { get; set; }
    }
}