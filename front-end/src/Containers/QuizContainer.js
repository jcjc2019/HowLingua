
//QuizContainer -> show quiz card ->  2 types of questions containers 

import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink, withRouter, Route } from 'react-router-dom';
import SocketHandler from "../SocketHandler";
import Typography from "@material-ui/core/Typography";


//change this after deployment
const expressUrl = "http://localhost:3001"

const styles = theme => ({
    card: {
        minWidth: 275,
        maxWidth: 400
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class QuizContainer extends React.Component {


    state = {
        quizzes: [],
        noLogInQuizzes: []
    }

    componentDidMount(){
        //if not logged in, only give quiz 1, use fetch
        fetch(`expressUrl/quizzes`)
        .then(res => res.json())
        .then(quizzes => this.setState({
            ...this.state,
            //get first 2 quizzes
            noLogInQuizzes: quizzes.slice(1, 3)
        }))

        //if logged in, use socket to find quizzes
        //have to click topic to get to quiz, so that to pass topic props 
        SocketHandler.emit("FindQuizzes", { language: localStorage.getItem('foreignLanguage'), topic: this.props.location.props.topic})
        SocketHandler.on("QuizzesFound", data => this.setState({
            ...this.state,
            quizzes: data
        }))
    }

    constructor() {
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }

    render(){
        return(
            <div>
            {localStorage.getItem("userid") === null ? 
            this.state.noLogInQuizzes.map(quiz => 
                <Typography>
                Type: {quiz.type} quiz
                </Typography>
            )
            :
            this.state.quizzes.map(quiz =>
                <Typography>
                    Type: {quiz.type} quiz
                </Typography>            
            )}
            </div>
        )
    }
}



QuizContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(QuizContainer));
