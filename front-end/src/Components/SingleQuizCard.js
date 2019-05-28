
//here: render each questions render QuestionCard or SoundQuestion by using slider

//backend: question, answer, options string separated by ;, type
//quiz1 type: vocabulary, connected to topic1
//quiz2 type: culture, connected to topic1

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SocketHandler from "../SocketHandler";
import Slide from '@material-ui/core/Slide';
import SoundQuestionCard from "./SoundQuestionCard";
import MultipleChoiceQuestionCard from './MultipleChoiceQuestionCard';
import CultureQuestionCard from "./CultureQuestionCard";

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
        culture_questions: [],
        vocabulary: []
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <MultipleChoiceQuestionCard questions={this.state.choice_questions} /> 
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <SoundQuestionCard questions={this.state.sound_questions} vocabulary={this.state.vocabulary}/> 
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