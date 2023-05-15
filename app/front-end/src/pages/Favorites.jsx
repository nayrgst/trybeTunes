import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Load from '../components/Load';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

const Favorites = () => {
  const [favorite, setFavorite] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      setLoad(true);
      try {
        const songs = await getFavoriteSongs();
        setFavorite(songs);
      } catch (error) {
        console.error('Erro ao obter músicas favoritas:', error);
      } finally {
        setLoad(false);
      }
    };

    fetchFavoriteSongs();
  }, []);

  const removeFavoriteSong = (trackId) => {
    setLoad(true);
    const updatedFavorite = favorite.filter((song) => song.trackId !== trackId);
    setFavorite(updatedFavorite);
    setLoad(false);
  };

  return (
    <div data-testid="page-favorites">
      <Header />
      {load ? (
        <Load />
      ) : (
        favorite.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            onFavoriteClick={ () => removeFavoriteSong(music.trackId) }
            isFavorite
          />
        ))
      )}
    </div>
  );
};

export default Favorites;
