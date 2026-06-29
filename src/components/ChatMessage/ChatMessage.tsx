import * as S from './ChatMessage.styles'
import FileIcon from '../common/FileIcon/FileIcon'
import { formatDate } from '../../utils/formatDate'
import type { Message } from '../../api/types'

interface ChatMessageProps {
  message: Message
  isOwn: boolean
}

export default function ChatMessage({ message, isOwn }: ChatMessageProps) {
  const hasSources = message.sources && message.sources.length > 0

  return (
    <S.Wrapper $isOwn={isOwn}>
      <S.Bubble $isOwn={isOwn}>
        {message.attachment && (
          <S.Attachment>
            <FileIcon fileType={message.attachment.fileType} />
            <S.FileName>{message.attachment.fileName}</S.FileName>
          </S.Attachment>
        )}
        <S.Content>{message.content}</S.Content>
        {hasSources && (
          <S.SourcesWrapper>
            <S.SourcesTitle>Fontes consultadas:</S.SourcesTitle>
            {message.sources!.map((source) => (
              <S.SourceItem key={source.documentId}>
                <S.SourceIcon>📄</S.SourceIcon>
                <S.SourceText>{source.fileName}</S.SourceText>
              </S.SourceItem>
            ))}
          </S.SourcesWrapper>
        )}
        <S.Timestamp>{formatDate(message.timestamp)}</S.Timestamp>
      </S.Bubble>
    </S.Wrapper>
  )
}
