
//here: render each questions render QuestionCard or SoundQuestion by using slider

//backend: question, answer, options string separated by ;, type
//quiz1 type: vocabulary, connected to topic1
//quiz2 type: culture, connected to topic1

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SocketHandler from "../SocketHandler";
import MultipleChoiceQuestionContainer from './MultipleChoiceQuestionsContainer';
import SoundQuestionContainer from './SoundQuestionsContainer';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


//add fetch to get current user and to post points to users database

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'auto',
        color: theme.palette.text.secondary,
        height: "100%"
    },
});

//change this after deployment
const expressUrl = "http://localhost:3001"

class Quiz extends React.Component {

    constructor() {
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }

    state = {
        //pass vocabulary as props to state, to be added.
        points: localStorage.getItem('points'),
        questions: [],
        choice_questions: [],
        sound_questions: [],
        // culture_questions: [],
        vocabulary: [],
        //for tab view change
        value: 0
    }

    // handleChange = (event, value) => {
    //     this.setState({ value });
    // };

    // handleChangeIndex = index => {
    //     this.setState({ value: index });
    // };

    componentDidMount(){
        if(localStorage.getItem('userid')=== null){
            //if not logged in, only make quiz 1 questions available
            //handle inside quiz card
            fetch(`http://localhost:3001/quizzes/1/questions`)
                .then(res => res.json())
                .then(questions => {
                    let sound_questions = questions.filter(question => question.type === "Practice question");
                    let choice_questions = questions.filter(question =>
                        question.type.includes("Choose the correct"));
                    this.setState({ 
                        ...this.state, 
                        questions: questions,
                        sound_questions: sound_questions,
                        choice_questions: choice_questions
                    })
                })
        }else {
            //use socket to get questions for each quiz by quiz id, 
            //need to change data to find 
            let quizId = this.props.match.params.id
            SocketHandler.emit("FindQuestions", {quizId: quizId})
            SocketHandler.on("QuestionsFound",data => {
            this.setState({
                ...this.state,
                questions: data,
                //need to fix this vocabulary. no vocabulary here
                //vocabulary: this.props.location.props.vocabulary,
                sound_questions: data.filter(question => question.type === "Practice question"),
                choice_questions: data.filter(question =>
                    question.type.includes("Choose the correct"))
            })
            })
            //find vocabulary
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
    render() {

        const { classes, theme } = this.props;
        console.log(this.props.match.params.id)

        console.log(this.state.sound_questions)
        console.log(this.state.sound_questions)
        console.log(this.state.choice_questions)
        
        const soundQuestionsLength = this.state.sound_questions.length
            return(
                <div className={classes.root}>

    
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <SoundQuestionContainer sound_questions={this.state.sound_questions} vocabulary={this.state.vocabulary}/> 
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Quiz.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Quiz);