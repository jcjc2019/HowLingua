
import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import SocketHandler from "../SocketHandler";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
//use tab
import SwipeableViews from 'react-swipeable-views';



//change this after deployment
const expressUrl = "http://localhost:3001"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'auto',
        color: theme.palette.text.secondary,
        height: "100%"
    },
    card: {
        minWidth: 275,
        maxWidth: 400
    },
});

class QuizContainer extends React.Component {

    constructor() {
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }

    state = {
        quizzes: [],
        noLogInQuizzes: [],
        vocabulary: []
    }

    componentDidMount(){
        if (localStorage.getItem("userid") === null){
            //if not logged in, fetch quiz 1-2
            fetch(`http://localhost:3001/quizzes`)
                .then(res => res.json())
                .then(quizzes => this.setState({
                    ...this.state,
                    //get first 2 quizzes
                    //click second quiz, render signup form
                    noLogInQuizzes: quizzes.slice(0, 2)
                }))

            //if not logged in,fetch all vocabulary belong to topic 1
            //fetch vocabulary for each topic, use vocabulary to give sound questions
            fetch(`${expressUrl}/vocabularyForUnSignedIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    //user is not logged in, only know topic category from welcome screen
                    currentLanguage: localStorage.getItem("foreignLanguage"),
                    currentTopic: localStorage.getItem("topic"),
                })
            })
                .then(res => res.json())
                .then(vocabularyGroup =>
                    this.setState({
                        ...this.state,
                        vocabulary: vocabularyGroup
                    })
                )
        
        }else {
            //if logged in, use socket to find quizzes
            //have to click topic to get to quiz, so to pass topic props, available only to signed in users 
            SocketHandler.emit("FindQuizzes", { language: localStorage.getItem('foreignLanguage'), topicId: localStorage.getItem('topicId') })
            //if logged in, use socket to get quizzes data and vocabulary
            SocketHandler.on("QuizzesFound", data => this.setState({
                ...this.state,
                quizzes: data,
            }))
            //find voc for this topic for this quizzes
            SocketHandler.emit("FindVocabularyForThisTopic", { 
                language: localStorage.getItem('foreignLanguage'), 
                topicId: localStorage.getItem('topicId') 
            })
            SocketHandler.on("VocabularyFound", data => 
            this.setState({
                ...this.state,
                vocabulary: data
            }))
        }
    }


    handleUnloggedInClick=(id) => {
        if (localStorage.getItem('foreignLanguage') !== "Mandarin" && localStorage.getItem('foreignLanguage') !== "Japanese") {
            this.props.history.push("login")
        } else {
            if (id !== 2) {
                this.props.history.push({
                    pathname: `/quizzes/${id}`
                })
            }
        }
    }

    handleLoggedInClick=(id) => {
        if (localStorage.getItem("userid") !== null) {
            this.props.history.push({
                pathname: `/quizzes/${id}`
            })
        }        
    }

    render(){
        const { classes } = this.props;

        console.log(this.state)
        return(
            <div className={classes.root}>            
            <Grid container spacing={24}>
            
            {localStorage.getItem("userid") === null ? 
            
            this.state.noLogInQuizzes.map((quiz, id) => 
                <Grid item xs={6} key={id}>
                    <Paper className ={classes.paper}>
                        <Button variant="contained" size="large" onClick={(id) => this.handleUnloggedInClick(quiz.id)}>
                        Start {quiz.type} Quiz
                    </Button>
                    </Paper>
                </Grid>
            )

            :
            this.state.quizzes.map(quiz =>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Button variant="contained" size="large" onClick={(id) => this.handleLoggedInClick(quiz.id)}>
                            Start {quiz.type} Quiz
                    </Button>
                    </Paper>
                </Grid>
            )}
            
            </Grid>
            </div>
        )
    }
}



QuizContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(QuizContainer));
