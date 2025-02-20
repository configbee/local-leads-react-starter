import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ConfigbeeProvider from "./configbee-provider.tsx"
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigbeeProvider>
      <App />
    </ConfigbeeProvider>
  </StrictMode>
);