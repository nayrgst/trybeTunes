import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Load from './Load';

function ProfileEdit() {
  const [load, setLoad] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    image: '',
  });
  const history = useHistory();

  const validate = () => {
    const {
      name, email, image, description,
    } = user;
    const validEmail = email.match(/\S+@\S+\.\S+/g);
    if (name === '' || !validEmail || image === '' || description === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const data = await getUser();
      setUser(data);
      setLoad(false);
    };
    loadUser();
  }, []);

  useEffect(() => {
    validate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onInputChange = ({ target }) => {
    setUser((prevUser) => ({
      ...prevUser,
      [target.name]: target.value,
    }));
  };

  const submitBtn = async (event) => {
    const { name, email, description, image } = user;
    event.preventDefault();
    setLoad(true);
    await updateUser({ name, email, description, image });
    history.push('/profile');
    setLoad(false);
  };

  const { name, email, image, description } = user;

  return (
    load ? <Load /> : (
      <form>
        <div>
          <img
            src={ image }
            alt=""
          />
        </div>

        <label htmlFor="profile-name">
          Nome
          <input
            id="profile-name"
            onChange={ onInputChange }
            type="text"
            name="name"
            value={ name }
            data-testid="edit-input-name"
          />
        </label>

        <label htmlFor="profile-email">
          E-mail
          <input
            id="profile-email"
            onChange={ onInputChange }
            type="text"
            name="email"
            value={ email }
            data-testid="edit-input-email"
          />
        </label>

        <label htmlFor="profile-descritpion">
          Descrição
          <textarea
            id="profile-descritpion"
            onChange={ onInputChange }
            name="description"
            value={ description }
            data-testid="edit-input-description"
          />
        </label>

        <label htmlFor="profile-image">
          Imagem
          <input
            id="profile-image"
            onChange={ onInputChange }
            type="text"
            name="image"
            value={ image }
            data-testid="edit-input-image"
          />
        </label>

        <button
          type="button"
          disabled={ disabled }
          onClick={ submitBtn }
          data-testid="edit-button-save"
        >
          Salvar
        </button>
      </form>
    )
  );
}

export default ProfileEdit;
