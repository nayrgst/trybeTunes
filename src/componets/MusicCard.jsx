import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Load from './Load';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      favorite: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const songs = await getFavoriteSongs();
    const isFavorite = songs.some((song) => song.trackId === trackId);
    this.setState({
      favorite: isFavorite,
    });
  }

  addFavoriteSong = async () => {
    const { trackId } = this.props;
    this.setState({
      load: true,
      favorite: true,
    });
    const musics = await getMusics(trackId);
    await addSong(musics[0]);
    this.setState({ load: false });
  }

  removeFavoriteSong = async () => {
    const { trackId } = this.props;
    this.setState({
      load: true,
      favorite: false,
    });
    await removeSong(trackId);
    this.setState({ load: false });
  }

  handleFavoriteClick = () => {
    const { favorite } = this.state;
    if (favorite) {
      this.removeFavoriteSong();
    } else {
      this.addFavoriteSong();
    }
  }

  render() {
    const { load, favorite } = this.state;
    const { previewUrl, trackName, trackId } = this.props;

    if (load === true) {
      return (
        <Load />
      );
    }
    return (
      <div>
        <form>
          <h1>{trackName}</h1>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor="checkbox"
          >
            Favorita
            <input
              type="checkbox"
              name={ trackName }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleFavoriteClick }
              checked={ favorite }
              id="checkbox"
            />

          </label>
        </form>
      </div>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
