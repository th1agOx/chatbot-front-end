Qual versão do React você prefere para o projeto?
React 18 (Recommended)
Prefere usar JavaScript ou TypeScript?
TypeScript (Recommended)
Qual gerenciador de estado global prefere?
Context API + useReducer (Recommended)
Qual estilo de CSS prefere?
Styled Components

- Thought: 189ms
  Ótimas escolhas. Segue o Documento de Especificação do Sistema (SPEC) para o frontend do Chatbot SPA.
  System Specification Document — Chatbot Frontend SPA
  Stack Definida
  Camada Tecnologia
  Framework React 18
  Linguagem TypeScript 5+
  Bundler Vite 5+
  Estilização Styled-Components v6
  Estado Global Context API + useReducer
  HTTP Client Axios
  Testes Jest + React Testing Library
  Qualidade ESLint + Prettier

1. Estrutura de Diretórios
   chatbot-front-end/
   ├── public/
   │ └── favicon.svg
   ├── src/
   │ ├── api/
   │ │ ├── client.ts # Instância Axios configurada (baseURL, interceptors)
   │ │ ├── chat.ts # Funções de chamada: sendMessage, listHistory, uploadDocument
   │ │ └── types.ts # Interfaces de request/response (contratos)
   │ ├── components/
   │ │ ├── ChatInput/
   │ │ │ ├── ChatInput.tsx
   │ │ │ ├── ChatInput.styles.ts
   │ │ │ └── ChatInput.test.tsx
   │ │ ├── ChatMessage/
   │ │ │ ├── ChatMessage.tsx
   │ │ │ ├── ChatMessage.styles.ts
   │ │ │ └── ChatMessage.test.tsx
   │ │ ├── ChatHistory/
   │ │ │ ├── ChatHistory.tsx
   │ │ │ ├── ChatHistory.styles.ts
   │ │ │ └── ChatHistory.test.tsx
   │ │ ├── FileUpload/
   │ │ │ ├── FileUpload.tsx
   │ │ │ ├── FileUpload.styles.ts
   │ │ │ └── FileUpload.test.tsx
   │ │ ├── ConversationList/
   │ │ │ ├── ConversationList.tsx
   │ │ │ ├── ConversationList.styles.ts
   │ │ │ └── ConversationList.test.tsx
   │ │ └── common/
   │ │ ├── Button/
   │ │ ├── Spinner/
   │ │ ├── ErrorBoundary/
   │ │ └── FileIcon/
   │ ├── contexts/
   │ │ ├── ChatContext.tsx # Provider + reducer + state shape
   │ │ └── ChatContext.test.tsx
   │ ├── hooks/
   │ │ ├── useChat.ts # Envio de mensagens, loading, error
   │ │ ├── useHistory.ts # Listar conversas, selecionar conversa
   │ │ ├── useFileUpload.ts # Upload de arquivos .txt/.pdf
   │ │ └── useChat.test.ts
   │ ├── pages/
   │ │ └── ChatPage.tsx # Página única da SPA
   │ ├── styles/
   │ │ ├── globalStyles.ts
   │ │ └── theme.ts # Tema Styled-Components (cores, spacing, breakpoints)
   │ ├── utils/
   │ │ ├── formatDate.ts
   │ │ ├── fileValidation.ts # Valida extensão/tamanho
   │ │ └── constants.ts # URLs, configs
   │ ├── App.tsx
   │ ├── main.tsx
   │ └── vite-env.d.ts
   ├── .eslintrc.cjs
   ├── .prettierrc
   ├── jest.config.ts
   ├── tsconfig.json
   ├── vite.config.ts
   ├── package.json
   └── README.md
2. Componentes e Responsabilidades
   Componente Props
   ChatPage none
   ConversationList conversations: Conversation[]<br>onSelect: (id: string) => void<br>activeId: string | null
   ChatHistory messages: Message[]<br>isLoading: boolean
   ChatMessage message: Message<br>isOwn: boolean
   ChatInput onSend: (text: string) => void<br>disabled: boolean
   FileUpload onUpload: (file: File) => void<br>accept: string<br>disabled: boolean
   Button variant: 'primary' | 'secondary'<br>disabled: boolean<br>onClick: () => void<br>children: ReactNode
   Spinner size: 'sm' | 'md' | 'lg'
   ErrorBoundary fallback: ReactNode
   FileIcon fileType: 'txt' | 'pdf'
3. Hooks Customizados
   Hook Estado exposto Funções expostas
   useChat messages: Message[]<br>isLoading: boolean<br>error: string | null sendMessage(text: string): Promise<void>
   useHistory conversations: Conversation[]<br>activeId: string | null<br>isLoading: boolean selectConversation(id: string): void<br>loadConversations(): Promise<void>
   useFileUpload isUploading: boolean<br>uploadedFile: FileInfo | null<br>error: string | null uploadFile(file: File): Promise<void>
   Contexto global (ChatContext): Armazena { conversations, activeId, messages, loading, error } e expõe dispatch actions: SET_MESSAGES, SET_CONVERSATIONS, ADD_MESSAGE, SET_LOADING, SET_ERROR, SELECT_CONVERSATION.
4. Contratos de API (Frontend → Backend)
   4.1. sendMessage
   POST /api/chat/send
   Content-Type: application/json

Request:
{
"conversationId": "uuid" | null, // null = nova conversa
"content": "string" // texto da mensagem
}

Response 200:
{
"conversationId": "uuid",
"reply": {
"id": "uuid",
"role": "ASSISTANT",
"content": "string",
"timestamp": "ISO-8601"
}
}
4.2. listConversations
GET /api/chat/conversations

Response 200:
[
{
"id": "uuid",
"title": "string",
"lastMessageAt": "ISO-8601",
"messageCount": "number"
}
]
4.3. getConversationHistory
GET /api/chat/conversations/:id

