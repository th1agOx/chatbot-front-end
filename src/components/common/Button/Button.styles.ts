import styled, { css } from 'styled-components'

export const Wrapper = styled.button<{ $variant: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? css`
          background-color: ${theme.colors.primary};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.assistantBubble};
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
