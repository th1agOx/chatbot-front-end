// ChatInput.styles.ts — versão melhorada

import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`

export const Textarea = styled.textarea`
  flex: 1;
  resize: none;
  overflow-y: auto;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.5;
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions?.normal ?? '200ms ease'},
              box-shadow ${({ theme }) => theme.transitions?.normal ?? '200ms ease'};
  max-height: 160px;
  background: ${({ theme }) => theme.colors.surface};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight ?? '#EEF2FF'};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.surfaceElevated ?? '#F0F4FF'};
    cursor: not-allowed;
    opacity: 0.6;
  }

 
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions?.fast ?? '150ms ease'},
              transform 100ms ease,
              opacity ${({ theme }) => theme.transitions?.fast ?? '150ms ease'};
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent ?? '#06B6D4'};
    outline-offset: 2px;
  }
`

export const SendLabel = styled.span`

  @media (max-width: 360px) {
    display: none;
  }
`