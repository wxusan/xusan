import { renderToString } from 'react-dom/server';
import App from './App.jsx';
export const render = language => renderToString(<App initialLanguage={language} />);
