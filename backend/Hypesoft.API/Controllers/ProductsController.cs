namespace backend.Hypesoft.API.Controllers;

using backend.Hypesoft.Application.Queries;
using backend.Hypesoft.Application.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;
    public ProductsController(IMediator mediator) => _mediator = mediator;

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetProductByIdQuery { Id = id });
        return result == null ? NotFound() : Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _mediator.Send(new GetAllProductsQuery { PageNumber = pageNumber, PageSize = pageSize });
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductCommand command)
    {
        if (id != command.Id) return BadRequest("Id mismatch");
        var result = await _mediator.Send(command);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _mediator.Send(new DeleteProductCommand { Id = id });
        return result ? NoContent() : NotFound();
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string name)
    {
        var result = await _mediator.Send(new SearchProductsByNameQuery { Name = name });
        return Ok(result);
    }

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _mediator.Send(new GetProductsByCategoryQuery { Category = category, PageNumber = pageNumber, PageSize = pageSize });
        return Ok(result);
    }

    [HttpGet("low-stock")]
    public async Task<IActionResult> GetLowStock([FromQuery] int threshold = 10)
    {
        var result = await _mediator.Send(new GetLowStockProductsQuery { Threshold = threshold });
        return Ok(result);
    }

    [HttpPatch("{id}/stock")]
    public async Task<IActionResult> UpdateStock(Guid id, [FromBody] UpdateProductStockCommand command)
    {
        if (id != command.Id) return BadRequest("Id mismatch");
        var result = await _mediator.Send(command);
        return result == null ? NotFound() : Ok(result);
    }
}