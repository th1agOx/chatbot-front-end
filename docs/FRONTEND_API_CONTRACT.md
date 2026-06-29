# Chatbot API — Contrato Front-End

> **Versão:** 2.0  
> **Última atualização:** 29/06/2026  
> **Base URL:** `http://localhost:8080`  
> **CORS:** `http://localhost:5173` (Vite dev server)  
> **Formato:** JSON (`application/json`)  
> **Upload:** `multipart/form-data`

---

## Índice

1. [Autenticação](#1-autenticação)
2. [Conversas](#2-conversas)
3. [Chat / Mensagens](#3-chat--mensagens)
4. [Upload de Arquivos (Legado)](#4-upload-de-arquivos-legado)
5. [Upload de Documentos com IA](#5-upload-de-documentos-com-ia)
6. [Health Check](#6-health-check)
7. [Tratamento de Erros](#7-tratamento-de-erros)
8. [Modelos de Dados](#8-modelos-de-dados)

---

## 1. Autenticação

### 1.1 Criar usuário

Registra um novo usuário no sistema.

```
POST /api/users
Content-Type: application/json
```

**Request:**
```json
{
    "email": "usuario@email.com",
    "password": "senha123",
    "displayName": "Usuário Teste"
}
```

**Response 201:**
```json
{
    "id": 1,
    "email": "usuario@email.com",
    "displayName": "Usuário Teste",
    "createdAt": "2026-06-29T10:30:00.123"
}
```

**Response 409 (email duplicado):**
```json
{
    "status": 409,
    "error": "Conflict",
    "message": "Email já cadastrado: usuario@email.com",
    "path": "/api/users",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

### 1.2 Login

Autentica o usuário e retorna um token JWT (Bearer).

```
POST /api/auth/login
Content-Type: application/json
```

**Request:**
```json
{
    "email": "usuario@email.com",
    "password": "senha123"
}
```

**Response 200:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ1c3VhcmlvQGVtYWlsLmNvbSIsImlhdCI6MTc1OTEyMzQwMCwiZXhwIjoxNzU5MjA5ODAwfQ...",
    "type": "Bearer"
}
```

**Response 401:**
```json
{
    "status": 401,
    "error": "Unauthorized",
    "message": "Credenciais inválidas",
    "path": "/api/auth/login",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

### 1.3 Perfil do usuário logado

Retorna os dados do usuário autenticado.

```
GET /api/users/me
Authorization: Bearer <token>
```

**Response 200:**
```json
{
    "id": 1,
    "email": "usuario@email.com",
    "displayName": "Usuário Teste",
    "createdAt": "2026-06-29T10:30:00.123"
}
```

### 1.4 Como usar o JWT

Após o login, inclua o token no header de todas as requisições autenticadas:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Endpoints públicos** (não precisam de token):
- `GET /health`
- `POST /api/auth/login`
- `POST /api/users`

**Endpoints protegidos** (precisam de token):
- `POST /api/conversations`
- `GET /api/conversations`
- `GET /api/conversations/{id}`
- `DELETE /api/conversations/{id}`
- `POST /api/chat/send`
- `GET /api/chat/history/{conversationId}`
- `POST /api/files/upload`
- `POST /api/documents/upload`
- `GET /api/users/me`

---

## 2. Conversas

### 2.1 Criar conversa

```
POST /api/conversations
Content-Type: application/json
Authorization: Bearer <token>
```

**Request:**
```json
{
    "title": "Minha primeira conversa"
}
```

**Response 201:**
```json
{
    "id": 1,
    "title": "Minha primeira conversa",
    "createdAt": "2026-06-29T10:30:00.123",
    "updatedAt": "2026-06-29T10:30:00.123"
}
```

**Response 400 (validação):**
```json
{
    "status": 400,
    "error": "Bad Request",
    "message": "title: O título é obrigatório",
    "path": "/api/conversations",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

### 2.2 Listar conversas

```
GET /api/conversations
Authorization: Bearer <token>
```

**Response 200:**
```json
[
    {
        "id": 1,
        "title": "Minha primeira conversa",
        "createdAt": "2026-06-29T10:30:00.123",
        "updatedAt": "2026-06-29T10:30:00.123"
    },
    {
        "id": 2,
        "title": "Dúvidas sobre o sistema",
        "createdAt": "2026-06-29T11:00:00.456",
        "updatedAt": "2026-06-29T11:00:00.456"
    }
]
```

### 2.3 Buscar conversa por ID

```
GET /api/conversations/{id}
Authorization: Bearer <token>
```

**Response 200:**
```json
{
    "id": 1,
    "title": "Minha primeira conversa",
    "createdAt": "2026-06-29T10:30:00.123",
    "updatedAt": "2026-06-29T10:30:00.123"
}
```

**Response 404:**
```json
{
    "status": 404,
    "error": "Not Found",
    "message": "Conversa não encontrada com id: 999",
    "path": "/api/conversations/999",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

### 2.4 Excluir conversa

```
DELETE /api/conversations/{id}
Authorization: Bearer <token>
```

**Response 204** (sem corpo)

**Response 404:**
```json
{
    "status": 404,
    "error": "Not Found",
    "message": "Conversa não encontrada com id: 999",
    "path": "/api/conversations/999",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

---

## 3. Chat / Mensagens

### 3.1 Enviar mensagem (v2 — com RAG)

> **Nota:** Este endpoint mudou na v2. Agora utiliza o pipeline RAG (Retrieval-Augmented Generation) para buscar contexto em documentos e gerar respostas inteligentes via LLM.

```
POST /api/chat/send
Content-Type: application/json
Authorization: Bearer <token>
```

**Request:**
```json
{
    "conversationId": 1,
    "message": "Qual o teor do documento sobre políticas de segurança?"
}
```

**Response 200:**
```json
{
    "userMessage": {
        "id": 1,
        "role": "USER",
        "content": "Qual o teor do documento sobre políticas de segurança?",
        "createdAt": "2026-06-29T10:30:00.123"
    },
    "botMessage": {
        "id": 2,
        "role": "BOT",
        "content": "Conforme o documento 'Políticas de Segurança 2026.pdf', as diretrizes principais são...",
        "createdAt": "2026-06-29T10:30:05.456"
    },
    "answer": "Conforme o documento 'Políticas de Segurança 2026.pdf', as diretrizes principais são...",
    "sources": [
        {
            "documentId": 1,
            "fileName": "Politicas_Seguranca_2026.pdf",
            "excerpt": "As políticas de segurança estabelecem que todos os colaboradores devem..."
        }
    ],
    "executionTimeMs": 4234,
    "chunksConsumed": 3
}
```

**Campos do response:**

| Campo | Tipo | Descrição |
|---|---|---|
| `userMessage` | `MessageResponse` | Mensagem do usuário persistida |
| `botMessage` | `MessageResponse` | Resposta do bot persistida |
| `answer` | string | Resposta textual gerada pelo LLM |
| `sources` | `SourceReference[]` | Lista de documentos/fontes utilizados |
| `executionTimeMs` | long | Tempo total de processamento (ms) |
| `chunksConsumed` | int | Quantidade de chunks utilizados como contexto |

**Response 404 (conversa inexistente):**
```json
{
    "status": 404,
    "error": "Not Found",
    "message": "Conversa não encontrada com id: 999",
    "path": "/api/chat/send",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

### 3.2 Histórico de mensagens

```
GET /api/chat/history/{conversationId}
Authorization: Bearer <token>
```

**Response 200:**
```json
[
    {
        "id": 1,
        "role": "USER",
        "content": "Olá!",
        "createdAt": "2026-06-29T10:30:00.123"
    },
    {
        "id": 2,
        "role": "BOT",
        "content": "Você disse: Olá!",
        "createdAt": "2026-06-29T10:30:00.456"
    }
]
```

**Response 404:**
```json
{
    "status": 404,
    "error": "Not Found",
    "message": "Conversa não encontrada com id: 999",
    "path": "/api/chat/history/999",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

---

## 4. Upload de Arquivos (Legado)

Endpoint original para upload simples de arquivos. Apenas armazena o metadado do anexo, **sem** pipeline de IA.

```
POST /api/files/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Request (multipart):**
| Campo | Tipo | Descrição |
|---|---|---|
| `conversationId` | long | ID da conversa |
| `file` | file | Arquivo (.txt ou .pdf, máx 10MB) |

**Response 201:**
```json
{
    "id": 1,
    "fileName": "documento.pdf",
    "contentType": "application/pdf",
    "size": 1024000,
    "uploadDate": "2026-06-29T10:30:00.123"
}
```

**Response 400 (tipo inválido):**
```json
{
    "status": 400,
    "error": "Bad Request",
    "message": "Tipo de arquivo não suportado: image/png. Tipos aceitos: application/pdf, text/plain",
    "path": "/api/files/upload",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

**Response 400 (tamanho excedido):**
```json
{
    "status": 400,
    "error": "Bad Request",
    "message": "Arquivo excede o tamanho máximo permitido de 10MB",
    "path": "/api/files/upload",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

---

## 5. Upload de Documentos com IA

Pipeline completo de inteligência artificial: **parse → chunk → embed → persist**. O documento é processado, fragmentado em chunks, vetorizado e armazenado para consultas RAG.

```
POST /api/documents/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Request (multipart):**
| Campo | Tipo | Descrição |
|---|---|---|
| `file` | file | Arquivo (.txt, .pdf ou .docx, máx 10MB) |

**Tipos de arquivo aceitos:**

| Extensão | Content-Type |
|---|---|
| `.txt` | `text/plain` |
| `.pdf` | `application/pdf` |
| `.docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |

**Response 201:**
```json
{
    "id": 1,
    "fileName": "relatorio.pdf",
    "contentType": "application/pdf",
    "fileSize": 2048000,
    "chunkCount": 15,
    "uploadedAt": "2026-06-29T10:30:00.123"
}
```

**Response 400 (tipo inválido):**
```json
{
    "status": 400,
    "error": "Bad Request",
    "message": "Tipo de arquivo não suportado: .png. Tipos aceitos: .txt, .pdf, .docx",
    "path": "/api/documents/upload",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

**Response 422 (falha no processamento):**
```json
{
    "status": 422,
    "error": "Unprocessable Entity",
    "message": "Falha ao processar documento: PDF corrompido ou protegido por senha",
    "path": "/api/documents/upload",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

---

## 6. Health Check

```
GET /health
```

**Response 200:**
```json
{
    "status": "UP",
    "timestamp": "2026-06-29T10:30:00.123456Z"
}
```

---

## 7. Tratamento de Erros

Todos os erros seguem o formato padronizado `ErrorResponse`:

```json
{
    "status": 400,
    "error": "Bad Request",
    "message": "Mensagem descritiva do erro",
    "path": "/api/conversations",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

### Códigos HTTP

| Código | Significado | Causas comuns |
|---|---|---|
| 200 | OK | Sucesso |
| 201 | Created | Recurso criado com sucesso |
| 204 | No Content | Exclusão bem-sucedida |
| 400 | Bad Request | Validação de campos, tipo de arquivo inválido, tamanho excedido |
| 401 | Unauthorized | Credenciais inválidas, token ausente/expirado |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Email duplicado |
| 422 | Unprocessable Entity | Falha no processamento do documento |
| 500 | Internal Server Error | Erro interno do servidor |

### Erros de validação de campo

Para `MethodArgumentNotValidException` (Bean Validation), os erros de campo são concatenados:

```json
{
    "status": 400,
    "error": "Bad Request",
    "message": "title: O título é obrigatório; message: A mensagem é obrigatória",
    "path": "/api/chat/send",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

---

## 8. Modelos de Dados

### 8.1 DTOs de Request

#### ConversationRequest

```json
{
    "title": "string (obrigatório, máx 255 caracteres)"
}
```

#### ChatRequest

```json
{
    "conversationId": "long (obrigatório)",
    "message": "string (obrigatório, máx 10000 caracteres)"
}
```

#### UserCreateRequest

```json
{
    "email": "string (obrigatório, formato email)",
    "password": "string (obrigatório, mín 6 caracteres)",
    "displayName": "string (obrigatório, máx 100 caracteres)"
}
```

#### LoginRequest

```json
{
    "email": "string (obrigatório, formato email)",
    "password": "string (obrigatório, mín 6 caracteres)"
}
```

### 8.2 DTOs de Response

#### ConversationResponse

```json
{
    "id": "long",
    "title": "string",
    "createdAt": "datetime (ISO 8601)",
    "updatedAt": "datetime (ISO 8601)"
}
```

#### MessageResponse

```json
{
    "id": "long",
    "role": "string (USER | BOT)",
    "content": "string",
    "createdAt": "datetime (ISO 8601)"
}
```

#### ChatResponse (v2)

```json
{
    "userMessage": {
        "id": "long",
        "role": "USER",
        "content": "string",
        "createdAt": "datetime"
    },
    "botMessage": {
        "id": "long",
        "role": "BOT",
        "content": "string",
        "createdAt": "datetime"
    },
    "answer": "string",
    "sources": [
        {
            "documentId": "long",
            "fileName": "string",
            "excerpt": "string"
        }
    ],
    "executionTimeMs": "long",
    "chunksConsumed": "int"
}
```

#### SourceReference

```json
{
    "documentId": "long",
    "fileName": "string",
    "excerpt": "string"
}
```

#### AttachmentResponse

```json
{
    "id": "long",
    "fileName": "string",
    "contentType": "string",
    "size": "long",
    "uploadDate": "datetime (ISO 8601)"
}
```

#### DocumentResponse

```json
{
    "id": "long",
    "fileName": "string",
    "contentType": "string",
    "fileSize": "long",
    "chunkCount": "int",
    "uploadedAt": "datetime (ISO 8601)"
}
```

#### UserResponse

```json
{
    "id": "long",
    "email": "string",
    "displayName": "string",
    "createdAt": "datetime (ISO 8601)"
}
```

#### LoginResponse

```json
{
    "token": "string (JWT)",
    "type": "string (sempre 'Bearer')"
}
```

#### HealthResponse

```json
{
    "status": "string",
    "timestamp": "datetime (ISO 8601 com timezone)"
}
```

#### ErrorResponse

```json
{
    "status": "int",
    "error": "string",
    "message": "string",
    "path": "string",
    "timestamp": "datetime (ISO 8601)"
}
```

### 8.3 Enums

#### MessageRole

| Valor | Descrição |
|---|---|
| `USER` | Mensagem enviada pelo usuário |
| `BOT` | Mensagem gerada pelo chatbot |

---

## 9. Resumo dos Endpoints

| Método | Path | Autenticação | Descrição | Status |
|---|---|---|---|---|
| `GET` | `/health` | ❌ | Health check | ✅ v1 |
| `POST` | `/api/conversations` | ✅ | Criar conversa | ✅ v1 |
| `GET` | `/api/conversations` | ✅ | Listar conversas | ✅ v1 |
| `GET` | `/api/conversations/{id}` | ✅ | Buscar conversa | ✅ v1 |
| `DELETE` | `/api/conversations/{id}` | ✅ | Excluir conversa | ✅ v1 |
| `POST` | `/api/chat/send` | ✅ | Enviar mensagem (RAG v2) | 🔄 v2 |
| `GET` | `/api/chat/history/{conversationId}` | ✅ | Histórico de mensagens | ✅ v1 |
| `POST` | `/api/files/upload` | ✅ | Upload de arquivo (legado) | ✅ v1 |
| `POST` | `/api/documents/upload` | ✅ | Upload de documento com IA | 🆕 v2 |
| `POST` | `/api/auth/login` | ❌ | Login | 🆕 v2 |
| `POST` | `/api/users` | ❌ | Criar usuário | 🆕 v2 |
| `GET` | `/api/users/me` | ✅ | Perfil do usuário | 🆕 v2 |

**Legenda:**
- ✅ v1 — Já implementado e funcional
- 🔄 v2 — Endpoint existente com response alterado na v2
- 🆕 v2 — Novo endpoint da v2

---

## 10. Considerações Técnicas

### CORS

O backend aceita requisições de `http://localhost:5173` (Vite). Em produção, a configuração será atualizada para o domínio de produção.

### Timeouts

- **Chat (RAG):** A resposta pode levar de 2 a 10 segundos dependendo do tamanho do contexto e do LLM. O front-end deve exibir um indicador de carregamento.
- **Upload de documentos:** O processamento pode levar de 1 a 30 segundos para documentos grandes.

### Limites de upload

| Tipo | Tamanho máximo |
|---|---|
| Arquivos (v1 - `/api/files/upload`) | 10 MB |
| Documentos (v2 - `/api/documents/upload`) | 10 MB (configurável) |

### Documentação interativa (Swagger)

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/api-docs`
