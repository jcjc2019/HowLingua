import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LanguageContainer from "./LanguageContainer";
import LoginContainer from '../Containers/LoginContainer';
import SignupContainer from '../Containers/SignupContainer';
import SingleLanguageCard from '../Components/SingleLanguageCard';
import TopicContainer from '../Containers/TopicContainer';
import QuizContainer from '../Containers/QuizContainer';
import SingleQuizCard from '../Components/SingleQuizCard';
export default class MainContainer extends React.Component {

    render() {

        return (
            <React.Fragment>
                <Route exact path="/languages" component={LanguageContainer} ></Route>
                <Route exact path="/languages/:id" component={SingleLanguageCard}></Route>

                <Route exact path="/topics" component={TopicContainer} ></Route>
                <Route exact path="/quizzes" component={QuizContainer} ></Route>
                <Route exact path="/quizzes/:id" component={SingleQuizCard}></Route>

                <Route exact path="/login" component={LoginContainer}></Route>
                <Route exact path="/signup" component={SignupContainer}></Route>
            </React.Fragment>
        )
    }
}


