import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FileUpload from './FileUpload'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('FileUpload', () => {
  it('should display drag and drop message', () => {
    renderWithTheme(<FileUpload onUpload={jest.fn()} disabled={false} />)
    expect(screen.getByText('Anexar arquivo')).toBeInTheDocument()
  })

  it('should show allowed file types hint', () => {
    renderWithTheme(<FileUpload onUpload={jest.fn()} disabled={false} />)
    expect(screen.getByText(/PDF ou TXT/)).toBeInTheDocument()
  })

  it('should be visually disabled when disabled prop is true', () => {
    const { container } = renderWithTheme(<FileUpload onUpload={jest.fn()} disabled={true} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
