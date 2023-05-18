import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { getMusics } from '../utils/fetchs';
import Load from './Load';

const MusicCard = ({ previewUrl, trackName, trackId, onFavoriteClick }) => {
  const [load, setLoad] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchFavoriteSongs = async () => {
      const songs = await getFavoriteSongs();
      const isFavorite = songs.some((song) => song.trackId === trackId);
      if (isMounted) {
        setFavorite(isFavorite);
      }
    };

    fetchFavoriteSongs();

    return () => {
      isMounted = false;
    };
  }, [trackId]);

  const addFavoriteSong = async () => {
    setLoad(true);
    setFavorite(true);
    const musics = await getMusics(trackId);
    await addSong(musics[0]);
    setLoad(false);
  };

  const removeFavoriteSong = async () => {
    setLoad(true);
    setFavorite(false);
    await removeSong(trackId);
    setLoad(false);
  };

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavoriteSong();
    } else {
      addFavoriteSong();
    }

    if (onFavoriteClick) {
      onFavoriteClick();
    }
  };

  return (
    <section>
      {load ? (<Load />) : (
        <div>
          <form>
            <h1>{trackName}</h1>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="checkbox">
              Favorita
              <input
                type="checkbox"
                name={ trackName }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ handleFavoriteClick }
                checked={ favorite }
                id="checkbox"
              />
            </label>
          </form>
        </div>
      )}
    </section>
  );
};

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  onFavoriteClick: PropTypes.func,
}.isRequired;

export default MusicCard;
