export const API_BASE_URL = 'http://localhost:3000'

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export const ALLOWED_FILE_TYPES = ['txt', 'pdf'] as const

export const ACCEPTED_FILE_MIME_TYPES = {
  txt: '.txt',
  pdf: '.pdf',
} as const
