# Revisão Técnica — Chatbot SPA Frontend

## 1. Arquitetura e Organização

**Pontos fortes:**

A estrutura de diretórios segue uma separação clara por domínio — `api/`, `contexts/`, `hooks/`, `pages/`, `components/`, `styles/`, `utils/` — o que torna a navegação intuitiva e facilita a localização de código. Cada componente de domínio (ex: `ChatMessage/`, `ChatInput/`, `FileUpload/`) possui seu próprio diretório com o componente propriamente dito, o arquivo de estilos (`.styles.ts`) e os testes colocalizados. Esse padrão de colocalização é uma boa prática porque mantém coesas as responsabilidades de um mesmo módulo.

Componentes compartilhados (Button, Spinner, ErrorBoundary, FileIcon) estão agrupados em `components/common/`, o que evita duplicação e comunica claramente seu caráter reutilizável.

A separação de responsabilidades entre as camadas é correta:
- **Context/Reducer** (`ChatContext.tsx`): orquestra o estado global via `useReducer`
- **Hooks customizados** (`useChat`, `useHistory`, `useFileUpload`): encapsulam lógica de negócio e acesso ao contexto
- **Componentes de UI**: puramente responsivos, recebem props e callbacks

**Pontos de atenção:**

- `useChat` mistura responsabilidades de IU (adicionar mensagem otimisticamente) com lógica de rede. Uma possível evolução seria separar em um hook de domínio (enviar mensagem) e um hook de UI (gerenciar estado local do formulário).
- `ChatPage.tsx` coordena múltiplos hooks e componentes. Embora aceitável no tamanho atual, tenderia a crescer. Poder-se-ia extrair um hook `useChatPage` que agrupa os três hooks (useChat, useHistory, useFileUpload) e expõe apenas o necessário.

**Sugestão:** Adotar o padrão *Container/Presentational*: `ChatPage` seria o container (orquestrador), e componentes puramente visuais seriam presentacionais sem hooks diretos.

---

## 2. Stack Tecnológica

| Camada | Escolha | Adequação |
|--------|---------|-----------|
| Framework | React 18 | Excelente para SPA. App Router e Suspense não são usados, o que é apropriado para um app de página única sem roteamento. |
| Linguagem | TypeScript 5+ | Mandatório. O uso de tipos união (`ChatAction`), interfaces e genéricos está consistente. |
| Bundler | Vite 5 | Excelente — dev server instantâneo, HMR rápido e build otimizado. |
| Estilização | Styled-Components v6 | Adequado, com tipagem forte via module augmentation. Bom isolamento de estilos. |
| Estado Global | Context API + useReducer | Adequado **para o porte atual**. `useReducer` com actions tipadas via discriminated union (`ChatAction`) é previsível e testável. |
| HTTP Client | Axios | Escolha sólida. Interceptor de erros bem implementado. |
| Testes | Jest + RTL | Padrão da indústria para React. |

**Vantagens observadas:**
- `styled-components` com `DefaultTheme` aumentado em `styled.d.ts` garante que o tema seja type-safe em todo o projeto.
- `useReducer` com `ChatAction` (discriminated union) é mais seguro que `useState` múltiplo porque o TypeScript valida cada ação.
- Vite + TypeScript com `tsc -b` no build detecta erros de tipo antes do bundling.

**Limitações e riscos:**
- **Context API sem memoização:** Toda vez que `ChatProvider` re-renderiza (qualquer dispatch), todos os consumidores (hooks, componentes) re-renderizam. Isso não é problema no porte atual, mas em um app com centenas de componentes seria necessário otimizar com `useMemo` nos valores do contexto ou migrar para Zustand/Zustand.
- **Styled-Components** não é mais a opção mais moderna (CSS Modules, Tailwind, CSS-in-JS runtime têm trade-offs). Para um projeto novo, `@vanilla-extract/css` ou Panda CSS seriam alternativas com melhor performance de runtime. Porém, para este porte, styled-components é perfeitamente funcional.

---

## 3. Manutenibilidade e Escalabilidade

**O código está preparado para crescer?** Parcialmente.

Pontos positivos:
- Tipagem forte em todas as interfaces
- Reducer puro e testável independentemente do React
- Hooks customizados encapsulam lógica de API

