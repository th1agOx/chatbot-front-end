export interface Attachment {
  fileName: string
  fileType: 'txt' | 'pdf'
  fileUrl: string
}

export interface SourceReference {
  documentId: number
  fileName: string
  excerpt: string
}

export interface Message {
  id: string | number
  role: 'USER' | 'BOT'
  content: string
  timestamp: string
  createdAt?: string
  attachment?: Attachment | null
  sources?: SourceReference[]
}

export interface Conversation {
  id: string
  title: string
  lastMessageAt: string
  messageCount: number
  messages?: Message[]
}

export interface FileInfo {
  fileId: string
  fileName: string
  fileType: 'txt' | 'pdf'
  sizeBytes: number
  uploadedAt: string
}

export interface ChatRequest {
  conversationId: number | null
  message: string
}

export interface ChatResponse {
  userMessage: Message
  botMessage: Message
  answer: string
  sources: SourceReference[]
  executionTimeMs: number
  chunksConsumed: number
}

export interface GetConversationHistoryResponse {
  id: string
  title: string
  messages: Message[]
}

export interface AttachmentResponse {
  id: number
  fileName: string
  contentType: string
  size: number
  uploadDate: string
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

export interface ErrorResponse {
  status: number
  error: string
  message: string
  path: string
  timestamp: string
}

export interface ChatState {
  conversations: Conversation[]
  activeId: string | null
  messages: Message[]
  isLoading: boolean
  error: string | null
}

export type ChatAction =
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_CONVERSATION'; payload: string | null } 
