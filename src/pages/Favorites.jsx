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

  async componentDidMount() {
    this.setState({ load: true });
    const songs = await getFavoriteSongs();
    this.setState({
      favorite: songs,
      load: false,
    });
  }

  async removeFavoriteSong(trackId) {
    this.setState({ load: true });
    const { favorite } = this.state;
    const update = favorite.filter((song) => song.trackId !== trackId);
    this.setState({
      favorite: update,
      load: false,
    });
  }

  render() {
    const { favorite, load } = this.state;
    if (load === true) {
      return (<Load />);
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        {load ? <Load /> : (
          favorite.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              onFavoriteClick={ () => this.removeFavoriteSong(music.trackId) }
              isFavorite
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