Response 200:
{
"id": "uuid",
"title": "string",
"messages": [
{
"id": "uuid",
"role": "USER" | "ASSISTANT",
"content": "string",
"timestamp": "ISO-8601",
"attachment": {
"fileName": "string",
"fileType": "txt" | "pdf",
"fileUrl": "string"
} | null
}
]
}
4.4. uploadDocument
POST /api/chat/upload
Content-Type: multipart/form-data

Request:
file: File (.txt ou .pdf)
conversationId: "uuid"

Response 200:
{
"fileId": "uuid",
"fileName": "string",
"fileType": "txt" | "pdf",
"sizeBytes": number,
"uploadedAt": "ISO-8601"
}
4.5. deleteConversation
DELETE /api/chat/conversations/:id

Response 204 (No Content) 5. Tipos TypeScript (Contratos Internos)
// src/api/types.ts

export interface Message {
id: string;
role: 'USER' | 'ASSISTANT';
content: string;
timestamp: string;
attachment?: Attachment | null;
}

export interface Attachment {
fileName: string;
fileType: 'txt' | 'pdf';
fileUrl: string;
}

export interface Conversation {
id: string;
title: string;
lastMessageAt: string;
messageCount: number;
messages?: Message[];
}

export interface FileInfo {
fileId: string;
fileName: string;
fileType: 'txt' | 'pdf';
sizeBytes: number;
uploadedAt: string;
}

export interface ChatState {
conversations: Conversation[];
activeId: string | null;
messages: Message[];
isLoading: boolean;
error: string | null;
}

export type ChatAction =
| { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
| { type: 'SET_MESSAGES'; payload: Message[] }
| { type: 'ADD_MESSAGE'; payload: Message }
| { type: 'SET_LOADING'; payload: boolean }
| { type: 'SET_ERROR'; payload: string | null }
| { type: 'SELECT_CONVERSATION'; payload: string | null }; 6. Estratégia de Testes
6.1. Hooks (src/hooks/)
Hook O que testar
useChat Chamada sendMessage → mock axios retorna reply → mensagem adicionada ao estado.<br>Erro 4xx/5xx → error atualizado, isLoading = false.
useHistory loadConversations → mock GET → lista populada no estado.<br>selectConversation → activeId alterado + GET history carregado.
useFileUpload Upload de .txt válido → sucesso.<br>Upload de .exe → erro de validação sem chamar API.<br>Arquivo > 10MB → erro de tamanho.
Ferramentas: jest.spyOn(axios, ...), renderHook do @testing-library/react-hooks, act para ações assíncronas.
6.2. Componentes (src/components/\*/)
Componente O que testar
ChatInput Digita texto → botão habilitado.<br>Enter → onSend chamado com valor.<br>disabled=true → botão e textarea desabilitados.
ChatMessage Renderiza conteúdo + timestamp.<br>isOwn → alinhamento à direita.<br>Com attachment → exibe ícone e nome do arquivo.
ChatHistory Lista vazia → mensagem "Nenhuma mensagem ainda".<br>isLoading → Spinner visível.<br>Múltiplas mensagens → scroll automático para a última.
FileUpload Drag & drop de .pdf → onUpload chamado.<br>Arquivo inválido → feedback de erro visual.<br>Estado disabled → input bloqueado.
ConversationList Lista vazia → texto "Nenhuma conversa".<br>Item clicado → onSelect chamado com id.<br>Item ativo → destaque visual (classe ativa).
Ferramentas: render, screen, fireEvent / userEvent, jest.fn() para callbacks, @testing-library/jest-dom para asserções DOM.
6.3. Contexto (src/contexts/)
O que testar
Provider + reducer: dispatch ADD_MESSAGE → estado contém nova mensagem.
Dispatch SET_CONVERSATIONS → lista atualizada.
Dispatch SELECT_CONVERSATION → activeId alterado + mensagens resetadas.
Estado inicial corresponde ao initialState. 7. Dependências Node.js
Produção
Pacote Versão
react ^18.3.0
react-dom ^18.3.0
styled-components ^6.1.0
axios ^1.7.0
Desenvolvimento
Pacote Versão
vite ^5.4.0
@vitejs/plugin-react ^4.3.0
typescript ^5.5.0
@types/react ^18.3.0
@types/react-dom ^18.3.0
jest ^29.7.0
ts-jest ^29.2.0
@testing-library/react ^16.0.0
@testing-library/jest-dom ^6.5.0
@testing-library/user-event ^14.5.0
jest-environment-jsdom ^29.7.0
eslint ^9.0.0
@eslint/js ^9.0.0
typescript-eslint ^8.0.0
eslint-plugin-react-hooks ^4.6.0
prettier ^3.3.0
eslint-config-prettier ^9.1.0 8. Fluxo de Dados (Resumo)
User digita → ChatInput.onSend(text)
→ useChat.sendMessage(text)
→ dispatch(SET_LOADING, true)
→ axios.post(/api/chat/send, { conversationId, content })
→ dispatch(ADD_MESSAGE, userMessage)
→ dispatch(ADD_MESSAGE, assistantReply)
→ dispatch(SET_LOADING, false)
→ ChatHistory re-renderiza com mensagens atualizadas

User faz upload → FileUpload.onUpload(file)
→ useFileUpload.uploadFile(file)
→ valida extensão (.txt|.pdf) e tamanho (≤10MB)
→ axios.post(/api/chat/upload, formData)
→ dispatch(ADD_MESSAGE, messageWithAttachment)
O documento acima cobre todos os pontos solicitados. Assim que você aprovar, posso gerar o prompt para a implementação completa do código. Deseja sugerir ajustes ou está pronto para seguir?
