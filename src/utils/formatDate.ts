function safeParse(isoString: string): Date | null {
  if (!isoString) return null
  const date = new Date(isoString)
  return isNaN(date.getTime()) ? null : date
}

export function formatDate(isoString: string): string {
  const date = safeParse(isoString)
  if (!date) return '---'
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatShortDate(isoString: string): string {
  const date = safeParse(isoString)
  if (!date) return '---'
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  if (diffDays === 1) {
    return 'Ontem'
  }

  if (diffDays < 7) {
    return date.toLocaleDateString('pt-BR', { weekday: 'long' })
  }

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}
