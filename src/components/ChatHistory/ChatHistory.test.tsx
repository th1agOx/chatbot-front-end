import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

beforeEach(() => {
  Element.prototype.scrollIntoView = jest.fn()
})
import ChatHistory from './ChatHistory'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'
import type { Message } from '../../api/types'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('ChatHistory', () => {
  it('should show empty message when no messages', () => {
    renderWithTheme(<ChatHistory messages={[]} isLoading={false} />)
    expect(screen.getByText('Nenhuma mensagem ainda')).toBeInTheDocument()
  })

  it('should show spinner when loading and no messages', () => {
    const { container } = renderWithTheme(<ChatHistory messages={[]} isLoading={true} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('should render messages when provided', () => {
    const messages: Message[] = [
      { id: '1', role: 'USER', content: 'Oi', timestamp: '2024-01-01T00:00:00Z' },
      { id: '2', role: 'BOT', content: 'Olá!', timestamp: '2024-01-01T00:00:01Z' },
    ]
    renderWithTheme(<ChatHistory messages={messages} isLoading={false} />)
    expect(screen.getByText('Oi')).toBeInTheDocument()
    expect(screen.getByText('Olá!')).toBeInTheDocument()
  })
})
