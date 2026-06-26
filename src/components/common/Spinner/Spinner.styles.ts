import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const sizes = {
  sm: '16px',
  md: '24px',
  lg: '40px',
}

export const Wrapper = styled.div<{ $size: 'sm' | 'md' | 'lg' }>`
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`
