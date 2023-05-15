import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import Load from '../componets/Load';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      artist: '',
      load: false,
      albuns: [],
    };
  }

   renderAlbuns = () => {
     this.setState({ load: true }, async () => {
       const { artist } = this.state;
       const data = await searchAlbumsAPIs(artist);
       this.setState({
         load: false,
         albuns: data,
       });
     });
   }

  disableButton = () => {
    const { artist } = this.state;
    if (artist.length >= 2) {
      this.setState({ disabled: false });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ artist: value }, () => this.disableButton());
  }

  render() {
    const { disabled, load, albuns, artist } = this.state;
    if (load === true) {
      return (
        <Load />
      );
    }
    return (
      <div data-testid="page-search">
        <form>
          <Header />
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do artista ou banda"
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.renderAlbuns }
            disabled={ disabled }
          >
            Procurar
          </button>
        </form>
        <div>
          <h1>{`Resultado de álbuns de: ${artist}`}</h1>
          { albuns.length === 0 ? (<span>Nenhum álbum foi encontrado</span>) : (

            albuns.map((item) => (
              <div key={ item.collectionId }>
                <h3>{ item.collectionName }</h3>
                <p>{ item.artistName }</p>
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
    );
  }
}

export default Search;
