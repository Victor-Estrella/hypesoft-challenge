using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Infrastructure.Services;
using backend.Hypesoft.Infrastructure.Settings;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using MongoDB.Driver;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IMongoDbService, MongoDbService>();
// Configurações do MongoDB
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDb"));

// Registro dos repositórios
builder.Services.AddScoped<IProductRepository, backend.Hypesoft.Infrastructure.Repositories.ProductRepository>();

// Serviços padrão
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();
builder.Services.AddValidatorsFromAssemblyContaining<backend.Hypesoft.Application.Validators.GetAllProductsQueryValidator>();
builder.Host.UseSerilog((ctx, lc) => lc
    .ReadFrom.Configuration(ctx.Configuration));

// CORS para integração frontend-backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});


var app = builder.Build();

// Middleware de tratamento de erros
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        var error = exceptionHandlerPathFeature?.Error;
        Log.Error(error, "Erro interno na API");
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"error\":\"Ocorreu um erro interno.\"}");
    });
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();