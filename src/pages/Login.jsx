import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Load from '../componets/Load';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      saved: false,
      load: false,
      disabled: true,
    };
  }

  disableButton = () => {
    const valorMinimo = 3;
    const { user } = this.state;
    this.setState({ disabled: (user.length < valorMinimo) });
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ user: value }, () => this.disableButton());
  }

   login = async () => {
     const { user } = this.state;

     this.setState({ load: true },
       async () => {
         await createUser({ name: user });
         this.setState({
           load: false,
           saved: true,
         });
       });
   }

   render() {
     const { user, saved, load, disabled } = this.state;
     return (
       <main>
         <p>Login</p>
         { load ? <Load /> : (
           <div data-testid="page-login">
             <input
               type="text"
               data-testid="login-name-input"
               value={ user }
               onChange={ this.onInputChange }
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
