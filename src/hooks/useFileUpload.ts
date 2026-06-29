import { useState, useCallback } from 'react'
import { uploadAI } from '../api/chat'
import { validateFile } from '../utils/fileValidation'
import type { DocumentResponse } from '../api/types'

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<DocumentResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

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
        const result = await uploadAI(file)
        setUploadedFile(result)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao fazer upload'
        setError(message)
      } finally {
        setIsUploading(false)
      }
    },
    [],
  )

  return {
    isUploading,
    uploadedFile,
    error,
    uploadFile,
  }
}
