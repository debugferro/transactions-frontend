import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #FFFFFF;
  }

  html {
    height: calc(var(--vh, 1vh) * 100);
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 90.5%;
    }
  }

  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background);
    height: inherit;

    > #root {
      height: inherit;
    }
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.5;
    cursor: default;
  }
`