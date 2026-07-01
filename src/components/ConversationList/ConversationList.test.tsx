import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ConversationList from './ConversationList'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'
import type { Conversation } from '../../api/types'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

const conversations: Conversation[] = [
  { id: 1, title: 'Conversa 1', lastMessageAt: '2024-01-01T00:00:00Z', messageCount: 3 },
  { id: 2, title: 'Conversa 2', lastMessageAt: '2024-01-02T00:00:00Z', messageCount: 5 },
]

describe('ConversationList', () => {
  it('should show empty message when no conversations', () => {
    renderWithTheme(
      <ConversationList conversations={[]} onSelect={jest.fn()} onDelete={jest.fn()} onRename={jest.fn()} activeId={null} />,
    )
    expect(screen.getByText('Nenhuma conversa')).toBeInTheDocument()
  })

  it('should render conversation items', () => {
    renderWithTheme(
      <ConversationList conversations={conversations} onSelect={jest.fn()} onDelete={jest.fn()} onRename={jest.fn()} activeId={null} />,
    )
    expect(screen.getByText('Conversa 1')).toBeInTheDocument()
    expect(screen.getByText('Conversa 2')).toBeInTheDocument()
  })

  it('should call onSelect when an item is clicked', () => {
    const onSelect = jest.fn()
    renderWithTheme(
      <ConversationList conversations={conversations} onSelect={onSelect} onDelete={jest.fn()} onRename={jest.fn()} activeId={null} />,
    )
    fireEvent.click(screen.getByText('Conversa 1'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('should enter edit mode when edit button is clicked', () => {
    const onRename = jest.fn()
    renderWithTheme(
      <ConversationList conversations={conversations} onSelect={jest.fn()} onDelete={jest.fn()} onRename={onRename} activeId={null} />,
    )
    const editButtons = screen.getAllByTitle('Renomear')
    fireEvent.click(editButtons[0])
    const input = screen.getByDisplayValue('Conversa 1')
    expect(input).toBeInTheDocument()
  })

  it('should call onRename with new title on Enter', () => {
    const onRename = jest.fn()
    renderWithTheme(
      <ConversationList conversations={conversations} onSelect={jest.fn()} onDelete={jest.fn()} onRename={onRename} activeId={null} />,
    )
    const editButtons = screen.getAllByTitle('Renomear')
    fireEvent.click(editButtons[0])
    const input = screen.getByDisplayValue('Conversa 1')
    fireEvent.change(input, { target: { value: 'Novo Título' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onRename).toHaveBeenCalledWith(1, 'Novo Título')
  })

  it('should not call onRename for empty title', () => {
    const onRename = jest.fn()
    renderWithTheme(
      <ConversationList conversations={conversations} onSelect={jest.fn()} onDelete={jest.fn()} onRename={onRename} activeId={null} />,
    )
    const editButtons = screen.getAllByTitle('Renomear')
    fireEvent.click(editButtons[0])
    const input = screen.getByDisplayValue('Conversa 1')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onRename).not.toHaveBeenCalled()
  })

  it('should cancel editing on Escape', () => {
    const onRename = jest.fn()
    renderWithTheme(
      <ConversationList conversations={conversations} onSelect={jest.fn()} onDelete={jest.fn()} onRename={onRename} activeId={null} />,
    )
    const editButtons = screen.getAllByTitle('Renomear')
    fireEvent.click(editButtons[0])
    const input = screen.getByDisplayValue('Conversa 1')
    fireEvent.change(input, { target: { value: 'Novo Título' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(onRename).not.toHaveBeenCalled()
    expect(screen.getByText('Conversa 1')).toBeInTheDocument()
  })
})
