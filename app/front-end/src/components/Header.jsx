import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from './Load';

const Header = () => {
  const [load, setLoad] = useState(false);
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    setLoad(true);
    getUser()
      .then((user) => {
        setUsuario(user.name);
        setLoad(false);
      })
      .catch((error) => {
        console.log('Error fetching user:', error);
        setLoad(false);
      });
  }, []);

  return (
    <section>
      {load ? (<Load />) : (
        <header data-testid="header-component">
          <p data-testid="header-user-name">{usuario}</p>
          <Link to="/search" data-testid="link-to-search">
            Search
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Profile
          </Link>
        </header>
      )}
    </section>
  );
};

export default Header;
