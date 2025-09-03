namespace backend.Hypesoft.API.Controllers;

using backend.Hypesoft.Application.DTOs;
using backend.Hypesoft.Infrastructure.Services;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductController> _logger;

    public ProductController(IProductService productService, ILogger<ProductController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProducts()
    {
        try
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error retrieving all products");
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto dto)
    {
        try
        {
            var product = await _productService.CreateProductAsync(dto);
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error creating product");
            return BadRequest(ex.Message);
        }
    }



    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> GetProductById([FromRoute] string id)
    {
        try
        {
            var product = await _productService.GetProductByIdAsync(id);
            return Ok(product);
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error retrieving product {ProductId}", id);
            return ex.Message.Contains("not found") ? NotFound(ex.Message) : BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> UpdateProduct([FromRoute] string id, [FromBody] UpdateProductDto dto)
    {
        try
        {
            var product = await _productService.UpdateProductAsync(id, dto);
            return Ok(product);
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error updating product {ProductId}", id);
            return ex.Message.Contains("not found") ? NotFound(ex.Message) : BadRequest(ex.Message);
        }
    }


    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteProduct([FromRoute] string id)
    {
        try
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
        catch (MongoException ex)
        {
            _logger.LogError(ex, "Error deleting product {ProductId}", id);
            return ex.Message.Contains("not found") ? NotFound(ex.Message) : BadRequest(ex.Message);
        }
    }

    //[HttpGet("search")]
    //public async Task<IActionResult> Search([FromQuery] string name)
    //{
    //    var result = await _mediator.Send(new SearchProductsByNameQuery { Name = name });
    //    return Ok(result);
    //}

    //[HttpGet("category/{category}")]
    //public async Task<IActionResult> GetByCategory(string category, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    //{
    //    var result = await _mediator.Send(new GetProductsByCategoryQuery { Category = category, PageNumber = pageNumber, PageSize = pageSize });
    //    return Ok(result);
    //}

    //[HttpGet("low-stock")]
    //public async Task<IActionResult> GetLowStock([FromQuery] int threshold = 10)
    //{
    //    var result = await _mediator.Send(new GetLowStockProductsQuery { Threshold = threshold });
    //    return Ok(result);
    //}

    //[HttpPatch("{id}/stock")]
    //public async Task<IActionResult> UpdateStock(Guid id, [FromBody] UpdateProductStockCommand command)
    //{
    //    if (id != command.Id) return BadRequest("Id mismatch");
    //    var result = await _mediator.Send(command);
    //    return result == null ? NotFound() : Ok(result);
    //}
}