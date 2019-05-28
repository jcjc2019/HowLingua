import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MicIcon from 'react-ionicons/lib/MdMic';
import MicOffIcon from 'react-ionicons/lib/MdMicOff';
import Hearing from "@material-ui/icons/Hearing";
import SocketHandler from "../SocketHandler";
import Slide from '@material-ui/core/Slide';


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

class SoundQuestionCard extends React.Component {

    constructor(){
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }
    
    state  = {
        //pass vocabulary as props to state, to be added.
        vocabulary: "你好", // practice question asssign this to this.props.vocabulary
        recording: false,
        transcript: "",
        showResult: false,
        points: 0
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            points: localStorage.getItem('points')
        })
        //put all socket events inside componentdidmount
        let text = document.querySelector("#vocabulary").innerText;
        let pinyin = document.querySelector("#pinyin").innerText;
        SocketHandler.emit('text.toSpeech', { text: text });
    }

    playTTS = ()=> {
        let text = document.querySelector("#vocabulary").innerText;
        let audio = new Audio(`http://localhost:3001/public/${text}_output.wav`)
        audio.play()
    }

    startRecording = (event)=> {

        this.setState({ ...this.state, recording: true })
        //SPEECH TO TEXT CODE
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        //change the language code here for other languages
        recognition.lang = 'cmn-Hans-CN'

        recognition.onresult =  (event) => {
            let interim_transcript = '';
            let final_transcript = "";
            if (typeof (event.results) == 'undefined') {
                recognition.onend = null;
                recognition.stop();
                window.upgrade();
                return;
            }
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    //append transcript result to document body
                    //react, save transcript to state, and grab the state
                    final_transcript += event.results[i][0].transcript
                    document.querySelector('#transcript').innerText = final_transcript
                    this.setState({...this.state, transcript: final_transcript})
                }else{
                    interim_transcript += event.results[i][0].transcript;
                    document.querySelector('#transcript').innerText = interim_transcript
                    this.setState({ ...this.state, transcript: interim_transcript })
                }
            }
            // recognition.stop()
        }
        recognition.start();
        
    }

    stopRecording =()=> {
        recognition.stop();
        this.setState({ ...this.state, recording: false })
        let speaker = new window.SpeechSynthesisUtterance();
        speaker.lang = 'zh-CN';
        speaker.text = `Your recording was recognized as ${this.state.transcript}` ;
        speechSynthesis.speak(speaker);
    }

    renderResult =() => {
        //only render result card after user's recording
        if(this.state.transcript !== ""){
            this.setState({ ...this.state, showResult: true })
            //add points
            if (this.state.transcript === this.state.vocabulary) {
                let score = parseInt(localStorage.getItem("points"))
                score = score + 100
                localStorage.setItem("points", score)
            } else {
                let score = parseInt(localStorage.getItem("points"))
                score = score - 100
                localStorage.setItem("points", score)
            }
        }
    }

    renderNext = ()=> {
        this.setState({...this.state, points: localStorage.getItem('points')})
        console.log("render next question card")
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4" color="primary">
                                Click
                                 <IconButton
                                    color="secondary"
                                    onClick={this.playTTS}
                                >
                                    <Hearing />
                                </IconButton>
                                to listen
                            </Typography>
                            <p>
                            <Typography variant ="h5" color="inherit" id="vocabulary">
                                {this.state.vocabulary}
                            </Typography>
                            <Typography variant="h5" color="inherit" id="punctuation">
                                ？
                            </Typography>                            
                            <Typography variant="h5" color="inherit" id="pinyin">
                               pinyin here
                            </Typography>
                            </p>
                            <Divider />
                            <p>

                            {
                            (this.state.recording === true) ? 
                            (<Typography variant="h4" color="secondary">
                                    Click
                                <IconButton
                                    color="secondary"
                                    onClick={this.stopRecording}
                                >
                                    <MicOffIcon color="red" shake={false} />
                                </IconButton>
                                to listen to your pronunciation.
                            </Typography>)
                            :
                            (<Typography variant="h4" color="primary">
                                Click
                                 <IconButton
                                   onClick={this.startRecording}
                                    >
                                    <MicIcon color="green" shake={true} />
                                  </IconButton>
                                    to repeat the word.
                            </Typography>)
                            }
                            </p>
                            <Divider />
                            <Typography variant="h4">
                            You said: 
                            </Typography>
                            <p>
                            <Typography variant="h5" id="transcript">
                            ...
                            </Typography>
                            </p>
                            <p></p>
                            <Typography>
                                <Button size="large" color="primary" variant="contained" onClick={this.renderResult}>
                                    Show Result
                                </Button>
                            </Typography>
                        </Paper>
                    </Grid>

                    <Slide direction="up" in={this.state.showResult} mountOnEnter unmountOnExit>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>  
                            {
                                (this.state.transcript === this.state.vocabulary) ?
                                <div>
                                <Typography variant="h5">
                                Congratulations! Your pronunciation is perfect. Computer can understand your {localStorage.getItem('foreignLanguage')}! 
                                <p>
                                <Button size="large" color="primary" variant="contained" onClick={this.renderNext}>
                                Next
                                </Button>
                                </p>
                                </Typography>
                                <Typography variant="title">Your current score is: {this.state.points}</Typography>
                                </div>
                                :
                                <Typography variant="h5">Please Listen and repeat again to practice.</Typography>
                            }
                        </Paper>
                    </Grid>
                    </Slide>
                </Grid>
            </div>
        )
    }

}

SoundQuestionCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoundQuestionCard);