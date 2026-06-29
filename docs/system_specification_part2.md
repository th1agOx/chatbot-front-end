# Documento de Especificação — Chatbot RAG (Parte 2)

> **Versão:** 2.0  
> **Base URL:** `http://localhost:8080`  
> **Stack Backend:** Java 17+, Spring Boot 3.x, Spring Data JPA, PostgreSQL / pgvector, OpenAI Embeddings API  
> **Frontend:** React 18 + TypeScript (implementado na Parte 1)

---

## 1. Diagrama de Sequência Textual

### 1.1 Fluxo de Ingestão de Documentos

```
Usuário         Frontend React              Backend (Spring Boot)               n8n Webhook         Vector DB
   |                   |                           |                               |                   |
   | POST /api/documents/upload                    |                               |                   |
   | (multipart: file)  |                           |                               |                   |
   |------------------->|                           |                               |                   |
   |                    | POST /api/documents/upload|                               |                   |
   |                    | (Authorization: Bearer)   |                               |                   |
   |                    |-------------------------->|                               |                   |
   |                    |                           |  DocumentIngestionService      |                   |
   |                    |                           |  1. ParserService.parse(file)  |                   |
   |                    |                           |  2. ChunkerService.chunk(text) |                   |
   |                    |                           |  3. EmbeddingService.embed()   |                   |
   |                    |                           |  4. Repository.save(doc+chunks)|                   |
   |                    |                           |-------------------------------|-->|               |
   |                    |                           |  POST /webhook (notificação)   |                   |
   |                    |                           |------------------------------>|                   |
   |                    | 201 DocumentResponse      |                               |                   |
   |                    |<---------------------------|                               |                   |
   | 201 { id, chunkCount, ... }                    |                               |                   |
   |<-------------------|                           |                               |                   |
```

### 1.2 Fluxo de Recuperação RAG (Chat)

```
Usuário         Frontend React              Backend (Spring Boot)              OpenAI API       Vector DB
   |                   |                           |                               |               |
   | POST /api/chat/send                           |                               |               |
   | { conversationId, message }                   |                               |               |
   |------------------->|                           |                               |               |
   |                    | POST /api/chat/send       |                               |               |
   |                    |-------------------------->|                               |               |
   |                    |                           |  RagService (orquestrador)    |               |
   |                    |                           |  1. MessageService.save(user) |               |
   |                    |                           |  2. EmbeddingService.embed()  |-------------->|
   |                    |                           |  3. VectorRepository.search() |               |-->|
   |                    |                           |  4. LLMService.generate()     |-------------->|
   |                    |                           |  5. MessageService.save(bot)  |               |
   |                    |                           |  6. Monta ChatResponse        |               |
   |                    |                           |     (sources, executionTime,  |               |
   |                    |                           |      chunksConsumed)          |               |
   |                    | 200 ChatResponse (v2)     |                               |               |
   |                    |<---------------------------|                               |               |
   | 200 { answer, sources, ... }                   |                               |               |
   |<-------------------|                           |                               |               |
```

---

## 2. Assinaturas dos Métodos Públicos dos Serviços

### 2.1 `ParserService`

```java
public interface ParserService {
    String parse(MultipartFile file, String fileName);
}
```

Implementações: `PdfParserService` (PDFBox), `DocxParserService` (POI), `TxtParserService`.

### 2.2 `ChunkerService`

```java
public interface ChunkerService {
    List<Chunk> chunk(String text, int chunkSize, int overlap);
}

public class Chunk {
    private int index;
    private String content;
    private int tokenCount;
}
```

### 2.3 `EmbeddingService` (agnóstico a domínio)

```java
public interface EmbeddingService {
    float[] embed(String text);
    List<float[]> embedBatch(List<String> texts);
    int getDimension();
}
```

### 2.4 `DocumentIngestionService`

```java
public interface DocumentIngestionService {
    DocumentResponse ingest(MultipartFile file, Long userId);
}
```

**Pipeline interno:** `parse → chunk → embedBatch → persist (Document + Chunks + Vectors)`

### 2.5 `VectorRepository`

```java
public interface VectorRepository {
    List<SearchResult> similaritySearch(float[] queryVector, int topK, int maxTokens);
}

public class SearchResult {
    private Long chunkId;
    private Long documentId;
    private String fileName;
    private String content;
    private float similarity;
}
```

### 2.6 `RagService` (orquestrador puro)

```java
public interface RagService {
    ChatResponse processMessage(ChatRequest request, Long userId);
}
```

Sem acoplamento direto a banco ou modelo de embedding — depende apenas das interfaces.

---

## 3. Contrato do Payload do Webhook (n8n)

### 3.1 Ingestão bem-sucedida

```
POST <n8n-webhook-url>/document-ingested
Content-Type: application/json
X-N8N-Webhook-Secret: <api-key>
```

```json
{
    "event": "document.ingested",
    "timestamp": "2026-06-29T10:30:00.123456Z",
    "payload": {
        "documentId": 42,
        "fileName": "Politicas_Seguranca_2026.pdf",
        "contentType": "application/pdf",
        "fileSize": 2048000,
        "chunkCount": 15,
        "status": "COMPLETED",
        "userId": 1,
        "ingestedAt": "2026-06-29T10:30:00.123"
    }
}
```

### 3.2 Falha na ingestão

```json
{
    "event": "document.ingestion_failed",
    "timestamp": "2026-06-29T10:30:00.123456Z",
    "payload": {
        "documentId": null,
        "fileName": "relatorio_protegido.pdf",
        "status": "FAILED",
        "error": "PDF corrompido ou protegido por senha",
        "userId": 1,
        "ingestedAt": "2026-06-29T10:30:00.123"
    }
}
```

---

