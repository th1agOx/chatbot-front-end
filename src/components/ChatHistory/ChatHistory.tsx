import { useEffect, useRef } from 'react'
import * as S from './ChatHistory.styles'
import ChatMessage from '../ChatMessage/ChatMessage'
import Spinner from '../common/Spinner/Spinner'
import type { Message } from '../../api/types'

interface ChatHistoryProps {
  messages: Message[]
  isLoading: boolean
}

export default function ChatHistory({ messages, isLoading }: ChatHistoryProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading && messages.length === 0) {
    return (
      <S.LoadingWrapper>
        <Spinner size="lg" />
      </S.LoadingWrapper>
    )
  }

  if (messages.length === 0) {
    return (
      <S.EmptyWrapper>
        <S.EmptyText>Nenhuma mensagem ainda</S.EmptyText>
        <S.EmptySubtext>Envie uma mensagem para começar a conversar</S.EmptySubtext>
      </S.EmptyWrapper>
    )
  }

  return (
    <S.Wrapper>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} isOwn={msg.role === 'USER'} />
      ))}
      {isLoading && (
        <S.LoadingBubble>
          <Spinner size="sm" />
        </S.LoadingBubble>
      )}
      <div ref={bottomRef} />
    </S.Wrapper>
  )
}
