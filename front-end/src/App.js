import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavDrawer from './Containers/NavDrawer';
import WelcomeContainer from './Containers/WelcomeContainer';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignUpForm';
export default class App extends React.Component {

  render(){


    return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => localStorage.length === 0 ? <WelcomeContainer/> : <NavDrawer />} />
          <Route exact path="/main" render={() => localStorage.length === 0 ? <WelcomeContainer /> : <NavDrawer />} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
        </Switch>
      </BrowserRouter>
    </div>
    )
  }
}
