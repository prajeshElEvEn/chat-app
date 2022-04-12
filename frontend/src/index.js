import React from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
