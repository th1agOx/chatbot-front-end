import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react'
import { useFileUpload } from './useFileUpload'
import * as chatApi from '../api/chat'

jest.mock('../api/chat')

describe('useFileUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate and upload a file', async () => {
    const mockResponse = {
      id: 1,
      fileName: 'test.txt',
      contentType: 'text/plain',
      fileSize: 1000,
      chunkCount: 5,
      uploadedAt: '2024-01-01T00:00:00Z',
    }
    ;(chatApi.uploadAI as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useFileUpload())
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })

    await act(async () => {
      await result.current.uploadFile(file)
    })

    expect(result.current.isUploading).toBe(false)
    expect(result.current.uploadedFile).toEqual(mockResponse)
    expect(result.current.error).toBeNull()
  })

  it('should reject invalid file type', async () => {
    const { result } = renderHook(() => useFileUpload())
    const file = new File(['test'], 'test.exe', { type: 'application/exe' })

    await act(async () => {
      await result.current.uploadFile(file)
    })

    expect(result.current.error).toContain('não permitido')
    expect(result.current.uploadedFile).toBeNull()
  })

  it('should reject files larger than 10MB', async () => {
    const { result } = renderHook(() => useFileUpload())
    const largeContent = new ArrayBuffer(11 * 1024 * 1024)
    const file = new File([largeContent], 'test.pdf', { type: 'application/pdf' })

    await act(async () => {
      await result.current.uploadFile(file)
    })

    expect(result.current.error).toContain('muito grande')
    expect(result.current.uploadedFile).toBeNull()
  })
})
