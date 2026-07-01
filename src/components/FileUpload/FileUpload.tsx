import { useRef, useState, type DragEvent, type KeyboardEvent } from 'react'
import * as S from './FileUpload.styles'
import { validateFile } from '../../utils/fileValidation'

interface FileUploadProps {
  pendingFile: File | null
  onFileSelect: (file: File) => void
  onRemove: () => void
  accept?: string
  disabled: boolean
}

export default function FileUpload({
  pendingFile,
  onFileSelect,
  onRemove,
  accept = '.txt,.pdf',
  disabled,
}: FileUploadProps) {
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
    onFileSelect(file)
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
    if (!disabled && !pendingFile) inputRef.current?.click()
  }

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

  if (pendingFile) {
    return (
      <S.BadgeWrapper>
        <S.BadgeIcon aria-hidden="true">📎</S.BadgeIcon>
        <S.BadgeText>{pendingFile.name}</S.BadgeText>
        <S.RemoveButton
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          disabled={disabled}
          aria-label="Remover arquivo"
          title="Remover arquivo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </S.RemoveButton>
      </S.BadgeWrapper>
    )
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
