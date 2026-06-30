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

30 testes distribuídos em 9 suites cobrindo contexto, hooks e componentes. Todos os testes passam com build limpo (0 erros TypeScript, 0 warnings ESLint).

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

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [docs/commits-strategy.md](docs/commits-strategy.md) | Estratégia de commits e organização em sprints |
| [docs/review.md](docs/review.md) | Análise técnica de arquitetura, stack e performance |
| [docs/FRONTEND_API_CONTRACT.md](docs/FRONTEND_API_CONTRACT.md) | Contrato completo da API REST |
| [docs/cx_n1_design.md](docs/cx_n1_design.md) | Design system CX N1 |
| [docs/system_specification.md](docs/system_specification.md) | Especificação do sistema |
| [docs/system_specification_part2.md](docs/system_specification_part2.md) | Especificação complementar |
