
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set dark theme by default
const theme = 'dark';
localStorage.setItem('theme', theme);
document.documentElement.classList.add(theme);

createRoot(document.getElementById("root")!).render(<App />);
