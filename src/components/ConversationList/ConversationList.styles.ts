import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const List = styled.ul`
  flex: 1;
  overflow-y: auto;
`

export const ItemTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ItemTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const EditInput = styled.input`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  padding: 2px 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  font-family: inherit;
`

export const EditButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const Item = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: ${theme.colors.primary}10;
          border-left: 3px solid ${theme.colors.primary};
        `
      : css`
          &:hover {
            background-color: ${theme.colors.surfaceElevated};
          }
        `}

  &:hover ${EditButton} {
    display: inline-flex;
  }
`

export const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
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

export const EmptyText = styled.p`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`
