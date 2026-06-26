import styled from 'styled-components'

export const Wrapper = styled.div<{ $isOwn: boolean }>`
  display: flex;
  justify-content: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
`

export const Bubble = styled.div<{ $isOwn: boolean }>`
  max-width: 70%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.userBubble : theme.colors.assistantBubble};
  color: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.userText : theme.colors.assistantText};
  border-bottom-${({ $isOwn }) => ($isOwn ? 'right' : 'left')}-radius: ${({ theme }) => theme.borderRadius.sm};
`

export const Content = styled.p`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`

export const Timestamp = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const Attachment = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const FileName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
`
