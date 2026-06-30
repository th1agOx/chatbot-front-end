import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`

export const Sidebar = styled.aside`
  width: 300px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const ErrorBanner = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
`
// ChatPage.styles.ts — novos elementos

export const HeaderAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  flex-shrink: 0;
`

export const HeaderName = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

export const HeaderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.success};
`

export const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.success};
`
