# Estratégia de Commits — Chatbot Frontend

## Legenda

| Símbolo | Significado |
|---------|-------------|
| 🅰️ | Dev A |
| 🅱️ | Dev B |
| 🔀 | Tarefas paralelas (podem ser feitas ao mesmo tempo) |
| 🔗 | Dependência: precisa aguardar a tarefa anterior |

---

## Sprint 1 — Fundação

### 1.1 `feature/project-setup`
**Responsável:** 🅰️

| Ordem | Arquivos |
|-------|----------|
| 1 | `package.json` |
| 2 | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` |
| 3 | `vite.config.ts` |
| 4 | `index.html` |
| 5 | `public/favicon.svg`, `public/icons.svg` |
| 6 | `.gitignore` |
| 7 | `src/vite-env.d.ts` |
| 8 | `tsconfig.test.json`, `jest.config.cjs` |
| 9 | `eslint.config.js`, `.prettierrc`, `.oxlintrc.json` |
| 10 | `README.md` |

**Checklist de aceitação:**
- `npm install` completa sem erros
- `npm run dev` inicia o servidor
- `npm run build` produz o bundle

---

### 1.2 `feature/base-layer`
**Responsável:** 🅰️ 🔗 (após 1.1)

| Ordem | Arquivos |
|-------|----------|
| 1 | `src/styles/theme.ts` |
| 2 | `src/styles/styled.d.ts` |
| 3 | `src/styles/globalStyles.ts` |
| 4 | `src/utils/constants.ts` |
| 5 | `src/utils/formatDate.ts` |
| 6 | `src/utils/fileValidation.ts` |

**Checklist de aceitação:**
- Tema tipado e acessível via `DefaultTheme`
- Constantes definidas (API_BASE_URL, limites de arquivo)
- Utilitários cobertos por testes

---

## Sprint 2 — Infraestrutura (Paralelo)

### 2.1 🔀 `feature/api-layer`
**Responsável:** 🅰️

| Ordem | Arquivos |
|-------|----------|
| 1 | `src/api/types.ts` |
| 2 | `src/api/client.ts` |
| 3 | `src/api/chat.ts` |

**Checklist de aceitação:**
- Tipos definidos: `Message`, `Conversation`, `ChatAction`, etc.
- Axios client configurado com interceptor de erro
- Funções de API exportadas e tipadas

---

### 2.2 🔀 `feature/common-components`
**Responsável:** 🅱️

| Ordem | Arquivos |
|-------|----------|
| 1 | `src/components/common/Button/Button.tsx` + `Button.styles.ts` |
| 2 | `src/components/common/Spinner/Spinner.tsx` + `Spinner.styles.ts` |
| 3 | `src/components/common/ErrorBoundary/ErrorBoundary.tsx` |
| 4 | `src/components/common/FileIcon/FileIcon.tsx` + `FileIcon.styles.ts` |

**Checklist de aceitação:**
- `Button` com variantes `primary` / `secondary` e estado `disabled`
- `Spinner` com tamanhos `sm`, `md`, `lg`
- `ErrorBoundary` captura erros e exibe fallback
- `FileIcon` renderiza badge TXT (azul) ou PDF (vermelho)

---

### 2.3 `feature/state-management`
**Responsável:** 🅰️ 🔗 (após 2.1)

| Ordem | Arquivos |
|-------|----------|
| 1 | `src/contexts/ChatContext.tsx` |
| 2 | `src/contexts/ChatContext.test.tsx` |

**Checklist de aceitação:**
- `initialState` definido
- `chatReducer` puro com todos os casos (SET_CONVERSATIONS, SET_MESSAGES, ADD_MESSAGE, etc.)
- `ChatProvider` criado com `useReducer`
- `useChatContext` com validação de provider
- Testes unitários do reducer passando

---

## Sprint 3 — Features Core (Paralelo)

### 3.1 🔀 `feature/chat-hooks`
**Responsável:** 🅰️ 🔗 (após 2.3)

| Ordem | Arquivos |
|-------|----------|
| 1 | `src/hooks/useChat.ts` |
| 2 | `src/hooks/useHistory.ts` |
| 3 | `src/hooks/useFileUpload.ts` |
| 4 | `src/hooks/useChat.test.tsx` |
| 5 | `src/hooks/useHistory.test.tsx` |
| 6 | `src/hooks/useFileUpload.test.tsx` |

**Checklist de aceitação:**
- `useChat`: `sendMessage` adiciona mensagens USER e ASSISTANT, gerencia loading/error
- `useHistory`: carrega conversas no mount, `selectConversation` carrega mensagens
- `useFileUpload`: valida arquivo (tipo, tamanho), faz upload, gerencia estado
- Todos os hooks testados com API mockada

---

### 3.2 🔀 `feature/chat-components`
**Responsável:** 🅱️ 🔗 (após 2.2)

| Ordem | Arquivos |
|-------|----------|
| 1 | `src/components/ChatMessage/ChatMessage.tsx` + `.styles.ts` + `.test.tsx` |
| 2 | `src/components/ChatInput/ChatInput.tsx` + `.styles.ts` + `.test.tsx` |
| 3 | `src/components/ChatHistory/ChatHistory.tsx` + `.styles.ts` + `.test.tsx` |
| 4 | `src/components/ConversationList/ConversationList.tsx` + `.styles.ts` + `.test.tsx` |
| 5 | `src/components/FileUpload/FileUpload.tsx` + `.styles.ts` + `.test.tsx` |

**Checklist de aceitação:**
- `ChatMessage`: renderiza bolha USER (direita, roxa) e ASSISTANT (esquerda, cinza)
- `ChatInput`: textarea + botão, Enter envia, disabled quando vazio
- `ChatHistory`: scroll automático, loading, empty state
- `ConversationList`: lista com active state, "Nenhuma conversa" vazio
- `FileUpload`: drag & drop, clique, validação, disabled
- Todos os componentes testados com RTL

---

## Sprint 4 — Integração

### 4.1 `feature/chat-page`
**Responsável:** 🅰️ 🔗 (após 3.1)

| Ordem | Arquivos |
|-------|----------|
| 1 | `src/pages/ChatPage.tsx` |
| 2 | `src/pages/ChatPage.styles.ts` |
| 3 | `src/App.tsx` |
| 4 | `src/main.tsx` |

**Checklist de aceitação:**
- `ChatPage` integra hooks + componentes
- `App.tsx` com ThemeProvider, ChatProvider, ErrorBoundary
- `main.tsx` com StrictMode
- `npm run build` passa com zero erros

---

### 4.2 `feature/tests-integration`
**Responsável:** 🅱️ 🔗 (após 3.2)

| Ordem | Arquivos |
|-------|----------|
| 1 | `src/pages/ChatPage.test.tsx` (teste de integração — fluxo completo) |

**Checklist de aceitação:**
- Teste de integração que renderiza `ChatPage`, digita mensagem, dispara envio
- Mock de API para resposta simulada
- Verifica renderização de mensagens USER e ASSISTANT

---

## Mapa de Dependências

```
Sprint 1                    Sprint 2                         Sprint 3                   Sprint 4
┌──────────────┐           ┌────────────────────┐           ┌──────────────────┐        ┌─────────────┐
│ project-setup │───🔗──►  │   api-layer  (🅰️)  │───🔗──►  │ chat-hooks  (🅰️) │───🔗──►│ chat-page   │
│     (🅰️)      │          └────────────────────┘           └──────────────────┘        │   (🅰️)      │
└──────┬───────┘                                             ┌──────────────────┐        └─────────────┘
       │                                                     │ chat-components │───🔗──►┌─────────────┐
       ▼                                                     │    (🅱️)         │        │ tests-integ │
┌──────────────┐           ┌────────────────────┐           └──────────────────┘        │   (🅱️)      │
│  base-layer  │           │ common-components  │                                      └─────────────┘
│    (🅰️)      │           │      (🅱️)          │
└──────────────┘           └────────────────────┘
       │
       ▼
┌──────────────┐
│state-managem. │
│    (🅰️)      │
└──────────────┘
```

## Como usar

1. Cada dev escolhe uma tarefa `🔀` disponível em seu nome
2. Cria a branch a partir da `main`: `git checkout -b feature/nome-da-feature`
3. Commita os arquivos na ordem indicada
4. Abre PR e aguarda review do outro dev
5. Após merge, o próximo dev pode iniciar as tarefas que dependem da branch mergeada

## Convenção de commits

```
<tipo>(<escopo>): <descrição>

tipos: feat, fix, chore, refactor, test, docs
exemplos:
  feat(api): add sendMessage endpoint
  feat(context): create ChatProvider with useReducer
  test(hooks): add useChat tests
  chore(project): configure jest and ts-jest
```
