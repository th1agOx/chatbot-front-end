// ChatHistory.tsx — versão melhorada

import { useEffect, useRef } from 'react'
import * as S from './ChatHistory.styles'
import ChatMessage from '../ChatMessage/ChatMessage'
import type { Message } from '../../api/types'

interface ChatHistoryProps {
  messages?: Message[]
  isLoading: boolean
}

// Indicador de "bot digitando..."
const TypingIndicator = () => (
  <S.TypingWrapper role="status" aria-label="Assistente está digitando">
    <S.TypingAvatar aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="14" fill="#5B5BD6" />
        <circle cx="10" cy="12" r="2" fill="white" />
        <circle cx="18" cy="12" r="2" fill="white" />
        <rect x="9" y="17" width="10" height="2" rx="1" fill="white" />
      </svg>
    </S.TypingAvatar>
    <S.TypingBubble>
      <S.Dot $delay="0ms" />
      <S.Dot $delay="160ms" />
      <S.Dot $delay="320ms" />
    </S.TypingBubble>
  </S.TypingWrapper>
)

// Empty state com personalidade
const EmptyState = () => (
  <S.EmptyWrapper role="status" aria-label="Início da conversa">
    <S.EmptyIcon aria-hidden="true">👋</S.EmptyIcon>
    <S.EmptyTitle>Olá! Sou seu assistente de TI</S.EmptyTitle>
    <S.EmptySubtext>
      Posso ajudar com problemas de conexão, acesso a sistemas,<br />
      redefinição de senha e muito mais.
    </S.EmptySubtext>
    <S.EmptyHint>Digite uma mensagem abaixo para começar.</S.EmptyHint>
  </S.EmptyWrapper>
)

export default function ChatHistory({ messages = [], isLoading }: ChatHistoryProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <S.Wrapper role="list" aria-label="Histórico de mensagens" aria-live="polite">
      {messages.length === 0 && !isLoading && <EmptyState />}

      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} isOwn={msg.role === 'USER'} />
      ))}

      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} aria-hidden="true" />
    </S.Wrapper>
  )
}