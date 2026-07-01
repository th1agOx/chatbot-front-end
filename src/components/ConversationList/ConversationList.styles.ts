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
`

export const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const ItemTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
