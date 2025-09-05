# HypeSoft Challenge - Frontend

Este é o frontend do sistema HypeSoft Challenge, desenvolvido com [Next.js](https://nextjs.org), [React](https://react.dev), [TypeScript](https://www.typescriptlang.org/) e [Tailwind CSS](https://tailwindcss.com/). O sistema permite a gestão de produtos, categorias e estoque, com dashboard interativo e suporte a internacionalização (i18n).

## Funcionalidades

- Cadastro, edição e exclusão de produtos
- Cadastro, edição e exclusão de categorias
- Filtros por nome e categoria
- Dashboard com gráficos e cards de resumo
- Listagem de produtos com estoque baixo
- Suporte a múltiplos idiomas (Português e Inglês)
- Integração com backend via API REST
- UI responsiva e moderna

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Victor-Estrella/hypesoft-challenge.git
   cd hypesoft-challenge/frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

## Executando em modo desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Build para produção

```bash
npm run build
npm start
```

## Testes

Os testes utilizam [Vitest](https://vitest.dev/) e [Testing Library](https://testing-library.com/):

```bash
npm run test
```

## Estrutura de Pastas

- `src/app`: Rotas e páginas do Next.js
- `src/components`: Componentes reutilizáveis
- `src/types`: Tipos TypeScript
- `src/hooks`: Hooks customizados
- `src/i18n`: Internacionalização
- `src/styles`: Estilos globais

## Configuração de Internacionalização

Os arquivos de tradução estão em `messages/pt.json` e `messages/en.json`. O idioma padrão é português, mas pode ser alterado pelo usuário.

## Integração com Backend

O frontend consome a API REST do backend em `https://localhost:7159/api`.

## Tecnologias Utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next-Intl (i18n)
- React Hook Form
- Zod
- Recharts
- Vitest



---

Desenvolvido para o desafio HypeSoft.