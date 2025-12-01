# Sistema de Gerenciamento de Voluntariado - IFRS

## Prova P1 - Desenvolvimento de Aplicações Corporativas

Este projeto é uma aplicação monolítica desenvolvida como avaliação para a disciplina de Desenvolvimento de Aplicações Corporativas, do Curso Superior de Análise e Desenvolvimento de Sistemas do IFRS - Campus Bento Gonçalves.

**Professor:** Prof. Dr. Maurício Covolan Rosito

**Prazo de Entrega:** 08/10/2025, às 22h15

---

## 🎯 Sobre o Projeto

O objetivo é criar um sistema para o IFRS organizar e gerenciar ações de voluntariado, como campanhas de doação e mutirões ambientais. A aplicação permite o cadastro de eventos e a gestão de voluntários, com funcionalidades de autenticação e controle de acesso por perfil (administrador).

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

### **Back-end**

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para a construção da API RESTful.
- **MySQL2**: Driver para conexão com o banco de dados MySQL.
- **JSON Web Tokens (JWT)**: Para autenticação e autorização de rotas.
- **Bcrypt.js**: Para hashing de senhas.
- **Dotenv**: Para gerenciamento de variáveis de ambiente.
- **CORS**: Para permitir requisições do front-end.
- **Swagger UI Express**: Para documentação interativa da API.
- **Nodemon**: Para desenvolvimento com live-reloading.

### **Front-end**

- **React**: Biblioteca para a construção da interface de usuário.

### **Boas Práticas e Qualidade de Código**

- **ESLint** e **Prettier**: Para padronização e linting de código.
- **SOLID** e **Clean Code**: Princípios aplicados para garantir um código limpo e manutenível.

---

## ✨ Funcionalidades Implementadas

- **API RESTful**: Endpoints para gerenciamento de eventos e voluntários seguindo os princípios REST.
- **Autenticação com JWT**:
  - Rota `POST /auth/login` para autenticar usuários.
  - Geração de token com payload `{ email, role }`.
- **Controle de Acesso por Perfil**:
  - Rota `GET /dashboard` protegida para usuários autenticados.
  - Rota `POST /events` protegida para usuários com perfil de `admin`.
- **Arquitetura em Camadas**: O back-end foi estruturado em camadas (Routes, Controller, Service, Model) para separação de responsabilidades.
- **Documentação**:
  - **Swagger**: Documentação da API disponível e interativa.
    A documentação dos endpoints da API, incluindo GET /events, POST /events e POST /auth/login, está disponível e pode ser acessada através do Swagger UI.
    URL do Swagger: http://localhost:3003/api-docs
  - **JSDoc**: Documentação interna do código nas principais funções e classes.
    Pode ser gerado com o comando: **npm run docs**
  - **Testes de API (REST Client)**: O arquivo tests.rest, conforme solicitado, contém exemplos de requisições para os endpoints implementados, facilitando os testes e a validação das funcionalidades.

---

## ⚙️ Configuração do Ambiente

Siga os passos abaixo para executar o projeto localmente.

### **Pré-requisitos**

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- Um gerenciador de pacotes (NPM ou Yarn)
- Uma instância do [MySQL](https://www.mysql.com/) rodando localmente.

### **Instalação**

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd <NOME_DA_PASTA_DO_PROJETO>
   ```

2. **Configure o Back-end:**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Ajuste as informações do arquivo .env**

4. **Execute o script .sql fornecido no projeto para criar as tabelas e popular o banco de dados com dados fictícios**

5. **Configure o Front-end:**
   ```bash
   cd ../frontend
   npm install
   ```

### **Executar a Aplicação**

1. **Inicie o Servidor Back-end:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Inicie a Aplicação Front-end:**
   ```bash
   cd ../frontend
   npm run dev
   ```

---

## 🛠️ Ferramentas de Desenvolvimento e Testes

Abaixo estão os comandos essenciais para gerenciamento de banco de dados, execução de testes e monitoramento de processos.

### **Gerenciamento de Banco de Dados (Prisma)**

Comandos para gerar o cliente, criar migrações e popular o banco de dados:

```bash
npx prisma generate
npx prisma migrate dev --name init_structure
npx prisma db seed
```

### **Testes Automatizados**

```bash
Back-end (Jest e Supertest): Para rodar a suíte de testes de integração:

npm test
Front-end (E2E): Para executar o script de teste de login:


node .\e2e\login_test.js
Gerenciamento de Processos (PM2)
Comandos para gerenciamento da aplicação e visualização de logs:
```


# **Iniciar aplicação via PM2**
```bash
pm2 start src/server.js
```

# **Visualizar logs em tempo real**
```bash
pm2 log
```


## 👤 Autor
**Pedro Eduardo Milesi Sperotto:**

GitHub: @Lecrepus17

LinkedIn: linkedin.com/in/pedro-eduardo-milesi-sperotto-422477296






ORGANIZAR: comandos pm2 e log, aqui no readme.md

// usado jest e supertest
npm test

sobre o teste no front
node .\e2e\login_test.js


uso do prisma
npx prisma generate
npx prisma migrate dev --name init_structure
npx prisma db seed
```
