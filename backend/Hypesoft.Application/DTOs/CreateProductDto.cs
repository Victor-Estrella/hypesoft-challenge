using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Hypesoft.Application.DTOs
{
    public record CreateProductDto
    {
        [Required(ErrorMessage = "Name is required")]
        [JsonPropertyName("name")]
        public string Name { get; init; }

        [Required(ErrorMessage = "Description is required")]
        [JsonPropertyName("description")]
        public string Description { get; init; }

        [Required(ErrorMessage = "Price is required")]
        [JsonPropertyName("price")]
        public decimal Price { get; init; }

        [Required(ErrorMessage = "Category is required")]
        [JsonPropertyName("category")]
        public string Category { get; init; }

        [Required(ErrorMessage = "StockQuantity is required")]
        [JsonPropertyName("stockQuantity")]
        public int StockQuantity { get; init; }
    }
}
