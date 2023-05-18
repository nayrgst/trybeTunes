import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Load from '../components/Load';
import { createUser } from '../services/userAPI';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onInputChangeEmail = ({ target }) => {
    const { value } = target;
    setEmail(value.toLowerCase());
  };

  const onInputChangePasswd = ({ target }) => {
    const { value } = target;
    setPassword(value.toLowerCase());
  };

  const login = async () => {
    setLoad(true);
    try {
      await createUser({ email });
      setSaved(true);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    const validEmail = /\S+@\S+\.com/;
    const validPasswd = 6;

    if (validEmail.test(email) && password.length >= validPasswd) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password]);

  return (
    <main>
      <p>Login</p>
      {load ? (
        <Load />
      ) : (
        <div data-testid="page-login">
          <input
            type="text"
            value={ email }
            onChange={ onInputChangeEmail }
          />

          <input
            type="password"
            value={ password }
            onChange={ onInputChangePasswd }
          />

          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ login }
            disabled={ !disabled }
          >
            Entrar
          </button>
        </div>
      )}
      {saved && navigate('/search')}
    </main>
  );
};

export default Login;
