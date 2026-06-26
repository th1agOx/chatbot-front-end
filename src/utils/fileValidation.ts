import { MAX_FILE_SIZE_BYTES, ALLOWED_FILE_TYPES } from './constants'

export interface FileValidationResult {
  valid: boolean
  error: string | null
}

export function validateFile(file: File): FileValidationResult {
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (!extension || !ALLOWED_FILE_TYPES.includes(extension as typeof ALLOWED_FILE_TYPES[number])) {
    return {
      valid: false,
      error: `Tipo de arquivo não permitido. Use: ${ALLOWED_FILE_TYPES.join(', ')}`,
    }
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`,
    }
  }

  return { valid: true, error: null }
}

export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? ''
}
