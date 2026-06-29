import type { ButtonHTMLAttributes, ReactNode } from 'react'
import * as S from './Button.styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export default function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <S.Wrapper $variant={variant} {...props}>
      {children}
    </S.Wrapper>
  )
}
