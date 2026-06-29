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

  it('should send a message and add user and bot messages', async () => {
    const mockResponse = {
      userMessage: {
        id: 'msg-1',
        role: 'USER',
        content: 'Olá',
        createdAt: '2024-01-01T00:00:00Z',
      },
      botMessage: {
        id: 'msg-2',
        role: 'BOT',
        content: 'Resposta do assistente',
        createdAt: '2024-01-01T00:00:01Z',
      },
      answer: 'Resposta do assistente',
      sources: [{ documentId: 1, fileName: 'doc.pdf', excerpt: 'Trecho...' }],
      executionTimeMs: 1234,
      chunksConsumed: 3,
    }
    ;(chatApi.sendMessage as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useChat(), { wrapper: createWrapper() })

    await act(async () => {
      await result.current.sendMessage('Olá')
    })

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2)
    })

    expect(result.current.messages[0].role).toBe('USER')
    expect(result.current.messages[0].content).toBe('Olá')
    expect(result.current.messages[1].role).toBe('BOT')
    expect(result.current.messages[1].content).toBe('Resposta do assistente')
    expect(result.current.messages[1].sources).toHaveLength(1)
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
