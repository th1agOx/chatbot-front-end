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
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: ${theme.colors.primary}10;
          border-left: 3px solid ${theme.colors.primary};
        `
      : css`
          &:hover {
            background-color: ${theme.colors.assistantBubble};
          }
        `}
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

export const EmptyText = styled.p`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`
