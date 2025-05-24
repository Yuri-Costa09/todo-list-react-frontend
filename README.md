# Todo App - React Frontend

Uma aplicação web moderna de gerenciamento de tarefas construída com React e TypeScript, com recursos de autenticação de usuário e gerenciamento completo de tarefas.

## 📝 Sobre o Projeto

Este é o frontend de uma aplicação full-stack de lista de tarefas que permite aos usuários criar contas, fazer login de forma segura e gerenciar suas tarefas pessoais. A aplicação utiliza tecnologias modernas para proporcionar uma experiência de usuário fluida e responsiva.

## ✨ Funcionalidades

- **Autenticação de Usuário**
  - Registro de usuário com validação
  - Sistema seguro de login/logout
  - Autenticação baseada em token JWT
  - Persistência de sessão com localStorage
  - Redirecionamento automático para rotas protegidas

- **Gerenciamento de Tarefas**
  - Criar, editar e excluir tarefas
  - Marcar tarefas como completas/incompletas
  - Interface responsiva e intuitiva

## 🛠️ Stack Tecnológica

- **Framework**: React 19
- **Linguagem**: TypeScript
- **Build Tool**: Vite
- **Navegação**: React Router DOM
- **Estilização**: TailwindCSS
- **Cliente HTTP**: Axios
- **Gerenciamento de Estado**: React Context API
- **Deploy**: Netlify

## 📋 Pré-requisitos

Antes de executar este projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Git

## 🚀 Instalação e Execução Local

1. **Clone o repositório**

   ```bash
   git clone <https://github.com/Yuri-Costa09/todo-list-react-frontend>
   cd react-todo-frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o ambiente (opcional)**
   - Por padrão, a aplicação está configurada para usar a API em produção
   - Para desenvolvimento local, você pode alterar a `baseURL` em `src/services/api.ts`

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

   A aplicação será executada em `http://localhost:3000`

5. **Acesse a aplicação**
   - Abra seu navegador e vá para `http://localhost:3000`
   - Crie uma conta ou faça login para começar a usar

## 📁 Estrutura do Projeto

```
src/
├── auth/                   # Componentes de autenticação
│   ├── AuthContext.tsx     # Context de autenticação
│   └── PrivateRoute.tsx    # Componente de rota protegida
├── contexts/               # Contexts da aplicação
│   └── TasksContext.tsx    # Context de gerenciamento de tarefas
├── pages/                  # Páginas da aplicação
│   ├── Login.tsx          # Tela de login
│   ├── Register.tsx       # Tela de registro
│   └── Tasks.tsx          # Tela principal de tarefas
├── services/              # Serviços de API
│   ├── api.ts            # Configuração do Axios
│   ├── authService.ts    # Serviços de autenticação
│   └── tasksService.ts   # Serviços de tarefas
├── App.tsx               # Componente raiz
├── main.tsx             # Ponto de entrada
└── index.css           # Estilos globais
```

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
```

## 🌐 API Backend

A aplicação se comunica com uma API backend hospedada em:

```
URL Base: https://aitrip.one/api
```

### Endpoints principais

- `POST /users/register` - Registro de usuário
- `POST /users/login` - Login de usuário
- `GET /tasks/user/:userId` - Buscar tarefas do usuário
- `POST /tasks/create` - Criar nova tarefa
- `PUT /tasks/update/:taskId` - Atualizar tarefa
- `DELETE /tasks/delete/:taskId` - Excluir tarefa

## 🎯 Como Usar

### Primeiro Acesso

1. Acesse a aplicação em `http://localhost:3000`
2. Clique em "Register" para criar uma nova conta
3. Preencha nome, email e senha
4. Após registro, você será redirecionado para o login
5. Faça login com suas credenciais

### Gerenciando Tarefas

1. Na tela principal, use o campo "Add a new task..." para criar tarefas
2. Clique no círculo à esquerda da tarefa para marcá-la como completa
3. Use o ícone de lixeira para excluir tarefas
4. Veja o resumo de progresso na parte inferior

### Logout

- Use o botão "Logout" no canto superior direito para sair da aplicação

## 🔒 Segurança

- Autenticação baseada em JWT tokens
- Tokens armazenados de forma segura no localStorage
- Interceptors Axios para gerenciamento automático de tokens
- Redirecionamento automático em caso de tokens expirados
- Rotas protegidas que requerem autenticação

