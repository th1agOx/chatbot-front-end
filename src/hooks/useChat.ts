import { useCallback } from 'react'
import { useChatContext } from '../contexts/ChatContext'
import { createConversation, sendMessage as sendMessageApi } from '../api/chat'
import type { Message } from '../api/types'


export function useChat() {
  const { state, dispatch } = useChatContext()

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'USER',
        content: text,
        timestamp: new Date().toISOString(),
      }

      dispatch({ type: 'ADD_MESSAGE', payload: userMessage })
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

if (!state.activeId) {
  const newConv = await createConversation('Nova conversa')
  dispatch({ type: 'SELECT_CONVERSATION', payload: newConv.id })
}


      try {
        const response = await sendMessageApi({
          conversationId: state.activeId,
          message: text,
        })

        dispatch({ type: 'ADD_MESSAGE', payload: response.userMessage })
        dispatch({ type: 'ADD_MESSAGE', payload: response.botMessage })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao enviar mensagem'
        dispatch({ type: 'SET_ERROR', payload: message })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [state.activeId, dispatch],
  )

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
  }
}
