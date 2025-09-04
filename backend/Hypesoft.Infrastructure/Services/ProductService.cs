using backend.Hypesoft.Application.DTOs;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Infrastructure.Data;
using MongoDB.Driver;

namespace backend.Hypesoft.Infrastructure.Services;
public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        try
        {
            var products = await _context.ProductCollection.Find(Builders<Product>.Filter.Empty)
                .ToListAsync();
            return products.Select(MapToDto);

        }
        catch (Exception ex)
        {
            throw new MongoException($"Failed to  retrieve product {ex.Message}");
        }
    }

    public async Task<ProductDto?> GetProductByIdAsync(string id)
    {
        ValidateObjectId(id);

        try
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, id);
            var product = await _context.ProductCollection.Find(filter).FirstOrDefaultAsync()
                ?? throw new MongoException($"Product with {id} not found");
            return MapToDto(product);

        }
        catch (Exception ex) when (ex is not MongoException)
        {
            throw new MongoException($"Database error {ex.Message}");
        }
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto)
    {

        var product = new Product
        {
            Name = createProductDto.Name,
            Description = createProductDto.Description,
            Price = createProductDto.Price,
            Category = createProductDto.Category,
            StockQuantity = createProductDto.StockQuantity
        };

        try
        {
            await _context.ProductCollection.InsertOneAsync(product);
            return MapToDto(product);

        }
        catch (Exception ex)
        {
            throw new MongoException($"Failed to create product : {ex.Message}");
        }

    }

    public async Task<ProductDto> UpdateProductAsync(string id, UpdateProductDto updateProductDto)
    {
        ValidateObjectId(id);

        try
        {
            var update = Builders<Product>.Update
                .Set(p => p.Name, updateProductDto.Name)
                .Set(p => p.Description, updateProductDto.Description)
                .Set(p => p.Price, updateProductDto.Price)
                .Set(p => p.Category, updateProductDto.Category)
                .Set(p => p.StockQuantity, updateProductDto.StockQuantity);

            var product = await _context.ProductCollection.FindOneAndUpdateAsync(
                Builders<Product>.Filter.Eq(p => p.Id, id),
                update,
                new FindOneAndUpdateOptions<Product> { ReturnDocument = ReturnDocument.After }
            ) ?? throw new MongoException($"Product with ID {id} not found");

            return MapToDto(product);
        }
        catch (Exception ex) when (ex is not MongoException)
        {
            throw new MongoException($"Failed to update product: {ex.Message}");
        }
    }


    public async Task<bool> DeleteProductAsync(string id)
    {
        ValidateObjectId(id);

        try
        {
            var result = await _context.ProductCollection.DeleteOneAsync(p => p.Id == id);
            if (result.DeletedCount == 0)
                throw new MongoException($"Product with ID {id} not found");

            return true;
        }
        catch (Exception ex) when (ex is not MongoException)
        {
            throw new MongoException($"Failed to delete product: {ex.Message}");
        }
    }

    private static void ValidateObjectId(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MongoException("Product ID cannot be empty");
        if (!MongoDB.Bson.ObjectId.TryParse(id, out _))
            throw new MongoException("Invalid MongoDB ObjectID format");
    }


    private static ProductDto MapToDto(Product product) => new()
    {
        Id = product.Id,
        Name = product.Name,
        Description = product.Description,
        Price = product.Price,
        Category = product.Category,
        StockQuantity = product.StockQuantity
    };

}