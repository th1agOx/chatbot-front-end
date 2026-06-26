import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ChatMessage from './ChatMessage'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'
import type { Message } from '../../api/types'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

const userMessage: Message = {
  id: '1',
  role: 'USER',
  content: 'Olá',
  timestamp: '2024-01-01T12:00:00Z',
}

const assistantMessage: Message = {
  id: '2',
  role: 'ASSISTANT',
  content: 'Como posso ajudar?',
  timestamp: '2024-01-01T12:00:01Z',
  attachment: {
    fileName: 'documento.pdf',
    fileType: 'pdf',
    fileUrl: 'http://example.com/doc.pdf',
  },
}

describe('ChatMessage', () => {
  it('should render user message content', () => {
    renderWithTheme(<ChatMessage message={userMessage} isOwn={true} />)
    expect(screen.getByText('Olá')).toBeInTheDocument()
  })

  it('should render assistant message content', () => {
    renderWithTheme(<ChatMessage message={assistantMessage} isOwn={false} />)
    expect(screen.getByText('Como posso ajudar?')).toBeInTheDocument()
  })

  it('should display attachment info when present', () => {
    renderWithTheme(<ChatMessage message={assistantMessage} isOwn={false} />)
    expect(screen.getByText('documento.pdf')).toBeInTheDocument()
    expect(screen.getByText('PDF')).toBeInTheDocument()
  })
})
