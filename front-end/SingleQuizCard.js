
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SocketHandler from "../SocketHandler";
import MultipleChoiceQuestionContainer from '../Containers/MultipleChoiceQuestionsContainer';
import SoundQuestionContainer from '../Containers/SoundQuestionsContainer';

//add fetch to get current user and to post points to users database

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
        vocabulary: []
    }

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
            //use socket to get questions for each quiz, first get the topic
            let quizId = this.props.match.params.id
            SocketHandler.emit("FindQuestions", {
                quizId: quizId
            })
            SocketHandler.on("QuestionsFound",data => this.setState({
                ...this.state,
                questions: data,
                sound_questions: data.filter(question => question.type === "Practice question"),
                choice_questions: data.filter(question =>
                    question.type.includes("Choose the correct"))
            }))

        }
    }
    render() {
        const { classes } = this.props;
        console.log(this.props.location.props)
        console.log(this.state.sound_questions)
        console.log(this.state.choice_questions)
        
        const soundQuestionsLength = this.state.sound_questions.length
            return(
                <div className={classes.root}>
                { 
                 soundQuestionsLength !== 0
                    ?
                (<div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <SoundQuestionContainer sound_questions={this.state.sound_questions} vocabulary={this.state.vocabulary}/> 
                    </Grid>
                </Grid>
                </div>)
                :
                (
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <MultipleChoiceQuestionContainer choice_questions={this.state.choice_questions} />
                    </Grid>
                </Grid>
               )}
            </div>
        )
    }
}

Quiz.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Quiz);