using backend.Hypesoft.Infrastructure.Data;
using backend.Hypesoft.Infrastructure.Extensions;
using backend.Hypesoft.Infrastructure.Repositories;
using backend.Hypesoft.Infrastructure.Services;
using backend.Hypesoft.Infrastructure.Settings;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using MongoDB.Driver;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureCors(builder.Configuration);

// FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<backend.Hypesoft.Application.Validators.CreateProductDtoValidator>();

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));


// Serviços padrão
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();


builder.Services.AddSingleton<AppDbContext>();
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddScoped<IProductService, ProductService>();

var app = builder.Build();

app.UseCors("CorsPolicy");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();