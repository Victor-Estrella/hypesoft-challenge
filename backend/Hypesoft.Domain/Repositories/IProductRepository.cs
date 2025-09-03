namespace backend.Hypesoft.Domain.Repositories;

using backend.Hypesoft.Domain.Entities;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<IEnumerable<Product>> GetAllAsync(int pageNumber, int pageSize);
    Task<IEnumerable<Product>> SearchByNameAsync(string name);
    Task<IEnumerable<Product>> GetByCategoryAsync(string category, int pageNumber, int pageSize);
    Task<IEnumerable<Product>> GetLowStockAsync(int threshold = 10);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(Guid id);
}