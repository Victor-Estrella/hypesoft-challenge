namespace backend.Hypesoft.Infrastructure.Repositories;

using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using MongoDB.Driver;
using backend.Hypesoft.Infrastructure.Settings;
using Microsoft.Extensions.Options;

public class ProductRepository : IProductRepository
{
    private readonly IMongoCollection<Product> _collection;

    public ProductRepository(IOptions<MongoDbSettings> settings)
    {
        try
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.Database);
            _collection = database.GetCollection<Product>("Products");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao conectar: {ex.Message}");
            throw new ApplicationException("Erro ao conectar ao banco de dados MongoDB.", ex);
        }
    }

    public async Task<Product?> GetByIdAsync(Guid id)
    {
        try
        {
            return await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao buscar produto por ID: {ex.Message}");
            throw new ApplicationException("Erro ao buscar produto por ID.", ex);
        }
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        try
        {
            return await _collection.Find(_ => true).ToListAsync();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao listar produtos: {ex.Message}");
            throw new ApplicationException("Erro ao listar produtos.", ex);
        }
    }

    public async Task<IEnumerable<Product>> GetAllAsync(int pageNumber, int pageSize)
    {
        try
        {
            return await _collection.Find(_ => true)
                .Skip((pageNumber - 1) * pageSize)
                .Limit(pageSize)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao listar produtos paginados: {ex.Message}");
            throw new ApplicationException("Erro ao listar produtos paginados.", ex);
        }
    }

    public async Task<IEnumerable<Product>> GetByCategoryAsync(string category, int pageNumber, int pageSize)
    {
        try
        {
            return await _collection.Find(p => p.Category == category)
                .Skip((pageNumber - 1) * pageSize)
                .Limit(pageSize)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao buscar produtos por categoria: {ex.Message}");
            throw new ApplicationException("Erro ao buscar produtos por categoria.", ex);
        }
    }

    public async Task<IEnumerable<Product>> SearchByNameAsync(string name)
    {
        try
        {
            return await _collection.Find(p => p.Name.ToLower().Contains(name.ToLower())).ToListAsync();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao buscar produtos por nome: {ex.Message}");
            throw new ApplicationException("Erro ao buscar produtos por nome.", ex);
        }
    }

    public async Task<IEnumerable<Product>> GetLowStockAsync(int threshold = 10)
    {
        try
        {
            return await _collection.Find(p => p.StockQuantity < threshold).ToListAsync();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao buscar produtos com baixo estoque: {ex.Message}");
            throw new ApplicationException("Erro ao buscar produtos com baixo estoque.", ex);
        }
    }

    public async Task AddAsync(Product product)
    {
        try
        {
            await _collection.InsertOneAsync(product);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao adicionar produto: {ex.Message}");
            throw new ApplicationException("Erro ao adicionar produto.", ex);
        }
    }

    public async Task UpdateAsync(Product product)
    {
        try
        {
            await _collection.ReplaceOneAsync(p => p.Id == product.Id, product);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao atualizar produto: {ex.Message}");
            throw new ApplicationException("Erro ao atualizar produto.", ex);
        }
    }

    public async Task DeleteAsync(Guid id)
    {
        try
        {
            await _collection.DeleteOneAsync(p => p.Id == id);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[MongoDB] Erro ao excluir produto: {ex.Message}");
            throw new ApplicationException("Erro ao excluir produto.", ex);
        }
    }
}