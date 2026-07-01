import { useState, useCallback } from 'react'
import { validateFile } from '../utils/fileValidation'

export function useFileUpload() {
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selectFile = useCallback((file: File) => {
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error)
      setPendingFile(null)
      return
    }
    setError(null)
    setPendingFile(file)
  }, [])

  const clearPendingFile = useCallback(() => {
    setPendingFile(null)
    setError(null)
  }, [])

  return {
    pendingFile,
    error,
    selectFile,
    clearPendingFile,
  }
}
