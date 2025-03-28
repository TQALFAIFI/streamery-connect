
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create a root element
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render the app without Clerk provider
root.render(<App />);
