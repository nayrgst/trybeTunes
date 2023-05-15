import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

function Profile() {
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const data = await getUser();
      setUser(data);
      setLoad(false);
    };
    loadUser();
  }, []);

  return (
    <div>
      <Header />
      {load ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div>
            <img
              src={ user.image }
              alt={ `imagem do perfil do(a) ${user.name}` }
              data-testid="profile-image"
            />
          </div>

          <div>
            <h3>Nome</h3>
            <span>{user.name}</span>
          </div>

          <div>
            <h3>E-mail</h3>
            <span>{user.email}</span>
          </div>

          <div>
            <h3>Descrição</h3>
            <p>
              {user.description}
            </p>
          </div>

          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
