import * as S from './ChatPage.styles'
import ConversationList from '../components/ConversationList/ConversationList'
import ChatHistory from '../components/ChatHistory/ChatHistory'
import ChatInput from '../components/ChatInput/ChatInput'
import FileUpload from '../components/FileUpload/FileUpload'
import { useChat } from '../hooks/useChat'
import { useHistory } from '../hooks/useHistory'
import { useFileUpload } from '../hooks/useFileUpload'

export default function ChatPage() {
  const { messages, isLoading: chatLoading, error, sendMessage } = useChat()
  const { conversations, activeId, isLoading: historyLoading, selectConversation, deleteConversation } = useHistory()
  const { pendingFile, selectFile, clearPendingFile } = useFileUpload()

  const isLoading = chatLoading || historyLoading

  const handleSend = (text: string) => {
    sendMessage(text, pendingFile)
    clearPendingFile()
  }

  return (
    <S.Container>
      <S.Sidebar>
        <ConversationList
          conversations={conversations}
          onSelect={selectConversation}
          onDelete={deleteConversation}
          activeId={activeId}
        />
      </S.Sidebar>
      <S.Main>
        <S.Header>
          <S.HeaderAvatar aria-hidden="true">
          </S.HeaderAvatar>
          <S.HeaderInfo>
            <S.HeaderName>Assistente de TI</S.HeaderName>
            <S.HeaderStatus>
              <S.StatusDot aria-hidden="true" /> Online
            </S.HeaderStatus>
          </S.HeaderInfo>
        </S.Header>
        {error && <S.ErrorBanner>{error}</S.ErrorBanner>}
        <ChatHistory messages={messages} isLoading={isLoading} />
        <S.InputArea>
          <FileUpload
            pendingFile={pendingFile}
            onFileSelect={selectFile}
            onRemove={clearPendingFile}
            disabled={isLoading}
          />
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </S.InputArea>
      </S.Main>
    </S.Container>
  )
}
