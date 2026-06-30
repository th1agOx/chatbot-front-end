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
