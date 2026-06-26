import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatInput from './ChatInput'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('ChatInput', () => {
  it('should enable the button when text is typed', () => {
    renderWithTheme(<ChatInput onSend={jest.fn()} disabled={false} />)
    const textarea = screen.getByPlaceholderText('Digite sua mensagem...')
    const button = screen.getByRole('button', { name: 'Enviar' })

    expect(button).toBeDisabled()
    fireEvent.change(textarea, { target: { value: 'Olá' } })
    expect(button).toBeEnabled()
  })

  it('should call onSend when Enter is pressed', async () => {
    const onSend = jest.fn()
    renderWithTheme(<ChatInput onSend={onSend} disabled={false} />)
    const textarea = screen.getByPlaceholderText('Digite sua mensagem...')

    await userEvent.type(textarea, 'Hello{Enter}')
    expect(onSend).toHaveBeenCalledWith('Hello')
    expect(textarea).toHaveValue('')
  })

  it('should disable textarea and button when disabled is true', () => {
    renderWithTheme(<ChatInput onSend={jest.fn()} disabled={true} />)
    const textarea = screen.getByPlaceholderText('Digite sua mensagem...')
    const button = screen.getByRole('button', { name: 'Enviar' })

    expect(textarea).toBeDisabled()
    expect(button).toBeDisabled()
  })
})
