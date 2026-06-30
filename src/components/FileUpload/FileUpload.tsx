// FileUpload.tsx — versão melhorada

import { useRef, useState, type DragEvent, type KeyboardEvent } from 'react'
import * as S from './FileUpload.styles'
import { validateFile } from '../../utils/fileValidation'

interface FileUploadProps {
  onUpload: (file: File) => void
  accept?: string
  disabled: boolean
}

export default function FileUpload({ onUpload, accept = '.txt,.pdf', disabled }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file: File) => {
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error ?? 'Arquivo inválido')
      return
    }
    setError(null)
    onUpload(file)
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleClick = () => {
    if (!disabled) inputRef.current?.click()
  }

  // Suporte a teclado: Enter e Space ativam o input
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const handleChange = () => {
    const file = inputRef.current?.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <S.Wrapper
      $isDragging={isDragging}
      $disabled={disabled}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Anexar arquivo. Arraste e solte ou pressione Enter para abrir seletor de arquivo"
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        hidden
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
      />
      <S.UploadIcon aria-hidden="true">
        {isDragging ? '📂' : '📎'}
      </S.UploadIcon>
      <S.Text>
        {isDragging ? 'Solte para anexar' : 'Anexar arquivo'}
      </S.Text>
      <S.Hint>PDF ou TXT · máx. 10 MB</S.Hint>
      {error && (
        <S.ErrorText role="alert" aria-live="assertive">
          {error}
        </S.ErrorText>
      )}
    </S.Wrapper>
  )
}