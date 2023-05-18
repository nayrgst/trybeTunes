import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Load from '../components/Load';
import MusicCard from '../components/MusicCard';
import FavoriteSongsContext from '../contexts/FavoriteSongsContext';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { getMusics } from '../utils/fetchs';

function Album({ match }) {
  const [load, setLoad] = useState(false);
  const [music, setMusic] = useState([]);
  const [album, setAlbum] = useState([]);
  const favoriteSongs = useContext(FavoriteSongsContext);
  const { id } = useParams();

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
    const data = await getMusics(id);
    const tracks = data.filter((item) => item.trackId);
    setLoad(false);
    setMusic(tracks);
    setAlbum(data[0]);
  };

  useEffect(() => {
    if (match && match.params) {
      renderMusics();
      renderFavSongs();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);

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
