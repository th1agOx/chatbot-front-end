import styled from 'styled-components'

export const Icon = styled.span<{ $fileType: 'txt' | 'pdf' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: white;
  background-color: ${({ $fileType }) => ($fileType === 'pdf' ? '#EF4444' : '#3B82F6')};
`
