// ChatMessage.styles.ts — versão melhorada

import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Wrapper = styled.div<{ $isOwn: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
  animation: ${slideIn} 250ms ${({ theme }) => theme.transitions?.spring ?? 'ease'};

  /* Respeitar preferências de movimento reduzido */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 4px; /* alinha com a base do balão */
`

export const Bubble = styled.div<{ $isOwn: boolean }>`
  max-width: 68%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.userBubble : theme.colors.botBubble};
  color: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.userText : theme.colors.botText};
  box-shadow: ${({ $isOwn, theme }) =>
    $isOwn ? theme.shadows?.bubble ?? 'none' : theme.shadows?.sm ?? 'none'};

  /* "bico" da conversa */
  border-bottom-${({ $isOwn }) => ($isOwn ? 'right' : 'left')}-radius: 4px;
`

export const Content = styled.p`
  margin: 0;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: ${({ theme }) => theme.fontSize.md};
`

export const Timestamp = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
  opacity: 0.6;
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-align: right;
`

export const SourcesWrapper = styled.div<{ $isOwn?: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ $isOwn }) =>
    $isOwn ? 'rgba(255,255,255,0.25)' : 'rgba(30,27,75,0.1)'};
`

export const SourcesTitle = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  opacity: 0.85;
`

export const SourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 2px 0;
`

export const Attachment = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const FileName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const SourceIconWrapper = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  flex-shrink: 0;
`

export const SourceText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  opacity: 0.8;
  word-break: break-all;
`
