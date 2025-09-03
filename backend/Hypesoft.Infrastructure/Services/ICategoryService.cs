using backend.Hypesoft.Application.DTOs;

namespace backend.Hypesoft.Infrastructure.Services;

public interface ICategoryService
{
    Task<CategoryDto?> GetCategoryByIdAsync(string id);
    Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
    Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto);
    Task<CategoryDto> UpdateCategoryAsync(string id, UpdateCategoryDto updateCategoryDto);
    Task<bool> DeleteCategoryAsync(string id);
}
