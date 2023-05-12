/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Load from './Load';

class MusicCard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      load: false,
      favorite: false,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const { trackId } = this.props;
    const songs = await getFavoriteSongs();
    const isFavorite = songs.some((song) => song.trackId === trackId);
    if (this._isMounted) {
      this.setState({
        favorite: isFavorite,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addFavoriteSong = async () => {
    const { trackId } = this.props;
    this.setState({
      load: true,
      favorite: true,
    });
    const musics = await getMusics(trackId);
    await addSong(musics[0]);
    if (this._isMounted) {
      this.setState({ load: false });
    }
  }

  removeFavoriteSong = async () => {
    const { trackId } = this.props;
    this.setState({
      load: true,
      favorite: false,
    });
    await removeSong(trackId);
    if (this._isMounted) {
      this.setState({ load: false });
    }
  }

  handleFavoriteClick = () => {
    const { favorite } = this.state;
    const { onFavoriteClick } = this.props;

    if (favorite) {
      this.removeFavoriteSong();
    } else {
      this.addFavoriteSong();
    }

    if (onFavoriteClick) {
      onFavoriteClick();
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
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
