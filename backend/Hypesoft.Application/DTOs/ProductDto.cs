using System.Text.Json.Serialization;

namespace backend.Hypesoft.Application.DTOs;

public record ProductDto
{
    [JsonPropertyName("id")]
    public string Id { get; init; }

    [JsonPropertyName("name")]
    public string Name { get; init; }

    [JsonPropertyName("description")]
    public string Description { get; init; }

    [JsonPropertyName("price")]
    public decimal Price { get; init; }

    [JsonPropertyName("category")]
    public string Category { get; init; }

    [JsonPropertyName("stockQuantity")]
    public int StockQuantity { get; init; }
}