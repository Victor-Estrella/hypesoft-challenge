using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Hypesoft.Infrastructure.Data
{
    public class AppDbContext
    {
    public IMongoCollection<Product> ProductCollection { get; }
    public IMongoCollection<Category> CategoryCollection { get; }

        public AppDbContext(IOptions<MongoDbSettings> settings) 
        {
            MongoClient client = new MongoClient
            (settings.Value.ConnectionURI);

            IMongoDatabase database = client.GetDatabase
            (settings.Value.DatabaseName);

            ProductCollection = database.GetCollection<Product>
            (settings.Value.CollectionName);
            CategoryCollection = database.GetCollection<Category>("CategoryList");
        }
    }
}
