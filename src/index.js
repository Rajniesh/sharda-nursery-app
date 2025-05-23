import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Create a root
const container = document.getElementById('root');
const root = createRoot(container);

// Render your app
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);