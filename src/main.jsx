import React from 'react'
import ReactDOM from 'react-dom/client'
import { Global } from '@emotion/react'
import { GlobalStyle } from './styles/global'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={GlobalStyle} />

  </React.StrictMode>
)
