import { useState, type KeyboardEvent } from 'react'
import * as S from './ChatInput.styles'
import Button from '../common/Button/Button'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('')

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

  return (
    <S.Wrapper>
      <S.Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem..."
        disabled={disabled}
        rows={1}
      />
      <Button disabled={disabled || !text.trim()} onClick={handleSend}>
        Enviar
      </Button>
    </S.Wrapper>
  )
}