## 4. Mapeamento DTOs (Frontend Contract → Backend Objects)

### 4.1 `ChatResponse` (v2)

| Campo | Backend (Java) | Frontend (TypeScript) |
|-------|---------------|----------------------|
| `userMessage` | `MessageResponse` | `Message` |
| `botMessage` | `MessageResponse` | `Message` |
| `answer` | `String` | `string` |
| `sources` | `List<SourceReference>` | `SourceReference[]` |
| `executionTimeMs` | `long` | `number` |
| `chunksConsumed` | `int` | `number` |

### 4.2 `SourceReference`

| Campo | Backend | Frontend |
|-------|---------|----------|
| `documentId` | `Long` | `number` |
| `fileName` | `String` | `string` |
| `excerpt` | `String` | `string` |

### 4.3 `DocumentResponse`

| Campo | Backend | Frontend |
|-------|---------|----------|
| `id` | `Long` | `number` |
| `fileName` | `String` | `string` |
| `contentType` | `String` | `string` |
| `fileSize` | `Long` | `number` |
| `chunkCount` | `Integer` | `number` |
| `uploadedAt` | `Instant` | `string` |

### 4.4 Mapa de Endpoints

| Endpoint | Método | Response DTO | Autenticação |
|----------|--------|-------------|-------------|
| `/api/chat/send` | POST | `ChatResponse` | Bearer JWT |
| `/api/chat/history/{id}` | GET | `List<MessageResponse>` | Bearer JWT |
| `/api/documents/upload` | POST | `DocumentResponse` | Bearer JWT |
| `/api/conversations` | GET/POST/DELETE | `ConversationResponse` | Bearer JWT |
| `/api/auth/login` | POST | `LoginResponse` | Público |
| `/api/users` | POST | `UserResponse` | Público |
| `/api/users/me` | GET | `UserResponse` | Bearer JWT |
| `/health` | GET | `HealthResponse` | Público |

---

## 5. Estratégia de Tratamento de Erros

### 5.1 Formato único `ErrorResponse`

```json
{
    "status": 400,
    "error": "Bad Request",
    "message": "Mensagem descritiva",
    "path": "/api/chat/send",
    "timestamp": "2026-06-29T10:30:00.123"
}
```

### 5.2 Mapeamento Exception → HTTP

| HTTP | Cenário | Exemplo de message |
|------|---------|-------------------|
| 400 | Validação de campos | `title: O título é obrigatório; message: A mensagem é obrigatória` |
| 400 | Tipo de arquivo inválido | `Tipo de arquivo não suportado: .png. Tipos aceitos: .txt, .pdf, .docx` |
| 400 | Tamanho excedido | `Arquivo excede o tamanho máximo permitido de 10MB` |
| 401 | Credenciais inválidas | `Credenciais inválidas` |
| 401 | Token expirado | `Token expirado` |
| 404 | Recurso não encontrado | `Conversa não encontrada com id: 999` |
| 409 | Email duplicado | `Email já cadastrado: usuario@email.com` |
| 422 | Falha no processamento do documento | `Falha ao processar documento: PDF corrompido ou protegido por senha` |
| 500 | Erro interno | `Erro interno ao processar a mensagem. Tente novamente.` |

### 5.3 Estrutura do `@ControllerAdvice`

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(400)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex, WebRequest request) { ... }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(404)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex, WebRequest request) { ... }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(409)
    public ErrorResponse handleConflict(EmailAlreadyExistsException ex, WebRequest request) { ... }

    @ExceptionHandler(DocumentProcessingException.class)
    @ResponseStatus(422)
    public ErrorResponse handleProcessing(DocumentProcessingException ex, WebRequest request) { ... }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(500)
    public ErrorResponse handleGeneric(Exception ex, WebRequest request) { ... }
}
```

---

## 6. Alterações no Frontend (Parte 1 → Parte 2)

### 6.1 Tipos novos em `src/api/types.ts`

```typescript
export interface SourceReference {
  documentId: number
  fileName: string
  excerpt: string
}

export interface ChatResponse {
  userMessage: Message
  botMessage: Message
  answer: string
  sources: SourceReference[]
  executionTimeMs: number
  chunksConsumed: number
}

export interface DocumentResponse {
  id: number
  fileName: string
  contentType: string
  fileSize: number
  chunkCount: number
  uploadedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  type: 'Bearer'
}

export interface UserCreateRequest {
  email: string
  password: string
  displayName: string
}

export interface UserResponse {
  id: number
  email: string
  displayName: string
  createdAt: string
}
```

### 6.2 Atualizações em componentes

- `ChatMessage`: exibir `sources` em mensagens do bot
- `useChat`: processar `ChatResponse` completo com `answer`, `sources`, `executionTimeMs`, `chunksConsumed`
- `useFileUpload`: usar `POST /api/documents/upload`
- `client.ts`: adicionar interceptor JWT

---

## 7. Plano de Implementação

| Fase | Módulo | Depende de |
|------|--------|------------|
| 1 | `ParserService` + `ChunkerService` | Nenhuma |
| 2 | `EmbeddingService` (OpenAI) | Fase 1 |
| 3 | `VectorRepository` (pgvector) | Fase 2 |
| 4 | `DocumentIngestionService` (orquestrador) | Fases 1-3 |
| 5 | `LLMService` (OpenAI Chat Completions) | Nenhuma |
| 6 | `RagService` (orquestrador RAG) | Fases 4-5 |
| 7 | `ChatController` v2 (com RAG) | Fase 6 |
| 8 | `DocumentController` (upload IA) | Fase 4 |
| 9 | Webhook n8n + notificação | Fase 8 |
| 10 | Auth (JWT) + UserController | Nenhuma |
| 11 | Atualização Frontend (tipos, componentes) | Todas as fases |
