import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Load from '../components/Load';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

const Search = () => {
  const [disabled, setDisabled] = useState(true);
  const [artist, setArtist] = useState('');
  const [load, setLoad] = useState(false);
  const [albums, setAlbums] = useState([]);

  const renderAlbums = async () => {
    setLoad(true);
    const data = await searchAlbumsAPIs(artist);
    setAlbums(data);
    setLoad(false);
  };

  const disableButton = () => {
    if (artist.length >= 2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onInputChange = ({ target }) => {
    const { value } = target;
    setArtist(value);
    disableButton();
  };

  return (
    <section>
      <Header />
      {load ? (<Load />) : (

        <div data-testid="page-search">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Nome do artista ou banda"
              onChange={ onInputChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ renderAlbums }
              disabled={ disabled }
            >
              Procurar
            </button>
          </form>
          <div>
            <h1>{`Resultado de álbuns de: ${artist}`}</h1>
            {albums.length === 0 ? (
              <span>Nenhum álbum foi encontrado</span>
            ) : (
              albums.map((item) => (
                <div key={ item.collectionId }>
                  <h3>{item.collectionName}</h3>
                  <p>{item.artistName}</p>
                  <img src={ item.artworkUrl100 } alt={ item.artistName } />
                  <Link
                    to={ `/album/${item.collectionId}` }
                    data-testid={ `link-to-album-${item.collectionId}` }
                  >
                    Track list
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Search;
