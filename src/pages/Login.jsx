import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Load from '../componets/Load';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      saved: false,
      load: false,
      disabled: true,
    };
  }

  disableButton = () => {
    const valorMinimo = 3;
    const { name } = this.state;
    this.setState({ disabled: (name.length < valorMinimo) });
  }

  onInputChangeName = ({ target }) => {
    const { value } = target;
    this.setState({ name: value }, () => this.disableButton());
  }

  onInputChangeEmail = ({ target }) => {
    const { value } = target;
    this.setState({ email: value }, () => this.disableButton());
  }

   login = async () => {
     const { name, email } = this.state;

     this.setState({ load: true },
       async () => {
         await createUser({ name, email });
         this.setState({
           load: false,
           saved: true,
         });
       });
   }

   render() {
     const { name, email, saved, load, disabled } = this.state;
     return (
       <main>
         <p>Login</p>
         { load ? <Load /> : (
           <div data-testid="page-login">
             <input
               type="text"
               data-testid="login-name-input"
               value={ name }
               onChange={ this.onInputChangeName }
             />
             <input
               type="text"
               value={ email }
               onChange={ this.onInputChangeEmail }
             />
             <button
               type="submit"
               data-testid="login-submit-button"
               onClick={ this.login }
               disabled={ disabled }
             >
               Entrar

             </button>
           </div>
         ) }

         { saved ? <Redirect to="/search" /> : '' }

       </main>

     );
   }
}

export default Login;
