using System.Text.Json.Serialization;

namespace backend.Hypesoft.Application.DTOs;

public record CategoryDto
{
    [JsonPropertyName("id")]
    public string Id { get; init; }

    [JsonPropertyName("name")]
    public string Name { get; init; }
}
