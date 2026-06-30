// ChatInput.tsx — versão melhorada

import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import * as S from './ChatInput.styles'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Expansão automática da textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`
  }, [text])

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const canSend = text.trim().length > 0 && !disabled

  return (
    <S.Wrapper>
      <S.Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem… (Enter para enviar, Shift+Enter para nova linha)"
        disabled={disabled}
        rows={1}
        aria-label="Campo de mensagem"
        aria-multiline="true"
      />
      <S.SendButton
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        aria-label="Enviar mensagem"
        title="Enviar (Enter)"
      >
        {/* Ícone de avião de papel */}
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
        <S.SendLabel>Enviar</S.SendLabel>
      </S.SendButton>
    </S.Wrapper>
  )
}