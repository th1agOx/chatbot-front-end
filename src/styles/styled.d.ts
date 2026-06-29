import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      primaryHover: string
      secondary: string
      secondaryHover: string
      background: string
      surface: string
      text: string
      textSecondary: string
      border: string
      error: string
      success: string
      userBubble: string
      userText: string
      assistantBubble: string
      assistantText: string
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
  }
}
