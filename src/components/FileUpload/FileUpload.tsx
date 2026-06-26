import { useRef, useState, type DragEvent } from 'react'
import * as S from './FileUpload.styles'
import FileIcon from '../common/FileIcon/FileIcon'
import { validateFile } from '../../utils/fileValidation'

interface FileUploadProps {
  onUpload: (file: File) => void
  accept?: string
  disabled: boolean
}

export default function FileUpload({
  onUpload,
  accept = '.txt,.pdf',
  disabled,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file: File) => {
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error)
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

  const handleClick = () => inputRef.current?.click()

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
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        hidden
        disabled={disabled}
      />
      <S.Icon>
        <FileIcon fileType="txt" />
      </S.Icon>
      <S.Text>
        {isDragging ? 'Solte o arquivo aqui' : 'Arraste um arquivo ou clique para enviar'}
      </S.Text>
      <S.Hint>PDF ou TXT até 10MB</S.Hint>
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Wrapper>
  )
}
