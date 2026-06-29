import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react'
import { useFileUpload } from './useFileUpload'
import { ChatProvider } from '../contexts/ChatContext'
import * as chatApi from '../api/chat'
import type { ReactNode } from 'react'

jest.mock('../api/chat')

function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ChatProvider>{children}</ChatProvider>
  }
}

describe('useFileUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate and upload a txt file', async () => {
    const mockResponse = {
      fileId: 'file-1',
      fileName: 'test.txt',
      fileType: 'txt',
      sizeBytes: 1000,
      uploadedAt: '2024-01-01T00:00:00Z',
    }
    ;(chatApi.uploadDocument as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useFileUpload(), { wrapper: createWrapper() })
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })

    await act(async () => {
      await result.current.uploadFile(file)
    })

    expect(result.current.isUploading).toBe(false)
    expect(result.current.uploadedFile).toEqual(mockResponse)
    expect(result.current.error).toBeNull()
  })

  it('should reject invalid file type', async () => {
    const { result } = renderHook(() => useFileUpload(), { wrapper: createWrapper() })
    const file = new File(['test'], 'test.exe', { type: 'application/exe' })

    await act(async () => {
      await result.current.uploadFile(file)
    })

    expect(result.current.error).toContain('não permitido')
    expect(result.current.uploadedFile).toBeNull()
  })

  it('should reject files larger than 10MB', async () => {
    const { result } = renderHook(() => useFileUpload(), { wrapper: createWrapper() })
    const largeContent = new ArrayBuffer(11 * 1024 * 1024)
    const file = new File([largeContent], 'test.pdf', { type: 'application/pdf' })

    await act(async () => {
      await result.current.uploadFile(file)
    })

    expect(result.current.error).toContain('muito grande')
    expect(result.current.uploadedFile).toBeNull()
  })
})
