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
  const { conversations, activeId, isLoading: historyLoading, selectConversation } = useHistory()
  const { isUploading, uploadFile } = useFileUpload()

  const isLoading = chatLoading || historyLoading || isUploading

  return (
    <S.Container>
      <S.Sidebar>
        <ConversationList
          conversations={conversations}
          onSelect={selectConversation}
          activeId={activeId}
        />
      </S.Sidebar>
      <S.Main>
        <S.Header>
  <S.HeaderAvatar aria-hidden="true">
    {/* SVG do bot */}
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
          <FileUpload onUpload={uploadFile} disabled={isLoading} />
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </S.InputArea>
      </S.Main>
    </S.Container>
  )
}
