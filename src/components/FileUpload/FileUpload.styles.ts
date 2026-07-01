import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ $isDragging: boolean; $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  ${({ $isDragging, theme }) =>
    $isDragging &&
    css`
      border-color: ${theme.colors.primary};
      background-color: ${theme.colors.primary}08;
    `}

  &:hover {
    border-color: ${({ $disabled, theme }) =>
      $disabled ? theme.colors.border : theme.colors.primary};
  }
`

export const UploadIcon = styled.div`
  font-size: 1.5rem;
  opacity: 0.6;
`

export const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

export const Hint = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  max-width: 100%;
`

export const BadgeIcon = styled.span`
  font-size: 1rem;
  flex-shrink: 0;
`

export const BadgeText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error}15;
    color: ${({ theme }) => theme.colors.error};
  }
`
