import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import ProfileEdit from './components/ProfileEdit';
import Redirect from './components/Redirect';
import FavoriteSongsContext from './contexts/FavoriteSongsContext';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';

function App() {
  return (
    <section>
      <BrowserRouter>
        <FavoriteSongsContext>
          <Routes>
            <Route exact path="*" element={ <NotFound /> } />
            <Route exact path="/album/:id" element={ <Album /> } />
            <Route exact path="/profile/edit" element={ <ProfileEdit /> } />
            <Route exact path="/profile" element={ <Profile /> } />
            <Route exact path="/favorites" element={ <Favorites /> } />
            <Route exact path="/search" element={ <Search /> } />
            <Route exact path="/login" element={ <Login /> } />
            <Route exact path="/" element={ <Redirect /> } />
          </Routes>
        </FavoriteSongsContext>
      </BrowserRouter>
    </section>
  );
}

export default App;
