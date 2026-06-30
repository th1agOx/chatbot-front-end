const theme = {
  colors: {
    // Primária: Azul-violeta vibrante, amigável, menos "corporativo" que o indigo puro
    primary: '#5B5BD6',          // Indigo vibrante suavizado
    primaryHover: '#4A4ABF',
    primaryLight: '#EEF2FF',     // Fundo sutil de contexto primário

    // Acento: Ciano alegre para microinterações e destaques
    accent: '#06B6D4',           // Ciano 500
    accentLight: '#CFFAFE',

    // Superfícies
    background: '#F8FAFF',       // Azul-branco em vez de cinza puro
    surface: '#FFFFFF',
    surfaceElevated: '#F0F4FF',  // Cards e balões do bot

    // Texto
    text: '#1E1B4B',             // Índigo-escuro em vez de cinza-carvão
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',

    // Limites e divisores
    border: '#E0E7FF',           // Azul-claro em vez de cinza

    // Estado do sistema
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',

    // Balões de conversa
    userBubble: '#5B5BD6',       // Primária
    userText: '#FFFFFF',
    botBubble: '#F0F4FF',        // Superfície elevada — suave, não cinza
    botText: '#1E1B4B',

    // Sidebar
    sidebarBg: '#1E1B4B',        // Índigo-escuro para contraste e profissionalismo
    sidebarText: '#E0E7FF',
    sidebarHover: '#2D2A6E',
    sidebarActive: '#5B5BD6',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  shadows: {
  sm: '0 1px 3px rgba(30, 27, 75, 0.08)',
  md: '0 4px 12px rgba(30, 27, 75, 0.10)',
  lg: '0 8px 24px rgba(30, 27, 75, 0.12)',
  bubble: '0 2px 8px rgba(91, 91, 214, 0.15)',  // sombra para balões do usuário
},
transitions: {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '350ms ease',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // "pop" natural para aparecer mensagens
}

}

export default theme
