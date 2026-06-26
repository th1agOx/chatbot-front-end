import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyles from './styles/globalStyles'
import { ChatProvider } from './contexts/ChatContext'
import ChatPage from './pages/ChatPage'
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary fallback={<h1>Erro inesperado. Tente recarregar a página.</h1>}>
        <ChatProvider>
          <ChatPage />
        </ChatProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
