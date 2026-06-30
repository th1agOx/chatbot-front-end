import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
`

export const Wrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  flex-direction: column;
`

export const LoadingWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const EmptyWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`


export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const EmptyTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

export const EmptySubtext = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 360px;
`

export const EmptyHint = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted ?? '#9CA3AF'};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const TypingWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
`

export const TypingAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`

export const TypingBubble = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.botBubble ?? '#F0F4FF'};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border-bottom-left-radius: 4px;
`

export const Dot = styled.span<{ $delay: string }>`
  width: 7px;
  height: 7px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${bounce} 1.2s ease infinite;
  animation-delay: ${({ $delay }) => $delay};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.6;
  }
`

export const LoadingBubble = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
`
