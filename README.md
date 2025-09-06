# Desafio Técnico Hypesoft - Sistema de Gestão de Produtos

## Visão Geral

Bem-vindo ao desafio técnico da Hypesoft!  
Este projeto consiste no desenvolvimento de um sistema completo de gestão de produtos, demonstrando habilidades em arquitetura moderna, boas práticas de desenvolvimento e tecnologias de ponta.


---

## Observação Importante

> **Keycloak está configurado para utilizar PostgreSQL como banco de dados**, garantindo maior robustez, escalabilidade e aderência a ambientes de produção.

---

## Referência Visual

O design da aplicação segue o padrão visual moderno demonstrado neste protótipo:  
[ShopSense Dashboard - Product Page (Dribbble)](https://dribbble.com/shots/24508262-ShopSense-Dashboard-Product-Page)

---

## Requisitos do Sistema

### Funcionalidades Principais

- **Gestão de Produtos:**  
  - Criar, listar, editar e excluir produtos  
  - Cada produto contém: nome, descrição, preço, categoria, quantidade em estoque  
  - Validação básica de dados obrigatórios  
  - Busca simples por nome do produto

- **Sistema de Categorias:**  
  - Criar e gerenciar categorias  
  - Associar produtos a uma categoria  
  - Filtrar produtos por categoria

- **Controle de Estoque:**  
  - Controlar quantidade em estoque  
  - Atualização manual de estoque  
  - Exibir produtos com estoque baixo (menor que 10 unidades)

- **Dashboard:**  
  - Total de produtos cadastrados  
  - Valor total do estoque  
  - Lista de produtos com estoque baixo  
  - Gráfico de produtos por categoria

- **Sistema de Autenticação:**  
  - Integração com Keycloak  
  - Login via Keycloak (OAuth2/OpenID Connect)  
  - Proteção de rotas no frontend  
  - Autorização baseada em roles  
  - Logout integrado

### Requisitos Técnicos

- **Performance:**  
  - Resposta da API em menos de 500ms para consultas simples  
  - Paginação eficiente  
  - Cache para consultas frequentes  
  - Otimização de queries

- **Escalabilidade:**  
  - Arquitetura preparada para crescimento horizontal  
  - Separação clara entre camadas  
  - Código limpo e bem estruturado

- **Segurança:**  
  - Validação e sanitização de entradas  
  - Headers de segurança  
  - Tratamento seguro de dados sensíveis

- **Disponibilidade:**  
  - Health checks  
  - Tratamento adequado de erros  
  - Logs estruturados

- **Usabilidade:**  
  - Interface responsiva  
  - Validação em tempo real nos formulários  
  - Feedback visual  
  - Experiência intuitiva

---

## Stack Tecnológica

### Frontend

- React 18 + TypeScript
- Next.js 14 (App Router)
- TailwindCSS + Shadcn/ui
- React Query/TanStack Query
- React Hook Form + Zod
- Chart.js para dashboards
- React Testing Library + Vitest

### Backend

- .NET 9 com C#
- Clean Architecture + DDD
- CQRS + MediatR
- Entity Framework Core (MongoDB provider)
- FluentValidation
- AutoMapper
- Serilog
- xUnit + FluentAssertions

### Infraestrutura

- MongoDB
- Keycloak (com banco PostgreSQL)
- Docker + Docker Compose
- Nginx (reverse proxy)

---

## Como Executar

### Pré-requisitos

- Docker Desktop 4.0+
- Node.js 18+
- .NET 9 SDK
- Git



## Passo a Passo Detalhado

### 1. Clone o repositório

```bash
git clone https://github.com/Victor-Estrella/hypesoft-challenge.git
cd hypesoft-challenge
```

### 2. Configure as variáveis de ambiente

No frontend, edite o arquivo `.env.local` com as informações do seu Keycloak:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_KEYCLOAK_URL=http://127.0.0.1:8080
NEXT_PUBLIC_KEYCLOAK_REALM=myrealm
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=myclient
```

### 3. Suba todos os serviços com Docker Compose

```bash
docker compose up -d
```

Aguarde alguns segundos para os serviços iniciarem.

### 4. Verifique se todos os containers estão rodando

```bash
docker compose ps
```

## Passo a Passo Backend (Configuração, Desenvolvimento e Testes)



Edite o arquivo `backend/.env` com as informações do seu ambiente, como string de conexão do MongoDB, variáveis do Keycloak, etc.

Exemplo:
```env
MONGODB_URI=mongodb+srv://<seu_usuario>:<sua-senha>@hypesoft-challenge.talhdnm.mongodb.net/?retryWrites=true&w=majority&appName=hypesoft-challenge

MONGODB_DATABASE=ProductDb
MONGODB_COLLECTION=ProductList

# ASP.NET
ASPNETCORE_ENVIRONMENT=Development
```

### 1. Instale as dependências do backend

```bash
cd backend
dotnet restore
```

### 2. Execute o backend em modo desenvolvimento

```bash
dotnet run
```


### 3. Execute os testes automatizados do backend

```bash
dotnet test
```

- Os resultados dos testes serão exibidos no terminal.
- Certifique-se de que todos os testes estejam passando antes de subir alterações.


### Desenvolvimento local (opcional)

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

**Backend:**

```bash
cd backend
dotnet restore
dotnet run
```

### 7. Executar os testes

**Backend:**

```bash
cd backend
dotnet test
```

**Frontend:**

```bash
cd frontend
npm test
```

---


## Demonstração das Funcionalidades

- Gestão de produtos e categorias (CRUD)
- Controle de estoque e dashboard dinâmico
- Autenticação e autorização com Keycloak (PostgreSQL)
- Interface responsiva e moderna
- Testes automatizados e documentação completa

---

## Vídeo de Apresentação

Assista à demonstração completa do sistema:  
🔗 [https://youtu.be/8PfrYkxYgoo](https://youtu.be/8PfrYkxYgoo)

---

