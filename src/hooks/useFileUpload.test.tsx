import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react'
import { useFileUpload } from './useFileUpload'

describe('useFileUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should accept a valid file', async () => {
    const { result } = renderHook(() => useFileUpload())
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })

    await act(async () => {
      result.current.selectFile(file)
    })

    expect(result.current.pendingFile).toBe(file)
    expect(result.current.error).toBeNull()
  })

  it('should reject invalid file type', async () => {
    const { result } = renderHook(() => useFileUpload())
    const file = new File(['test'], 'test.exe', { type: 'application/exe' })

    await act(async () => {
      result.current.selectFile(file)
    })

    expect(result.current.error).toContain('não permitido')
    expect(result.current.pendingFile).toBeNull()
  })

  it('should reject files larger than 10MB', async () => {
    const { result } = renderHook(() => useFileUpload())
    const largeContent = new ArrayBuffer(11 * 1024 * 1024)
    const file = new File([largeContent], 'test.pdf', { type: 'application/pdf' })

    await act(async () => {
      result.current.selectFile(file)
    })

    expect(result.current.error).toContain('muito grande')
    expect(result.current.pendingFile).toBeNull()
  })

  it('should clear pending file', async () => {
    const { result } = renderHook(() => useFileUpload())
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })

    await act(async () => {
      result.current.selectFile(file)
    })

    expect(result.current.pendingFile).toBe(file)

    await act(async () => {
      result.current.clearPendingFile()
    })

    expect(result.current.pendingFile).toBeNull()
    expect(result.current.error).toBeNull()
  })
})
