import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
   font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input, textarea, button, select {
    font-family: inherit;
    font-size: inherit;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }
    :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: 4px;
  }

 
  :focus:not(:focus-visible) {
    outline: none;
  }



<textarea
  aria-label="Campo de mensagem"
  aria-multiline="true"
  aria-disabled={disabled}
  aria-describedby={disabled ? "chat-disabled-reason" : undefined}
/>


<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  {isLoading ? 'Assistente está digitando...' : ''}
</div>
`

export default GlobalStyles
