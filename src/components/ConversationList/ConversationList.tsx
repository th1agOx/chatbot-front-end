import { useState, useRef, useCallback } from 'react'
import * as S from './ConversationList.styles'
import type { Conversation } from '../../api/types'
import { formatShortDate } from '../../utils/formatDate'

interface ConversationListProps {
  conversations: Conversation[]
  onSelect: (id: string | number) => void
  onDelete: (id: string | number) => void
  onRename: (id: string | number, newTitle: string) => void
  activeId: string | number | null
}

export default function ConversationList({
  conversations,
  onSelect,
  onDelete,
  onRename,
  activeId,
}: ConversationListProps) {
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [editValue, setEditValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const startEditing = useCallback((id: string | number, currentTitle: string) => {
    setEditingId(id)
    setEditValue(currentTitle)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  const cancelEditing = useCallback(() => {
    setEditingId(null)
    setEditValue('')
  }, [])

  const saveEditing = useCallback(
    (id: string | number) => {
      const trimmed = editValue.trim()
      if (trimmed) {
        onRename(id, trimmed)
      }
      setEditingId(null)
      setEditValue('')
    },
    [editValue, onRename],
  )

  if (conversations.length === 0) {
    return (
      <S.Wrapper>
        <S.EmptyText>Nenhuma conversa</S.EmptyText>
      </S.Wrapper>
    )
  }

  return (
    <S.Wrapper>
      <S.Title>Conversas</S.Title>
      <S.List>
        {conversations.map((conv) => {
          const isEditing = editingId === conv.id

          return (
            <S.Item
              key={conv.id}
              $active={conv.id === activeId}
              onClick={() => {
                if (!isEditing) onSelect(conv.id)
              }}
            >
              {isEditing ? (
                <S.EditInput
                  ref={inputRef}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => saveEditing(conv.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEditing(conv.id)
                    if (e.key === 'Escape') cancelEditing()
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <S.ItemTitleRow>
                  <S.ItemTitle>{conv.title}</S.ItemTitle>
                  <S.EditButton
                    onClick={(e) => {
                      e.stopPropagation()
                      startEditing(conv.id, conv.title)
                    }}
                    title="Renomear"
                  >
                    ✏
                  </S.EditButton>
                  <S.DeleteButton
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(conv.id)
                    }}
                    title="Excluir conversa"
                    aria-label="Excluir conversa"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </S.DeleteButton>
                </S.ItemTitleRow>
              )}
              <S.ItemMeta>
                <span>{conv.messageCount ?? 0} mensagens</span>
                <span>{formatShortDate(conv.updatedAt ?? conv.lastMessageAt ?? '')}</span>
              </S.ItemMeta>
            </S.Item>
          )
        })}
      </S.List>
    </S.Wrapper>
  )
}
