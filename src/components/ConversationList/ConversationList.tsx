import { useState, useRef, useCallback } from 'react'
import * as S from './ConversationList.styles'
import type { Conversation } from '../../api/types'
import { formatShortDate } from '../../utils/formatDate'

interface ConversationListProps {
  conversations: Conversation[]
  onSelect: (id: string) => void
  onRename: (id: string, newTitle: string) => void
  activeId: string | null
}

export default function ConversationList({
  conversations,
  onSelect,
  onRename,
  activeId,
}: ConversationListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const startEditing = useCallback((id: string, currentTitle: string) => {
    setEditingId(id)
    setEditValue(currentTitle)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  const cancelEditing = useCallback(() => {
    setEditingId(null)
    setEditValue('')
  }, [])

  const saveEditing = useCallback(
    (id: string) => {
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
                </S.ItemTitleRow>
              )}
              <S.ItemMeta>
                <span>{conv.messageCount} mensagens</span>
                <span>{formatShortDate(conv.updatedAt ?? conv.lastMessageAt)}</span>
              </S.ItemMeta>
            </S.Item>
          )
        })}
      </S.List>
    </S.Wrapper>
  )
}
