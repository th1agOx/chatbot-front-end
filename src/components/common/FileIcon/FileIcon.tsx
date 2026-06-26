import * as S from './FileIcon.styles'

interface FileIconProps {
  fileType: 'txt' | 'pdf'
}

export default function FileIcon({ fileType }: FileIconProps) {
  return <S.Icon $fileType={fileType}>{fileType.toUpperCase()}</S.Icon>
}
