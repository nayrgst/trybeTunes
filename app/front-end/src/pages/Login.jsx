import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Load from '../components/Load';
import { createUser } from '../services/userAPI';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const disableButton = () => {
    const valorMinimo = 3;
    setDisabled(name.length < valorMinimo);
  };

  const onInputChangeName = (event) => {
    const { value } = event.target;
    setName(value);
    disableButton();
  };

  const onInputChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    disableButton();
  };

  const login = async () => {
    setLoad(true);
    try {
      await createUser({ name, email });
      setSaved(true);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <main>
      <p>Login</p>
      {load ? (
        <Load />
      ) : (
        <div data-testid="page-login">
          <input
            type="text"
            data-testid="login-name-input"
            value={ name }
            onChange={ onInputChangeName }
          />
          <input
            type="text"
            value={ email }
            onChange={ onInputChangeEmail }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ login }
            disabled={ disabled }
          >
            Entrar
          </button>
        </div>
      )}
      {saved && <Redirect to="/search" />}
    </main>
  );
};

export default Login;