Gargalos potenciais com o crescimento:
- **Ação orquestrada em múltiplos dispatches:** Em `useChat.sendMessage`, há chamadas sequenciais a `dispatch` que poderiam ser substituídas por *action creators* que despacham uma única ação composta, reduzindo re-renderizações intermediárias.
- **Ausência de normalização de dados:** `messages: Message[]` dentro de `ChatState` poderia ser normalizado por ID (ex: `Record<string, Message>`) para evitar iterações O(n) em buscas e evitar duplicatas. Com o volume atual é aceitável, mas com centenas de mensagens seria relevante.
- **`selectConversation` em `useHistory`** dispara primeiro `SELECT_CONVERSATION` (limpa mensagens), depois carrega do servidor. Isso gera um flash de "loading" que poderia ser suavizado com uma transição ou mantendo as mensagens antigas visíveis até o carregamento.

Sugestão para escalabilidade:
- Introduzir **serviços** (camada de domínio) separados dos hooks. Ex: `services/chatService.ts` com `sendMessage`, `loadHistory`.

---

## 4. Testabilidade e Qualidade

**Estratégia de testes:**
- Testes unitários do reducer (`ChatContext.test.tsx`) — testam a lógica de estado pura, sem dependências React.
- Testes de hooks (`useChat.test.tsx`, `useHistory.test.tsx`, `useFileUpload.test.tsx`) — mockam a API, validam fluxos completos.
- Testes de componentes (`ChatInput.test.tsx`, `ChatMessage.test.tsx`, etc.) — validam renderização e interação do usuário.

**Boas práticas observadas:**
- Mock de `crypto.randomUUID()` em `useChat.test.tsx` (necessário porque jsdom não implementa crypto Web API).
- `jest.mock('../api/chat')` no topo do arquivo para substituir o módulo de API inteiro.
- `waitFor` para aguardar estado assíncrono em hooks.
- Uso de `@testing-library/user-event` para interações realistas (em vez de `fireEvent` em alguns casos).

**Melhorias sugeridas:**
- Adicionar teste para o `ErrorBoundary` (simular erro filho e verificar se o fallback renderiza).
- Adicionar testes de integração para `ChatPage` combinando hooks e componentes, validando o fluxo completo (digitar → enviar → ver mensagem do assistente).
- Cobrir o caso de `SELECT_CONVERSATION` com `activeId !== null` para garantir que o reset de mensagens não afeta o fluxo de envio.
- A cobertura atual não é mensurada. Recomenda-se integrar `jest --coverage` e estabelecer meta mínima de 80%.

---

## 5. Performance e UX

**Fluxo de dados:**
- O envio de mensagem é otimista: a mensagem do usuário aparece imediatamente, depois o loading/error, depois a resposta do assistente. Esse padrão é excelente para UX.
- `ChatHistory` usa `scrollIntoView({ behavior: 'smooth' })` no efeito de mensagens, garantindo que novas mensagens sejam visíveis.

**Pontos de performance:**
- **Re-renderização global:** `ChatProvider` re-renderiza todos os consumidores a cada dispatch. No porte atual (~5 consumidores), é irrelevante. Se escalar para dezenas de componentes, seria necessário fatiar o contexto (ex: separar `ChatStateContext` de `ChatDispatchContext`) ou usar `useSyncExternalStore`.
- **`useCallback` com dependência `state.activeId`:** Em `useChat.ts:41`, `sendMessage` recria sempre que `state.activeId` muda. Correto, pois o closure precisa do valor mais recente da conversa ativa.
- **`loadConversations` no mount:** `useHistory` faz uma requisição GET na montagem. Se o app tiver múltiplas tabs ou abrir/fechar componentes, isso poderia gerar requisições desnecessárias.

**Melhorias de UX sugeridas:**
- Adicionar feedback visual de "mensagem enviando" (ex: bolha do usuário com opacidade reduzida até confirmação do servidor).
- Implementar *retry* automático em falha de rede (com backoff exponencial).
- Adicionar indicador de "digitando..." (bolha pulsante) enquanto o assistente processa a resposta.
- Responsividade: o sidebar de conversas desaparece em `breakpoints.md`, mas não há um botão de hamburger para reabri-lo — o usuário fica sem acesso ao histórico.
- `formatDate` usa `pt-BR` hardcoded — pode ser extraído para configuração de locale.

