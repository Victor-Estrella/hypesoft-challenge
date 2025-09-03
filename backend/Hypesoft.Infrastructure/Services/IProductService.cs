using backend.Hypesoft.Application.DTOs;

namespace backend.Hypesoft.Infrastructure.Services;


public interface IProductService
{
    Task<ProductDto?> GetProductByIdAsync(Guid id);
    Task<IEnumerable<ProductDto>> GetAllProductsAsync();
    Task<IEnumerable<ProductDto>> GetAllProductsAsync(int pageNumber, int pageSize);
    Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto);
    Task<ProductDto> UpdateProductAsync(string id, UpdateProductDto createProductDto);
    Task<bool> DeleteProductAsync(string id);

    Task<IEnumerable<ProductDto>> SearchByNameAsync(string name);
    Task<IEnumerable<ProductDto>> GetByCategoryAsync(string category, int pageNumber, int pageSize);
    Task<IEnumerable<ProductDto>> GetLowStockAsync(int threshold = 10);

}