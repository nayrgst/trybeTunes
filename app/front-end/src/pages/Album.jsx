import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Load from '../components/Load';
import MusicCard from '../components/MusicCard';
import FavoriteSongsProvider from '../contexts/FavoriteSongsContext';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

function Album({ match }) {
  const [load, setLoad] = useState(false);
  const [music, setMusic] = useState([]);
  const [album, setAlbum] = useState([]);
  const { favoriteSongs } = useContext(FavoriteSongsProvider);

  const renderFavSongs = async () => {
    setLoad(true);
    await getFavoriteSongs();
    setLoad(false);
  };

  useEffect(() => {
    renderFavSongs();
  }, []);

  const renderMusics = async () => {
    setLoad(true);
    const { params: { id } } = match;
    const data = await getMusics(id);
    const tracks = data.filter((item) => item.trackId);
    setLoad(false);
    setMusic(tracks);
    setAlbum(data[0]);
  };

  useEffect(() => {
    renderMusics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Header />
      {load ? <Load /> : (
        <div data-testid="page-album">
          <section>
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
            <p data-testid="artist-name">{album.artistName}</p>
            <p data-testid="album-name">{album.collectionName}</p>
          </section>

          <div>
            {music.map((item) => (
              <MusicCard
                key={ item.trackId }
                trackName={ item.trackName }
                previewUrl={ item.previewUrl }
                trackId={ item.trackId }
                songs={ favoriteSongs }
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