---

## 6. Boas Práticas e Padrões

**ESLint + Prettier:**
- ESLint 9 com flat config (`eslint.config.js`), react-hooks plugin, TypeScript-ESLint, e integração com Prettier via `eslint-config-prettier`. Configuração moderna completa.
- Volta (`.oxlintrc.json`) presente como opção de linter mais rápido, sem conflito com ESLint.
- `.prettierrc` com `semi: false`, `singleQuote: true` — consistente em todo o código.

**Consistência de código:**
- Nomes de arquivos em PascalCase para componentes (`ChatMessage.tsx`), camelCase para hooks (`useChat.ts`) — padrão React.
- Props transitórias styled-components usam prefixo `$` (ex: `$isOwn`, `$variant`, `$active`) — alinhado com a convenção oficial do styled-components v6 para evitar warnings de "unknown prop forwarded to DOM".
- Exportação default para componentes; exportações nomeadas para funções puras (reducer, utils).

**Padrões que poderiam ser adicionados:**

- **Composição vs. Herança:** Componentes como `Button` aceitam `variant` — é extensível. Mas `FileUpload` poderia usar *compound components* para maior flexibilidade.
- **SOLID — Single Responsibility:** `useChat` faz duas coisas: gerencia estado de mensagens/loading e orquestra envio. Poderia ser decomposto.
- **Atomic Design:** A estrutura atual já se aproxima (common = atoms, componentes de domínio = molecules, página = organism). Poderia ser formalizado.
- **Custom error classes:** Em vez de `err instanceof Error ? err.message : 'Erro...'` repetido em 3 hooks, criar uma classe `AppError` ou função helper `extractErrorMessage(err)`.
- **Zod para validação runtime:** `fileValidation.ts` é manual — Zod traria type inference e mensagens de erro mais declarativas.

---

## 7. Conclusão

**Pontos fortes do frontend:**
- Estrutura de diretórios limpa, modular e colocalizada com testes
- Tipagem forte com TypeScript em toda a cadeia: temas, contexto, API, props
- Reducer puro e testável com discriminated union de actions
- Estratégia de testes abrangente (reducer + hooks + componentes)
- Build zero-erro com `tsc --noEmit` e produção otimizada com Vite
- Cobertura de edge cases: loading, empty, error, disabled states em todos os componentes
- Estilização type-safe via `DefaultTheme` augmentation com transient props (`$prefix`)

**Recomendações práticas para evolução futura:**

1. **Fatiar o contexto** quando o número de consumidores crescer (separar leitura e escrita do contexto para evitar re-renderizações desnecessárias).
2. **Normalizar `messages`** no estado para busca O(1) e evitar duplicatas.
3. **Extrair `extractErrorMessage`** como utilitário para remover repetição nos hooks.
4. **Adicionar testes de integração** para `ChatPage` (fluxo completo de envio e recebimento).
5. **Configurar `jest --coverage`** e estabelecer meta de 80%+.
6. **Adicionar tratamento de concorrência** em `sendMessage`: se o usuário enviar múltiplas mensagens antes da primeira resposta, garantir ordem correta (ex: fila de requisições ou cancelamento da anterior).
7. **Migrar de Styled-Components** para uma solução zero-runtime (CSS Modules, Panda, vanilla-extract) se a performance de runtime for crítica no futuro.
8. **Internacionalização**: extrair strings hardcoded (`pt-BR`, "Nenhuma mensagem ainda", etc.) para um sistema de i18n (react-i18next ou similar).
9. **Adicionar *Suspense boundaries*** para loading de conversas (React 18 Suspense), melhorando a percepção de carregamento.
10. **Melhorar UX mobile**: adicionar botão de toggle do sidebar e bottom sheet para histórico.

No estado atual, o projeto é sólido para um MVP/primeira versão. As recomendações acima são para cenários de escala e maturidade — nenhuma delas é crítica para o funcionamento atual, que está **buildando e testando com zero erros**.
