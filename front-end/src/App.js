import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavDrawer from './Containers/NavDrawer';
import WelcomeContainer from './Containers/WelcomeContainer';

export default class App extends React.Component {

  render(){
    //NEED TO REWRITE ROUTES HERE.

    return (
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
          
            <Route path="/" component={NavDrawer} />

      </Switch>
      </BrowserRouter>
    )
  }
}
