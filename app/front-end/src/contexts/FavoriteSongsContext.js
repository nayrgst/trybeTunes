import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const FavoriteSongsContext = createContext();

export const FavoriteSongsProvider = ({ children }) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const addToFavorites = (song) => {
    setFavoriteSongs((prevSongs) => [...prevSongs, song]);
  };

  const removeFromFavorites = (songId) => {
    setFavoriteSongs((prevSongs) => prevSongs.filter((song) => song.trackId !== songId));
  };

  const isFavorite = (songId) => favoriteSongs.some((song) => song.trackId === songId);

  const contextValue = {
    favoriteSongs,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <FavoriteSongsContext.Provider value={ contextValue }>
      {children}
    </FavoriteSongsContext.Provider>
  );
};

FavoriteSongsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
