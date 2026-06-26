Grupo 7:
Douglas Costa
João Pedro Mazzotti 
Matheus da Silveira Santos
Thiago Rocha

# chatbot-front-end
Repositório dedicado ao front do chatbot.

# Wrote chatbot-front-end\README.md
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
| Linter | ESLint + Oxlint |
| Formatação | Prettier |

## Estrutura

```
src/
├── api/            # Tipos, cliente Axios e funções de API
├── components/
│   ├── common/     # Button, Spinner, ErrorBoundary, FileIcon
│   ├── ChatHistory/
│   ├── ChatInput/
│   ├── ChatMessage/
│   ├── ConversationList/
│   └── FileUpload/
├── contexts/       # ChatContext (reducer + provider)
├── hooks/          # useChat, useHistory, useFileUpload
├── pages/          # ChatPage
├── styles/         # Tema, tipos globais, global styles
└── utils/          # Constantes, formatação, validação
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

29 testes distribuídos em 9 suites cobrindo contexto, hooks e componentes.

## Build

```bash
npm run build
```

Gera o bundle otimizado em `dist/`.

## API

A aplicação espera uma API REST em `http://localhost:3000` com os endpoints:

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/chat/send` | Envia mensagem |
| GET | `/api/chat/conversations` | Lista conversas |
| GET | `/api/chat/conversations/:id` | Histórico de conversa |
| POST | `/api/chat/upload` | Upload de documento |
| DELETE | `/api/chat/conversations/:id` | Exclui conversa |

## Estratégia de Commits

Consulte [docs/commits-strategy.md](docs/commits-strategy.md) para a organização das features em sprints com trabalho paralelo para 2 desenvolvedores.

## Review Técnica

Consulte [docs/review.md](docs/review.md) para a análise completa de arquitetura, stack, performance e recomendações.
