using backend.Hypesoft.Application.DTOs;
using backend.Hypesoft.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Hypesoft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly ILogger<CategoryController> _logger;

    public CategoryController(ICategoryService categoryService, ILogger<CategoryController> logger)
    {
        _categoryService = categoryService;
        _logger = logger;

    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
    {
        try
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error retrieving all categories");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryDto>> GetCategoryById([FromRoute] string id)
    {
        try
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            return Ok(category);
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error retrieving category {CategoryId}", id);
            return ex.Message.Contains("not found") ? NotFound(ex.Message) : BadRequest(ex.Message);
        }

    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CreateCategoryDto dto)
    {
        try
        {
            var category = await _categoryService.CreateCategoryAsync(dto);
            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error creating category");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryDto>> UpdateCategory([FromRoute] string id, [FromBody] UpdateCategoryDto dto)
    {
        try
        {
           var updated = await _categoryService.UpdateCategoryAsync(id, dto);
            return Ok(updated);

        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error updating category {CategoryId}", id);
            return ex.Message.Contains("not found") ? NotFound(ex.Message) : BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            await _categoryService.DeleteCategoryAsync(id);
            return NoContent();
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error deleting category {CategoryId}", id);
            return ex.Message.Contains("not found") ? NotFound(ex.Message) : BadRequest(ex.Message);
        }
    }
}
