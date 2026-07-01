## Grupo 7:
Douglas Costa,
João Pedro Mazzotti,
Matheus da Silveira Santos,
Thiago Rocha.

# 🤖 Chatbot SPA — Frontend

Aplicação Single Page de chatbot com React 18, TypeScript, Context API + useReducer e Styled-Components.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 |
| Linguagem | TypeScript 5+ |
| Bundler | Vite 5 |
| Estilização | Styled-Components v6 |
| Estado Global | Context API + useReducer |
| HTTP Client | Axios |
| Testes | Jest + React Testing Library |
| Linter | ESLint |
| Formatação | Prettier |

## Estrutura

```
src/
├── api/              # Tipos, cliente Axios e funções de API
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── ErrorBoundary/
│   │   ├── FileIcon/
│   │   └── Spinner/
│   ├── ChatHistory/
│   ├── ChatInput/
│   ├── ChatMessage/
│   ├── ConversationList/
│   └── FileUpload/
├── contexts/         # ChatContext (reducer + provider)
├── hooks/            # useChat, useHistory, useFileUpload
├── pages/            # ChatPage
├── styles/           # Tema, tipos globais, global styles
└── utils/            # Constantes, formatação, validação
```

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento Vite |
| `npm run build` | Compila TypeScript + build de produção |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm test` | Executa testes (Jest) |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run lint` | ESLint em `src/` |
| `npm run format` | Prettier em `src/` |

## Testes

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Suite específica
npx jest src/hooks/useChat.test.tsx

# Com cobertura
npx jest --coverage
```

35 testes distribuídos em 9 suites cobrindo contexto, hooks e componentes. Todos os testes passam com build limpo (0 erros TypeScript, 0 warnings ESLint).

## Build

```bash
npm run build
```

Gera o bundle otimizado em `dist/`.

## API

A aplicação espera uma API REST em `http://localhost:8080` com os endpoints:

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login (retorna JWT) |
| POST | `/api/users` | Criar usuário |
| GET | `/api/users/me` | Perfil do usuário logado |

### Conversas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/conversations` | Criar conversa |
| GET | `/api/conversations` | Listar conversas |
| DELETE | `/api/conversations/:id` | Excluir conversa |

### Chat / Mensagens

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/chat/send` | Enviar mensagem (RAG v2) |
| GET | `/api/chat/history/:id` | Histórico de mensagens |

### Upload

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/files/upload` | Upload de arquivo (legado) |
| POST | `/api/documents/upload` | Upload de documento com IA |

O contrato completo está em [docs/FRONTEND_API_CONTRACT.md](docs/FRONTEND_API_CONTRACT.md).

## Correções Realizadas (v2)

### Problemas corrigidos no frontend

| Problema | Causa | Correção |
|---|---|---|
| `state.messages` undefined ao carregar histórico | O backend retorna `Message[]` direto, mas o frontend esperava `{ id, title, messages }` | Ajustado tipo `GetConversationHistoryResponse` e dispatch em `useHistory.ts` |
| "undefined mensagens" na lista de conversas | Campo `messageCount` não era enviado pelo backend e era obrigatório no tipo | `messageCount` e `lastMessageAt` tornados opcionais; fallback para `0` |
| Renomear conversa perdia campos do estado | `UPDATE_CONVERSATION` substituía a conversa inteira; se o backend não retornava todos os campos, eles sumiam | Redutor agora faz merge (`{ ...c, ...action.payload }`) |
| "Invalid Date" / datas quebradas | `safeParse` não tratava `null`, `undefined` ou timestamp numérico | Função agora aceita `string \| number \| null \| undefined` |
| Erro de tipo ao usar `id` como número | `Conversation.id` era `string` mas backend envia `number` | Tipo alterado para `string \| number` em toda a cadeia |

### O que testar no frontend (independente do backend)

- **Testes automatizados**: `npm test` — 35 testes em 9 suites, todos verdes
- **Build limpo**: `npm run build` — 0 erros TypeScript

### O que testar com o backend rodando

| Funcionalidade | Como testar | Depende do backend |
|---|---|---|
| Carregar histórico de conversas | Clicar em uma conversa na sidebar | `GET /api/conversations` + `GET /api/chat/history/{id}` |
| Enviar mensagem | Digitar e pressionar Enter | `POST /api/chat/send` |
| Renomear conversa | Passar mouse sobre conversa → clicar ✏ → digitar novo título → Enter | `PUT /api/conversations/{id}` |
| Criar nova conversa | Enviar mensagem com `conversationId: null` | `POST /api/chat/send` (precisa retornar `conversationId`) |
| Exibir datas corretamente | Verificar timestamps nas mensagens e na sidebar | Backend enviar ISO 8601 válido |

### O que o backend ainda precisa implementar

1. **`POST /api/chat/send`** — retornar `conversationId` no response quando uma nova conversa for criada
2. **`PUT /api/conversations/{id}`** — endpoint para renomear conversas (se já existe, verificar se retorna o objeto completo)
3. **Título automático** — (opcional) usar a primeira mensagem como título em vez de "Nova Conversa"

O contrato completo e atualizado está em [docs/FRONTEND_API_CONTRACT.md](docs/FRONTEND_API_CONTRACT.md).

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [docs/commits-strategy.md](docs/commits-strategy.md) | Estratégia de commits e organização em sprints |
| [docs/review.md](docs/review.md) | Análise técnica de arquitetura, stack e performance |
| [docs/FRONTEND_API_CONTRACT.md](docs/FRONTEND_API_CONTRACT.md) | Contrato completo da API REST |
| [docs/cx_n1_design.md](docs/cx_n1_design.md) | Design system CX N1 |
| [docs/system_specification.md](docs/system_specification.md) | Especificação do sistema |
| [docs/system_specification_part2.md](docs/system_specification_part2.md) | Especificação complementar |
