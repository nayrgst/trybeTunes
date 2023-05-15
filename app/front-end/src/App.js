import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import ProfileEdit from './components/ProfileEdit';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <section>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
