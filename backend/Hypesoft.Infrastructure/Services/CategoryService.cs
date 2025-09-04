using backend.Hypesoft.Application.DTOs;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Infrastructure.Data;
using MongoDB.Driver;

namespace backend.Hypesoft.Infrastructure.Services;
public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        try
        {
            var categories = await _context.CategoryCollection.Find(Builders<Category>.Filter.Empty)
                .ToListAsync();
            return categories.Select(MapToDto);
        }
        catch (Exception ex)
        {
            throw new MongoException($"Failed to  retrieve category {ex.Message}");
        }
    }

    public async Task<CategoryDto?> GetCategoryByIdAsync(string id)
    {
        ValidateObjectId(id);

        try
        {
            var filter = Builders<Category>.Filter.Eq(c => c.Id, id);
            var category = await _context.CategoryCollection.Find(filter).FirstOrDefaultAsync()
                ?? throw new MongoException($"Category with {id} not found");
            return MapToDto(category);
        }
        catch (Exception ex) when (ex is not MongoException)
        {
            throw new MongoException($"Database error {ex.Message}");
        }
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto)
    {
        var category = new Category
        {
            Name = createCategoryDto.Name
        };

        try
        {
            await _context.CategoryCollection.InsertOneAsync(category);
            return MapToDto(category);
        }
        catch (Exception ex)
        {
            throw new MongoException($"Failed to create category : {ex.Message}");
        }
    }

    public async Task<CategoryDto> UpdateCategoryAsync(string id, UpdateCategoryDto updateCategoryDto)
    {
        ValidateObjectId(id);

        try
        {
            var update = Builders<Category>.Update
                .Set(p => p.Name, updateCategoryDto.Name);

            var category = await _context.CategoryCollection.FindOneAndUpdateAsync(
                Builders<Category>.Filter.Eq(p => p.Id, id),
                update,
                new FindOneAndUpdateOptions<Category> { ReturnDocument = ReturnDocument.After }
            ) ?? throw new MongoException($"Category with ID {id} not found");

            return MapToDto(category);
        }
        catch (Exception ex) when (ex is not MongoException)
        {
            throw new MongoException($"Failed to update category: {ex.Message}");
        }
    }

    public async Task<bool> DeleteCategoryAsync(string id)
    {
        ValidateObjectId(id);

        try
        {
            var result = await _context.CategoryCollection.DeleteOneAsync(p => p.Id == id);
            if (result.DeletedCount == 0)
                throw new MongoException($"Category with ID {id} not found");

            return true;
        }
        catch (Exception ex) when (ex is not MongoException)
        {
            throw new MongoException($"Failed to delete category: {ex.Message}");
        }
    }

    private static void ValidateObjectId(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MongoException("Category ID cannot be empty");
        if (!MongoDB.Bson.ObjectId.TryParse(id, out _))
            throw new MongoException("Invalid MongoDB ObjectID format");
    }

    private static CategoryDto MapToDto(Category category) => new()
    {
        Id = category.Id,
        Name = category.Name
    };
}
