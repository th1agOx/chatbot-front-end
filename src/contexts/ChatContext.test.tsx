import { chatReducer, initialState } from './ChatContext'
import type { Message, Conversation } from '../api/types'

describe('ChatContext', () => {
  it('should return initial state', () => {
    expect(initialState).toEqual({
      conversations: [],
      activeId: null,
      messages: [],
      isLoading: false,
      error: null,
    })
  })

  it('should handle SET_CONVERSATIONS', () => {
    const conversations: Conversation[] = [
      { id: '1', title: 'Test', lastMessageAt: '2024-01-01', messageCount: 1 },
    ]
    const state = chatReducer(initialState, { type: 'SET_CONVERSATIONS', payload: conversations })
    expect(state.conversations).toEqual(conversations)
  })

  it('should handle ADD_MESSAGE', () => {
    const message: Message = {
      id: '1',
      role: 'USER',
      content: 'Hello',
      timestamp: '2024-01-01T00:00:00Z',
    }
    const state = chatReducer(initialState, { type: 'ADD_MESSAGE', payload: message })
    expect(state.messages).toHaveLength(1)
    expect(state.messages[0]).toEqual(message)
  })

  it('should handle SET_MESSAGES', () => {
    const messages: Message[] = [
      { id: '1', role: 'USER', content: 'Hi', timestamp: '2024-01-01T00:00:00Z' },
      { id: '2', role: 'BOT', content: 'Hello!', timestamp: '2024-01-01T00:00:01Z' },
    ]
    const state = chatReducer(initialState, { type: 'SET_MESSAGES', payload: messages })
    expect(state.messages).toHaveLength(2)
  })

  it('should handle SET_LOADING', () => {
    const state = chatReducer(initialState, { type: 'SET_LOADING', payload: true })
    expect(state.isLoading).toBe(true)
  })

  it('should handle SET_ERROR', () => {
    const state = chatReducer(initialState, { type: 'SET_ERROR', payload: 'Error message' })
    expect(state.error).toBe('Error message')
  })

  it('should handle SELECT_CONVERSATION and reset messages', () => {
    const stateWithMessages = chatReducer(initialState, {
      type: 'ADD_MESSAGE',
      payload: { id: '1', role: 'USER', content: 'Hi', timestamp: '' },
    })
    const state = chatReducer(stateWithMessages, { type: 'SELECT_CONVERSATION', payload: '2' })
    expect(state.activeId).toBe('2')
    expect(state.messages).toHaveLength(0)
    expect(state.error).toBeNull()
  })
})
