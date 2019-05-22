import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavDrawer from './Containers/NavDrawer';
import WelcomeContainer from './Containers/WelcomeContainer';
import LoginContainer from './Containers/LoginContainer';
import SignupContainer from './Containers/SignupContainer';
export default class App extends React.Component {

  render(){


    return (
    <div>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" render={() =>
              (localStorage.length !== 0 &&
                localStorage.getItem('nativeLanguage') !== "" &&
                localStorage.getItem('topic') !== "" &&
                localStorage.getItem('targetLanguage') !== "") || (localStorage.getItem("userid") !== null)  ?
                <NavDrawer /> : <WelcomeContainer /> } />
            
            <Route exact path="/main" render={() => 
              (localStorage.length !== 0 && 
              localStorage.getItem('nativeLanguage') !== "" &&
              localStorage.getItem('topic') !== "" && 
              localStorage.getItem('targetLanguage') !== "") || (localStorage.getItem("userid") !== null) ? 
              <NavDrawer /> : <WelcomeContainer /> } />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/signup" component={SignupContainer} />
        </Switch>
      </BrowserRouter>
    </div>
    )
  }
}
