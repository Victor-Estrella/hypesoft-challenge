using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Hypesoft.Application.DTOs;

public record CreateCategoryDto
{
    [Required(ErrorMessage = "Name is required")]
    [JsonPropertyName("name")]
    public string Name { get; init; }
}
