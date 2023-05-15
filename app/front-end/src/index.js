import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FavoriteSongsProvider } from './contexts/FavoriteSongsContext';

ReactDOM.render(
  <BrowserRouter>
    <FavoriteSongsProvider>
      <App />
    </FavoriteSongsProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
