namespace backend.Hypesoft.Domain.Entities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("Description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("Price")]
    public decimal Price { get; set; }

    [BsonElement("Category")]
    public string Category { get; set; } = string.Empty;
    
    [BsonElement("StockQuantity")]
    public int StockQuantity { get; set; }
}