import apiClient from './client'
import type {
  ChatRequest,
  ChatResponse,
  Conversation,
  GetConversationHistoryResponse,
  DocumentResponse,
  AttachmentResponse,
  LoginRequest,
  LoginResponse,
  UserCreateRequest,
  UserResponse,
} from './types'


export async function updateConversation(id: string, title: string): Promise<Conversation> {
  const response = await apiClient.put<Conversation>(`/api/conversations/${id}`, { title })
  return response.data
}


export async function createConversation(title: string): Promise<Conversation> {
  const response = await apiClient.post<Conversation>('/api/conversations', { title })
  return response.data
}


export async function sendMessage(data: ChatRequest): Promise<ChatResponse> {
  const response = await apiClient.post<ChatResponse>('/api/chat/send', data)
  return response.data
}

export async function listConversations(): Promise<Conversation[]> {
  const response = await apiClient.get<Conversation[]>('/api/conversations')
  return response.data
}

export async function getConversationHistory(id: string): Promise<GetConversationHistoryResponse> {
  const response = await apiClient.get<GetConversationHistoryResponse>(`/api/chat/history/${id}`)
  return response.data
}

export async function uploadLegacyFile(
  file: File,
  conversationId: string,
): Promise<AttachmentResponse> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('conversationId', conversationId)

  const response = await apiClient.post<AttachmentResponse>('/api/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export async function uploadAI(file: File): Promise<DocumentResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<DocumentResponse>('/api/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export async function deleteConversation(id: string): Promise<void> {
  await apiClient.delete(`/api/conversations/${id}`)
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', data)
  return response.data
}

export async function createUser(data: UserCreateRequest): Promise<UserResponse> {
  const response = await apiClient.post<UserResponse>('/api/users', data)
  return response.data
}

export async function getCurrentUser(): Promise<UserResponse> {
  const response = await apiClient.get<UserResponse>('/api/users/me')
  return response.data
}
