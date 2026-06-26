import * as S from './ConversationList.styles'
import type { Conversation } from '../../api/types'
import { formatShortDate } from '../../utils/formatDate'

interface ConversationListProps {
  conversations: Conversation[]
  onSelect: (id: string) => void
  activeId: string | null
}

export default function ConversationList({
  conversations,
  onSelect,
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
            <S.ItemTitle>{conv.title}</S.ItemTitle>
            <S.ItemMeta>
              <span>{conv.messageCount} mensagens</span>
              <span>{formatShortDate(conv.lastMessageAt)}</span>
            </S.ItemMeta>
          </S.Item>
        ))}
      </S.List>
    </S.Wrapper>
  )
}
