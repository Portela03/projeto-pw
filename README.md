# API de Multimídia - Node.js + Express + MongoDB

Sistema completo de gerenciamento de multimídia (Autores, Livros, CDs e DVDs) com autenticação básica.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Body-parser** - Parse de requisições
- **Cookie-parser** - Parse de cookies
- **Morgan** - Logger HTTP

## 📁 Estrutura do Projeto

```
atividade-pw/
├── app.js                 # Servidor principal
├── package.json           # Dependências
├── config/
│   └── database.js        # Configuração do MongoDB
├── middleware/
│   └── auth.js            # Autenticação Basic Auth
├── models/
│   ├── Autor.js           # Schema de Autor
│   ├── Livro.js           # Schema de Livro
│   ├── CD.js              # Schema de CD
│   └── DVD.js             # Schema de DVD
├── routes/
│   ├── authors.js         # Rotas de autores
│   ├── books.js           # Rotas de livros
│   ├── cds.js             # Rotas de CDs
│   └── dvds.js            # Rotas de DVDs
└── public/                # Arquivos estáticos
```

## 🔧 Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar MongoDB

Certifique-se de que o MongoDB está rodando em:
```
mongodb://localhost:27017/multimidia
```

### 3. Iniciar servidor

```bash
npm start
```

Ou em modo desenvolvimento (com nodemon):
```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:3000**

## 📚 Endpoints da API

### Autores (`/authors`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/authors` | Listar todos os autores | ❌ Não |
| GET | `/authors/:id` | Buscar autor por ID | ❌ Não |
| POST | `/authors` | Criar novo autor | ✅ Sim |
| PUT | `/authors/:id` | Atualizar autor | ✅ Sim |
| DELETE | `/authors/:id` | Deletar autor | ✅ Sim |

### Livros (`/books`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/books` | Listar todos os livros | ❌ Não |
| GET | `/books/:id` | Buscar livro por ID | ❌ Não |
| POST | `/books` | Criar novo livro | ✅ Sim |
| PUT | `/books/:id` | Atualizar livro | ✅ Sim |
| DELETE | `/books/:id` | Deletar livro | ✅ Sim |

### CDs (`/cds`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/cds` | Listar todos os CDs | ❌ Não |
| GET | `/cds/:id` | Buscar CD por ID | ❌ Não |
| POST | `/cds` | Criar novo CD | ✅ Sim |
| PUT | `/cds/:id` | Atualizar CD | ✅ Sim |
| DELETE | `/cds/:id` | Deletar CD | ✅ Sim |

### DVDs (`/dvds`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/dvds` | Listar todos os DVDs | ❌ Não |
| GET | `/dvds/:id` | Buscar DVD por ID | ❌ Não |
| POST | `/dvds` | Criar novo DVD | ✅ Sim |
| PUT | `/dvds/:id` | Atualizar DVD | ✅ Sim |
| DELETE | `/dvds/:id` | Deletar DVD | ✅ Sim |

## 🔐 Autenticação

A API utiliza **Basic Authentication** para rotas protegidas (POST, PUT, DELETE).

**Credenciais padrão:**
- Username: `admin`
- Password: `password`

### Exemplo de requisição com autenticação (cURL):

```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" \
  -d '{"nome": "Machado de Assis", "bio": "Escritor brasileiro", "nacionalidade": "Brasileira"}'
```

## 📝 Exemplos de Uso

### 1. Criar um Autor

```bash
POST http://localhost:3000/authors
Authorization: Basic YWRtaW46cGFzc3dvcmQ=
Content-Type: application/json

{
  "nome": "Machado de Assis",
  "bio": "Escritor brasileiro",
  "nacionalidade": "Brasileira"
}
```

### 2. Criar um Livro

```bash
POST http://localhost:3000/books
Authorization: Basic YWRtaW46cGFzc3dvcmQ=
Content-Type: application/json

{
  "titulo": "Dom Casmurro",
  "categoria": "Romance",
  "descricao": "Clássico da literatura brasileira",
  "preco": 35.90,
  "autor": "ID_DO_AUTOR_AQUI"
}
```

### 3. Listar todos os Livros (sem autenticação)

```bash
GET http://localhost:3000/books
```

### 4. Atualizar um CD

```bash
PUT http://localhost:3000/cds/ID_DO_CD
Authorization: Basic YWRtaW46cGFzc3dvcmQ=
Content-Type: application/json

{
  "titulo": "Album Atualizado",
  "preco": 29.90
}
```

### 5. Deletar um DVD

```bash
DELETE http://localhost:3000/dvds/ID_DO_DVD
Authorization: Basic YWRtaW46cGFzc3dvcmQ=
```

## 🗄️ Schemas

### Autor
```javascript
{
  nome: String (obrigatório),
  bio: String,
  nacionalidade: String
}
```

### Livro
```javascript
{
  titulo: String (obrigatório),
  categoria: String,
  descricao: String,
  preco: Number,
  autor: ObjectId (obrigatório)
}
```

### CD
```javascript
{
  titulo: String (obrigatório),
  genero: String,
  preco: Number,
  autor: ObjectId (obrigatório)
}
```

### DVD
```javascript
{
  titulo: String (obrigatório),
  categoria: String,
  preco: Number,
  autor: ObjectId (obrigatório)
}
```

## 🛠️ Testando a API

### Usando Thunder Client / Postman / Insomnia

1. Configure a autenticação Basic Auth com:
   - Username: `admin`
   - Password: `password`

2. Teste os endpoints conforme documentado acima

### Usando cURL

```bash
# Listar autores (sem autenticação)
curl http://localhost:3000/authors

# Criar autor (com autenticação)
curl -X POST http://localhost:3000/authors \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste", "nacionalidade": "Brasil"}'
```

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor
- `npm run dev` - Inicia o servidor em modo desenvolvimento (nodemon)

## 🎯 Boas Práticas Implementadas

✅ Arquitetura MVC (Model-View-Controller)  
✅ Separação de responsabilidades  
✅ Middleware de autenticação reutilizável  
✅ Validação de dados com Mongoose  
✅ Tratamento de erros consistente  
✅ Respostas JSON padronizadas  
✅ População de referências (populate)  
✅ Timestamps automáticos  
✅ Código limpo e documentado  


