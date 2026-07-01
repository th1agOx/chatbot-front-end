import * as S from './ConversationList.styles'
import type { Conversation } from '../../api/types'
import { formatShortDate } from '../../utils/formatDate'

interface ConversationListProps {
  conversations: Conversation[]
  onSelect: (id: number) => void
  onDelete: (id: number) => void
  activeId: number | null
}

export default function ConversationList({
  conversations,
  onSelect,
  onDelete,
  activeId,
}: ConversationListProps) {
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
        {conversations.map((conv) => (
          <S.Item
            key={conv.id}
            $active={conv.id === activeId}
            onClick={() => onSelect(conv.id)}
          >
            <S.ItemContent>
              <S.ItemTitle>{conv.title}</S.ItemTitle>
              <S.ItemMeta>
                <span>{conv.messageCount} mensagens</span>
                <span>{formatShortDate(conv.lastMessageAt)}</span>
              </S.ItemMeta>
            </S.ItemContent>
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
          </S.Item>
        ))}
      </S.List>
    </S.Wrapper>
  )
}
