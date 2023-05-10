import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Load from './Load';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      favorite: false,
    };
  }

  favoriteSong = async ({ target }) => {
    const { checked } = target;
    const { trackId } = this.props;
    this.setState({
      load: true,
      favorite: checked,
    });
    const musics = await getMusics(trackId);
    await addSong(musics[0]);
    // console.log(favorite);
    this.setState({
      load: false,
    });
  }

  render() {
    const { load, favorite } = this.state;
    if (load === true) {
      return (
        <Load />
      );
    }
    const { previewUrl, trackName, trackId } = this.props;
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
              onChange={ this.favoriteSong }
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
