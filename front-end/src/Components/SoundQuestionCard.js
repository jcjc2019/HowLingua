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
// import io from "socket.io-client";


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
//const expressUrl = "http://localhost:3001"

class SoundQuestionCard extends React.Component {

    // constructor(){
    //     super()
    //     SocketHandler.connect(localStorage.getItem("token"));
    // }
    
    state  = {
        recording: false,
        transcript: "",
        showResult: false,
        points: 0,
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            points: localStorage.getItem('points')
        })
        let text = this.props.vocabulary.character;
        let language = localStorage.getItem("foreignLanguage")
        
        // SocketHandler.on('tts.finished', data => {
        //     console.log("Your file is ready")
        //     // let audio = new Audio(`${data.url}`)
        //     let audio = new Audio(`http://localhost:3001/public/${text}_output.wav`)
        //     audio.play()
        // }) 
        SocketHandler.emit('text.toSpeech', { text: this.props.vocabulary.character, language: language })

    }

    componentDidUpdate() {
        let text = this.props.vocabulary.character;
        let language = localStorage.getItem("foreignLanguage")

        SocketHandler.emit('text.toSpeech', { text: this.props.vocabulary.character, language: language })
        
    }

    getAudio(){
        let text = this.props.vocabulary.character;
        let language = localStorage.getItem("foreignLanguage")

        SocketHandler.emit('text.toSpeech', { text: this.props.vocabulary.character, language: language })

        SocketHandler.on('tts.finished', data => {
            console.log("Your file is ready")
            // let audio = new Audio(`${data.url}`)
            let audio = new Audio(`http://localhost:3001/public/${text}_output.wav`)
            audio.play()
        })
    }

    playTTS = ()=> {
        SocketHandler.emit('text.toSpeech', { text: this.props.vocabulary.character })
        let text = this.props.vocabulary.character;
        let audio = new Audio(`http://localhost:3001/public/${text}_output.wav`)
        audio.play()

    }

    startRecording = (event)=> {

        //SPEECH TO TEXT CODE
        recognition.continuous = true;
        recognition.interimResults = true;
        // recognition.maxAlternatives = 1;

        //change the language code here for other languages
        if (localStorage.getItem('foreignLanguage') === "Mandarin"){
            recognition.lang = 'cmn-Hans-CN'
        }else if(localStorage.getItem('foreignLanguage') === "Japanese"){
            recognition.lang = "ja-JP"
        }
        
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
        this.setState({ ...this.state, recording: true })
    }

    stopRecording =()=> {
        recognition.stop();
        this.setState({ 
            ...this.state, 
            recording: false 
        })
        let speaker = new window.SpeechSynthesisUtterance();
        if (localStorage.getItem("foreignLanguage") === "Mandarin"){
            speaker.lang = 'zh-CN';
            speaker.text = `You said ${this.state.transcript}`;
            speechSynthesis.speak(speaker);
        }else if (localStorage.getItem("foreignLanguage") === "Japanese"){
            speaker.lang = "ja-JP";
            speaker.text = `You said ${this.state.transcript}`;
            speechSynthesis.speak(speaker);            
        }

    }

    renderResult =() => {
        //only render result card after user's recording
        if(this.state.transcript !== ""){
            this.setState({ ...this.state, showResult: !this.state.showResult })
            //add points
            if (this.state.transcript === this.props.vocabulary.character) {
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

    render() {

        //map characters to all elements below return
        const { classes } = this.props
        return (
            <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={8}>
                            <Paper className={classes.paper}>
                            <Typography variant="subtitle1">Word <span>{this.props.counter}</span> of <span>{this.props.total}</span>.</Typography>
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

                                    <Typography variant="h5" color="inherit" id="vocabulary">
                                        {this.props.vocabulary.character}
                                    </Typography>

                                    <Typography variant="h6" color="inherit" id="pinyin">
                                        {this.props.vocabulary.transliteration}
                                    </Typography>

                                    <Typography variant="h6" color="inherit" id="meaning">
                                        {this.props.vocabulary.meaning}
                                    </Typography>

                                <Divider />

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

                                <Divider />
                                <Typography variant="h4">
                                    You said:
                            </Typography>
                
                            <Typography variant="h5" id="transcript">
                                ...
                            </Typography>
                               
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
                                    (this.state.transcript === this.props.vocabulary.character) ?
                                            <div>
                                                <Typography variant="h5">
                                                    Congratulations! Your pronunciation is perfect. Computer can understand your {localStorage.getItem('foreignLanguage')}!
                                                    <p></p>
                                                        <Button size="large" color="primary" variant="contained" onClick={this.props.renderNext}>
                                                            Next
                                                        </Button>
                                                 
                                                </Typography>
                                                <p></p>
                                            <Typography variant="h5">Your current score is: {localStorage.getItem('points')}</Typography>
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
