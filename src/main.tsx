
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Apply the stored theme before rendering to avoid flash
const theme = localStorage.getItem('theme') || 
  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.classList.add(theme);

createRoot(document.getElementById("root")!).render(<App />);
