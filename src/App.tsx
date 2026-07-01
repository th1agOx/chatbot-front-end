import GlobalStyles from './styles/globalStyles'
import { ThemeProviderWrapper } from './contexts/ThemeContext'
import { ChatProvider } from './contexts/ChatContext'
import ChatPage from './pages/ChatPage'
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary'

export default function App() {
  return (
    <ThemeProviderWrapper>
      <GlobalStyles />
      <ErrorBoundary fallback={<h1>Erro inesperado. Tente recarregar a página.</h1>}>
        <ChatProvider>
          <ChatPage />
        </ChatProvider>
      </ErrorBoundary>
    </ThemeProviderWrapper>
  )
}
