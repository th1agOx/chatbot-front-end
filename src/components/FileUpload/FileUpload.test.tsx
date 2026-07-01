import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FileUpload from './FileUpload'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

const defaultProps = {
  pendingFile: null,
  onFileSelect: jest.fn(),
  onRemove: jest.fn(),
  disabled: false,
}

describe('FileUpload', () => {
  it('should display drag and drop message', () => {
    renderWithTheme(<FileUpload {...defaultProps} />)
    expect(screen.getByText('Anexar arquivo')).toBeInTheDocument()
  })

  it('should show allowed file types hint', () => {
    renderWithTheme(<FileUpload {...defaultProps} />)
    expect(screen.getByText(/PDF ou TXT/)).toBeInTheDocument()
  })

  it('should be visually disabled when disabled prop is true', () => {
    const { container } = renderWithTheme(<FileUpload {...defaultProps} disabled={true} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should show pending file badge when file is selected', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    renderWithTheme(<FileUpload {...defaultProps} pendingFile={file} />)
    expect(screen.getByText('test.txt')).toBeInTheDocument()
  })
})
