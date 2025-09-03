using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Hypesoft.Application.DTOs
{
    public record UpdateProductDto
    {
        [Required]
        [JsonPropertyName("name")]
        public string Name { get; init; }

        [Required]
        [JsonPropertyName("description")]
        public string Description { get; init; }

        [Required]
        [JsonPropertyName("price")]
        public decimal Price { get; init; }

        [Required]
        [JsonPropertyName("category")]
        public string Category { get; init; }

        [Required]
        [JsonPropertyName("stockQuantity")]
        public int StockQuantity { get; init; }
    }
}
