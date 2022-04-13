import React from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from './context/chatProvider';
import 'boxicons'

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <ChatProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </ChatProvider>
);
