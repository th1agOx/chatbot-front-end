import { useCallback, useEffect } from 'react'
import { useChatContext } from '../contexts/ChatContext'
import { listConversations, getConversationHistory, createConversation, updateConversation, deleteConversation as deleteConversationApi } from '../api/chat'

export function useHistory() {
  const { state, dispatch } = useChatContext()

  const loadConversations = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      const conversations = await listConversations()
      dispatch({ type: 'SET_CONVERSATIONS', payload: conversations })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar conversas'
      dispatch({ type: 'SET_ERROR', payload: message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [dispatch])

  const selectConversation = useCallback(
    async (id: string | number) => {
      dispatch({ type: 'SELECT_CONVERSATION', payload: id })
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      try {
        const history = await getConversationHistory(id)
        dispatch({ type: 'SET_MESSAGES', payload: history })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar histórico'
        dispatch({ type: 'SET_ERROR', payload: message })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [dispatch],
  )

  const createConversationFn = useCallback(
    async (title: string) => {
      try {
        const newConversation = await createConversation(title)
        dispatch({ type: 'SET_CONVERSATIONS', payload: [...state.conversations, newConversation] })
        dispatch({ type: 'SELECT_CONVERSATION', payload: newConversation.id })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao criar conversa'
        dispatch({ type: 'SET_ERROR', payload: message })
      }
    },
    [dispatch, state.conversations],
  )

  const renameConversation = useCallback(
    async (id: string | number, title: string) => {
      try {
        const updated = await updateConversation(id, title)
        dispatch({ type: 'UPDATE_CONVERSATION', payload: updated })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao renomear conversa'
        dispatch({ type: 'SET_ERROR', payload: message })
      }
    },
    [dispatch],
  )

  const deleteConversation = useCallback(
    async (id: string | number) => {
      try {
        await deleteConversationApi(id)
        dispatch({ type: 'DELETE_CONVERSATION', payload: id })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao excluir conversa'
        dispatch({ type: 'SET_ERROR', payload: message })
      }
    },
    [dispatch],
  )

  useEffect(() => {
    loadConversations()
  }, [loadConversations])

  return {
    conversations: state.conversations,
    activeId: state.activeId,
    isLoading: state.isLoading,
    selectConversation,
    loadConversations,
    createConversation: createConversationFn,
    renameConversation,
    deleteConversation,
  }
}
