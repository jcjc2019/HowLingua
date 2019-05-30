import React from 'react';
import { Route, Redirect } from "react-router-dom";
import LanguageContainer from "./LanguageContainer";
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';
import SingleLanguageCard from '../Components/SingleLanguageCard';
import TopicContainer from '../Containers/TopicContainer';
import QuizContainer from './QuizContainer';
import SingleQuizContainer from './SingleQuizContainer';
import Settings from '../Components/Settings';
import QuizResult from './QuizResult';
import LeaderBoard from '../Components/LeaderBoard';
import About from '../Containers/About';
export default class MainContainer extends React.Component {

    render() {

        return (
            <React.Fragment>
                <Route exact path="/languages" component={LanguageContainer} ></Route>
                <Route exact path="/languages/:id" component={SingleLanguageCard}></Route>

                <Route exact path="/topics" component={TopicContainer} ></Route>
                <Route exact path="/quizzes" component={QuizContainer} ></Route>            
                <Route exact path="/quizzes/:id" component={SingleQuizContainer}></Route>
                <Route exact path="/result" component={QuizResult}></Route>
                <Route exact path="/login" component={LoginContainer}></Route>
                <Route exact path="/signup" component={SignupContainer}></Route>
                <Route exact path="/settings" component={Settings}></Route>
                <Route exact path="/leaderboard" component={LeaderBoard}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/" render={ () => <Redirect to="/about" />} />
            </React.Fragment>
        )
    }
}


