using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Hypesoft.Application.DTOs;

public record UpdateCategoryDto
{
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; init; }
}
