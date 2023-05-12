import React, { Component } from 'react';
import Header from '../componets/Header';
import Load from '../componets/Load';
import MusicCard from '../componets/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorite: [],
      load: false,
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  favoriteSongs() {
    this.setState({ load: true }, () => {
      getFavoriteSongs().then((favorites) => {
        this.setState({ favorite: favorites, load: false });
      });
    });
  }

  render() {
    const { favorite, load } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {load ? <Load /> : (
          favorite.map((item) => (
            <MusicCard
              key={ item.trackId }
              trackName={ item.trackName }
              previewUrl={ item.previewUrl }
              trackId={ item.trackId }
              getFavorite={ () => this.favoriteSongs() }
              isFavorite
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
