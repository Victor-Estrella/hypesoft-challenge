using MongoDB.Driver;

namespace backend.Hypesoft.Infrastructure.Services
{
    public interface IMongoDbService
    {
        IMongoDatabase Database { get; }
    }

    public class MongoDbService : IMongoDbService
    {
        public IMongoDatabase Database { get; }
        public MongoDbService(IConfiguration config)
        {
            var connStr = config["MongoDb:ConnectionString"];
            var dbName = config["MongoDb:Database"];
            var client = new MongoClient(connStr);
            Database = client.GetDatabase(dbName);
        }
    }
}
