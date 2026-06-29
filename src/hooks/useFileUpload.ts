import { useState, useCallback } from 'react'
import { useChatContext } from '../contexts/ChatContext'
import { uploadDocument } from '../api/chat'
import { validateFile } from '../utils/fileValidation'
import type { FileInfo } from '../api/types'

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { state } = useChatContext()

  const uploadFile = useCallback(
    async (file: File) => {
      const validation = validateFile(file)
      if (!validation.valid) {
        setError(validation.error)
        return
      }

      setIsUploading(true)
      setError(null)

      try {
        const result = await uploadDocument(file, state.activeId ?? '')
        setUploadedFile(result)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao fazer upload'
        setError(message)
      } finally {
        setIsUploading(false)
      }
    },
    [state.activeId],
  )

  return {
    isUploading,
    uploadedFile,
    error,
    uploadFile,
  }
}
