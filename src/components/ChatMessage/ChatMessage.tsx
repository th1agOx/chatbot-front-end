// ChatMessage.tsx — versão melhorada

import { memo } from 'react'
import * as S from './ChatMessage.styles'
import FileIcon from '../common/FileIcon/FileIcon'
import { formatDate } from '../../utils/formatDate'
import type { Message } from '../../api/types'

interface ChatMessageProps {
  message: Message
  isOwn: boolean
}

// Avatar do bot — SVG simples ou ícone de robô amigável
const BotAvatar = () => (
  <S.AvatarWrapper aria-hidden="true">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#5B5BD6" />
      <circle cx="10" cy="12" r="2" fill="white" />
      <circle cx="18" cy="12" r="2" fill="white" />
      <rect x="9" y="17" width="10" height="2" rx="1" fill="white" />
    </svg>
  </S.AvatarWrapper>
)

function ChatMessage({ message, isOwn }: ChatMessageProps) {
  const hasSources = message.sources && message.sources.length > 0

  return (
    <S.Wrapper $isOwn={isOwn} role="listitem">
      {!isOwn && <BotAvatar />}
      <S.Bubble $isOwn={isOwn}>
        {message.attachment && (
          <S.Attachment>
            <FileIcon fileType={message.attachment.fileType} />
            <S.FileName>{message.attachment.fileName}</S.FileName>
          </S.Attachment>
        )}
        <S.Content>{message.content}</S.Content>

        {hasSources && (
          <S.SourcesWrapper $isOwn={isOwn} aria-label="Fontes consultadas">
            <S.SourcesTitle>Fontes consultadas:</S.SourcesTitle>
            {message.sources!.map((source) => (
              <S.SourceItem key={source.documentId}>
                <S.SourceIconWrapper aria-hidden="true">📄</S.SourceIconWrapper>
                <S.SourceText title={source.fileName}>{source.fileName}</S.SourceText>
              </S.SourceItem>
            ))}
          </S.SourcesWrapper>
        )}

        <S.Timestamp>
          <time dateTime={message.timestamp}>{formatDate(message.timestamp)}</time>
        </S.Timestamp>
      </S.Bubble>
    </S.Wrapper>
  )
}

export default memo(ChatMessage)  // memo evita re-renders desnecessários