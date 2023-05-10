import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Load from './Load';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      usuario: '',
    };
  }

  componentDidMount() {
    this.setState({ load: true }, async () => {
      const user = await getUser();
      this.setState({ load: false, usuario: user.name });
    });
  }

  render() {
    const { load, usuario } = this.state;
    if (load === true) {
      return (
        <Load />
      );
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ usuario }</p>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
