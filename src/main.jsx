import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { languageFromPath } from './lib/siteMetadata';
import './fonts.css';
import './index.css';
import './components/landing.css';

const root = document.getElementById('root');
const app = <StrictMode><App initialLanguage={languageFromPath(window.location.pathname)} /></StrictMode>;
if (root.children.length) hydrateRoot(root, app);
else createRoot(root).render(app);
