import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ConversationList from './ConversationList'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'
import type { Conversation } from '../../api/types'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

const conversations: Conversation[] = [
  { id: '1', title: 'Conversa 1', lastMessageAt: '2024-01-01T00:00:00Z', messageCount: 3 },
  { id: '2', title: 'Conversa 2', lastMessageAt: '2024-01-02T00:00:00Z', messageCount: 5 },
]

describe('ConversationList', () => {
  it('should show empty message when no conversations', () => {
    renderWithTheme(
      <ConversationList conversations={[]} onSelect={jest.fn()} activeId={null} />,
    )
    expect(screen.getByText('Nenhuma conversa')).toBeInTheDocument()
  })

  it('should render conversation items', () => {
    renderWithTheme(
      <ConversationList conversations={conversations} onSelect={jest.fn()} activeId={null} />,
    )
    expect(screen.getByText('Conversa 1')).toBeInTheDocument()
    expect(screen.getByText('Conversa 2')).toBeInTheDocument()
  })

  it('should call onSelect when an item is clicked', () => {
    const onSelect = jest.fn()
    renderWithTheme(
      <ConversationList conversations={conversations} onSelect={onSelect} activeId={null} />,
    )
    fireEvent.click(screen.getByText('Conversa 1'))
    expect(onSelect).toHaveBeenCalledWith('1')
  })
})
