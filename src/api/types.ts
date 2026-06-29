export interface Attachment {
  fileName: string
  fileType: 'txt' | 'pdf'
  fileUrl: string
}

export interface Message {
  id: string | number
  role: 'USER' | 'BOT'
  content: string
  timestamp: string
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

export interface SendMessageRequest {
  conversationId: string | null
  message: string
}

export interface SendMessageResponse {
  userMessage: Message
  botMessage: Message
}

export interface GetConversationHistoryResponse {
  id: string
  title: string
  messages: Message[]
}

export interface UploadDocumentResponse {
  fileId: string
  fileName: string
  fileType: 'txt' | 'pdf'
  sizeBytes: number
  uploadedAt: string
}

export interface ChatState {
  conversations: Conversation[]
  activeId: string| null
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
