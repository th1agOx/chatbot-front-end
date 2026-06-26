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
