import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componets/Header';
import Load from '../componets/Load';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componets/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      music: [],
      album: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.renderMusics();
    this.renderFavSongs();
  }

  renderFavSongs = async () => {
    this.setState({
      load: true,
    });
    const songsFav = await getFavoriteSongs();
    this.setState({
      load: false,
      favoriteSongs: songsFav,
    });
  }

  renderMusics = async () => {
    this.setState({ load: true });
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const tracks = data.filter((item) => (
      item.trackId
    ));
    this.setState({
      load: false,
      music: tracks,
      album: data[0],
    });
  }

  render() {
    const { load, music, album, favoriteSongs } = this.state;
    // console.log(favoriteSongs);
    if (load === true) {
      return (
        <Load />
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <img src={ album.artworkUrl100 } alt={ album.artistName } />
          <p data-testid="artist-name">{ album.artistName }</p>
          <p data-testid="album-name">{ album.collectionName }</p>
        </section>

        <div>
          {

            music.map((item) => (
              <MusicCard
                key={ item.trackId }
                trackName={ item.trackName }
                previewUrl={ item.previewUrl }
                trackId={ item.trackId }
                songs={ favoriteSongs }
              />
            ))

          }
        </div>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
