import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      primaryHover: string
      primaryLight: string
      accent: string
      accentLight: string
      background: string
      surface: string
      surfaceElevated: string
      text: string
      textSecondary: string
      textMuted: string
      border: string
      error: string
      success: string
      warning: string
      userBubble: string
      userText: string
      botBubble: string
      botText: string
      sidebarBg: string
      sidebarText: string
      sidebarHover: string
      sidebarActive: string
    }
    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    borderRadius: {
      sm: string
      md: string
      lg: string
      xl: string
      full: string
    }
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    shadows: {
      sm: string
      md: string
      lg: string
      bubble: string
    }
    transitions: {
      fast: string
      normal: string
      slow: string
      spring: string
    }
  }
}
