import React from 'react';
import('./App').then(({ default: App }) => {
  return import('react-dom/client').then(({ createRoot }) => {
    createRoot(document.getElementById('root')).render(<App />);
  });
});
