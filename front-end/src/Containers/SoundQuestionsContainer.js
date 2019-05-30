import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SocketHandler from "../SocketHandler";
import SoundQuestionCard from "../Components/SoundQuestionCard";
import QuizResult from "./QuizResult";
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

const recognition = new window.webkitSpeechRecognition();

//change this after deployment
const expressUrl = "http://localhost:3001"

class SoundQuestionContainer extends React.Component {

    constructor() {
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }

    state = {
        //vocabulary is the word given for each card
        //set vocabulary as the i element in the array of props
        vocabularyArray: [],
        points: 0,
        //remember card
        vocabulary: "",
        counter: 1,  
        wordId: 1,
        total: 0,
    }

    componentDidMount() {
        if(localStorage.getItem('userid') === null){
            fetch(`${expressUrl}/vocabularyForUnSignedIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    //user is not logged in, only know topic category from welcome screen
                    //cannot get topicId from localStorage
                    currentLanguage: localStorage.getItem("foreignLanguage"),
                    currentTopic: localStorage.getItem("topic"),
                })
            })
                .then(res => res.json())
                .then(vocabularyArray =>
                    this.setState({
                        ...this.state,
                        vocabularyArray: vocabularyArray,
                        //set starting point for vocabulary on each card
                        vocabulary: vocabularyArray[0],
                        total: vocabularyArray.length,
                        points: localStorage.getItem('points')
                    })
                )
        }else{
            //find voc for this topic for this quizzes
            SocketHandler.emit("FindVocabularyForThisTopic", {
                language: localStorage.getItem('foreignLanguage'),
                topicId: localStorage.getItem('topicId')
            })
            SocketHandler.on("VocabularyFound", vocabularyArray =>
                this.setState({
                    ...this.state,
                    vocabularyArray: vocabularyArray,
                    //set starting point for vocabulary on each card
                    vocabulary: vocabularyArray[0],
                    total: vocabularyArray.length,
                    points: localStorage.getItem('points')
                }))
        }

    }

    renderNext = () => {
        const counter = this.state.counter + 1;
        const wordId = this.state.wordId + 1
        this.setState({
            ...this.state,
            counter: counter,
            wordId: wordId,
            points: localStorage.getItem('points'),
            vocabulary: this.state.vocabularyArray[wordId - 1]
        })
        console.log("render next question card")

    }

    renderQuiz=()=> {
        return (
            <SoundQuestionCard
                vocabulary={this.state.vocabulary}
                key={this.state.wordId}
                renderNext={this.renderNext}
                counter={this.state.counter}
                total={this.state.total}
            />
        )

    }

    renderResult=()=> {
        return(
            <QuizResult points={this.state.points} />
        )
    }

    render() {
        console.log(this.props.sound_questions)
        console.log(this.state)

        //pass vocabulary to all elements below return
        const { classes } = this.props
        if (this.state.wordId >= this.state.vocabularyArray.length + 1){
            return (
                <QuizResult points={this.state.points} />
            )
            }else{
                return (
                    <SoundQuestionCard
                        vocabulary={this.state.vocabulary}
                        key={this.state.wordId}
                        renderNext={this.renderNext}
                        counter={this.state.counter}
                        total={this.state.total}
                    />
                )
            }
    
    }
}

SoundQuestionContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoundQuestionContainer);
