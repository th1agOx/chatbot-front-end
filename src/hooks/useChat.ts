import { useCallback } from 'react'
import { useChatContext } from '../contexts/ChatContext'
import { sendMessage as sendMessageApi, sendWithFile as sendWithFileApi } from '../api/chat'

export function useChat() {
  const { state, dispatch } = useChatContext()

  const sendMessage = useCallback(
    async (text: string, file?: File | null) => {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      try {
        const response = file
          ? await sendWithFileApi(state.activeId, text, file)
          : await sendMessageApi({
              conversationId: state.activeId,
              message: text,
            })

        const botMessage = {
          ...response.botMessage,
          sources: response.sources,
        }

        dispatch({ type: 'ADD_MESSAGE', payload: response.userMessage })
        dispatch({ type: 'ADD_MESSAGE', payload: botMessage })
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
