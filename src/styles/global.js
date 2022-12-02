import { css } from "@emotion/react";

export const GlobalStyle = css`
  :root {
    --background: #d3d3d3;
    --light-gray: #bbbbbb;
    --medium-gray: #9b9b9b;
  }

  html {
    scroll-behavior: smooth;
    height: calc(var(--vh, 1vh) * 100);
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 90.5%;
    }
  }

  * {
    font-family: "Roboto", sans-serif;
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

  button,
  form,
  input {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
  }

  [disabled] {
    opacity: 0.5;
    cursor: default;
  }
`;
