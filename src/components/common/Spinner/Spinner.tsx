import * as S from './Spinner.styles'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

export default function Spinner({ size = 'md' }: SpinnerProps) {
  return <S.Wrapper $size={size} />
}
