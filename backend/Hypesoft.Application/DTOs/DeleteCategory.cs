using System.Text.Json.Serialization;

namespace backend.Hypesoft.Application.DTOs
{
    public record DeleteCategory
    {
        [JsonPropertyName("id")]
        public string Id { get; init; }
    }
}
