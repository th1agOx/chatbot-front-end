import apiClient from './client'
import type {
  SendMessageRequest,
  SendMessageResponse,
  Conversation,
  GetConversationHistoryResponse,
  UploadDocumentResponse,
} from './types'


export async function createConversation(title: string): Promise<Conversation> {
  const response = await apiClient.post<Conversation>('/api/conversations', { title })
  return response.data
}


export async function sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
  const response = await apiClient.post<SendMessageResponse>('/api/chat/send', data)
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

export async function uploadDocument(
  file: File,
  conversationId: string,
): Promise<UploadDocumentResponse> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('conversationId', conversationId)

  const response = await apiClient.post<UploadDocumentResponse>('/api/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export async function deleteConversation(id: string): Promise<void> {
  await apiClient.delete(`/api/conversations/${id}`)
}
