import * as S from './ChatMessage.styles'
import FileIcon from '../common/FileIcon/FileIcon'
import { formatDate } from '../../utils/formatDate'
import type { Message } from '../../api/types'

interface ChatMessageProps {
  message: Message
  isOwn: boolean
}

export default function ChatMessage({ message, isOwn }: ChatMessageProps) {
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
        <S.Timestamp>{formatDate(message.timestamp)}</S.Timestamp>
      </S.Bubble>
    </S.Wrapper>
  )
}
