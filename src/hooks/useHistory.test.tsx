import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react'
import { useHistory } from './useHistory'
import { ChatProvider } from '../contexts/ChatContext'
import * as chatApi from '../api/chat'
import type { ReactNode } from 'react'

jest.mock('../api/chat')

function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ChatProvider>{children}</ChatProvider>
  }
}

describe('useHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should load conversations on mount', async () => {
    const mockConversations = [
      { id: '1', title: 'Conv 1', lastMessageAt: '2024-01-01T00:00:00Z', messageCount: 2 },
    ]
    ;(chatApi.listConversations as jest.Mock).mockResolvedValue(mockConversations)

    const { result } = renderHook(() => useHistory(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })

    expect(result.current.conversations).toEqual(mockConversations)
    expect(result.current.isLoading).toBe(false)
  })

  it('should select conversation', async () => {
    ;(chatApi.listConversations as jest.Mock).mockResolvedValue([])
    const mockHistory = {
      id: '1',
      title: 'Conv 1',
      messages: [
        { id: 'm1', role: 'USER', content: 'Hi', timestamp: '2024-01-01T00:00:00Z' },
      ],
    }
    ;(chatApi.getConversationHistory as jest.Mock).mockResolvedValue(mockHistory)

    const { result } = renderHook(() => useHistory(), { wrapper: createWrapper() })

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })

    await act(async () => {
      await result.current.selectConversation('1')
    })

    expect(result.current.activeId).toBe('1')
  })

  it('should rename conversation', async () => {
    const updatedConv = {
      id: '1',
      title: 'Renamed',
      lastMessageAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-03T00:00:00Z',
      messageCount: 2,
    }
    ;(chatApi.listConversations as jest.Mock).mockResolvedValue([
      { id: '1', title: 'Original', lastMessageAt: '2024-01-01T00:00:00Z', messageCount: 2 },
    ])
    ;(chatApi.updateConversation as jest.Mock).mockResolvedValue(updatedConv)

    const { result } = renderHook(() => useHistory(), { wrapper: createWrapper() })

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })

    await act(async () => {
      await result.current.renameConversation('1', 'Renamed')
    })

    expect(chatApi.updateConversation).toHaveBeenCalledWith('1', 'Renamed')
    expect(result.current.conversations[0].title).toBe('Renamed')
    expect(result.current.conversations[0].updatedAt).toBe('2024-01-03T00:00:00Z')
  })
})
