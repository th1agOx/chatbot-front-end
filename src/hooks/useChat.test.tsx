import '@testing-library/jest-dom'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useChat } from './useChat'
import { ChatProvider } from '../contexts/ChatContext'
import * as chatApi from '../api/chat'
import type { ReactNode } from 'react'

jest.mock('../api/chat')

beforeEach(() => {
  Object.defineProperty(globalThis, 'crypto', {
    value: { randomUUID: () => 'test-uuid' },
    writable: true,
  })
})

function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ChatProvider>{children}</ChatProvider>
  }
}

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send a message and add user and assistant messages', async () => {
    const mockReply = {
      conversationId: 'conv-1',
      reply: {
        id: 'reply-1',
        role: 'ASSISTANT',
        content: 'Resposta do assistente',
        timestamp: '2024-01-01T00:00:01Z',
      },
    }
    ;(chatApi.sendMessage as jest.Mock).mockResolvedValue(mockReply)

    const { result } = renderHook(() => useChat(), { wrapper: createWrapper() })

    await act(async () => {
      await result.current.sendMessage('Olá')
    })

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2)
    })

    expect(result.current.messages[0].role).toBe('USER')
    expect(result.current.messages[0].content).toBe('Olá')
    expect(result.current.messages[1].role).toBe('ASSISTANT')
    expect(result.current.messages[1].content).toBe('Resposta do assistente')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should handle API error', async () => {
    ;(chatApi.sendMessage as jest.Mock).mockRejectedValue(new Error('Erro de rede'))

    const { result } = renderHook(() => useChat(), { wrapper: createWrapper() })

    await act(async () => {
      await result.current.sendMessage('Olá')
    })

    await waitFor(() => {
      expect(result.current.error).toBe('Erro de rede')
    })

    expect(result.current.isLoading).toBe(false)
  })
})
