import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import SocketHandler from "../SocketHandler";
import LoginForm from '../Components/LoginForm';
import Hearing from "@material-ui/icons/Hearing";


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
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
});


class TopicContainer extends React.Component {

    constructor(){
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }

    state = {
        showDetails: false,
        details: "",
        availableLanguages: [],
        vocabulary: [],
        allClicked: []
    }

    componentDidMount=()=> {
        let id = this.props.topic.id

        if(localStorage.getItem('userid') === null){
            fetch(`http://localhost:3001/topics/${id}/languages`)
                .then(res => res.json())
                .then(languages => {
                    this.setState({
                        ...this.state,
                        availableLanguages: languages.map(language => language.name)
                    })
                })
        }else{
            SocketHandler.emit("userLanguages.index", {id: localStorage.getItem('userid')})
            SocketHandler.on("userLanguages.found", userLanguages => {
                this.setState({
                    ...this.state,
                    availableLanguages: userLanguages.map(language => language.name)
                })
            })
        }

    }

    setLanguage =(name, id) => {
        //change language per user's choice, should happen before fetch topic details
        localStorage.setItem('foreignLanguage', name)
        //invoke getDetails and 
        this.showTopicDetails(id)
    }

    getTopicDetails = (id)=> {
        if(id === this.props.topic.id){
            //get topic details from backend
            SocketHandler.emit('FindTopicDetails', { 
                language: localStorage.getItem("foreignLanguage"), 
                topicId: id
            });
            SocketHandler.on("TopicDetailsFound", data => {
                console.log(data)
                if (data.topicId === id) {
                    this.setState({
                        ...this.state,
                        details: data.details,
                    })
                } else {
                    return data
                }
            })
            //fetch vocabulary for each topic
            //use topic id to remember which card is clicked
            fetch(`${expressUrl}/vocabularyGroup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    //use this.setLanguage to change current language.
                    currentLanguage: localStorage.getItem("foreignLanguage"),
                    topicId: this.props.topic.id
                })
            })
            .then(res => res.json())
            .then(vocabularyGroup => 
                
                this.setState({
                    ...this.state,
                    vocabulary: vocabularyGroup
                })
            )
        }
    }

    showTopicDetails = (id) => {
        this.getTopicDetails(id)
        this.setState(
            {
               ...this.state,
                showDetails: !this.state.showDetails
            })
    }

    startQuiz=(id) => {
        localStorage.setItem('topicId', `${id}`)
        this.props.history.push({
            pathname: `/quizzes`
        })
    }
  
    playSound= (character)=> {
        let speaker = new window.SpeechSynthesisUtterance();
        //add more languages later
        //use this.setLanguage to get the current language
        if (localStorage.getItem('foreignLanguage') === "Mandarin"){
            speaker.lang = 'zh-TW';
        }else if(localStorage.getItem('foreignLanguage') === "Japanese"){
            speaker.lang = 'ja-JP';
        }
        speaker.text = `${character}`;
        speechSynthesis.speak(speaker);
    }

    render() {
        console.log(this.props)
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <Grid container spacing={24}>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardContent>

                            <Typography variant="h5" component="h2">
                                {this.props.topic.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {this.props.topic.content}
                            </Typography>
                            <Typography variant="body1" component="p">
                                Category: {this.props.topic.category}
                            </Typography>
                            <Typography variant="body2" component="p">
                                 Learn more in
                                {this.state.availableLanguages.map((language, i) =>
                                    <li>
                                    <Button size="small" 
                                    color="secondary" 
                                    key={i + 1} 
                                    onClick={
                                        (id) => {
                                            this.setLanguage(language, this.props.topic.id)
                                        }

                                    }>
                                        {language}
                                    </Button>
                                    </li>
                                )}
                            </Typography>            
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={8}>
                    
                    <Slide direction="left" in={this.state.showDetails} mountOnEnter unmountOnExit>
                        {
                            localStorage.getItem('userid') === null ?
                            (
                            
                            <Paper className={classes.paper}>
                            <Typography variant="h6" align="center">
                                Please log in or create a new account to access the content.
                                <LoginForm />
                            </Typography>
                            </Paper>
                            )
                            :
                            (
                            <Paper className={classes.paper}> 
                            <Typography variant="h6">
                            Content:
                            </Typography>   
                            <Typography variant="body1">   
                                {this.state.details}
                            </Typography>
                            
                            <Typography variant="h6">
                            New words:
                            </Typography>   
                                {this.state.vocabulary.map((vocabulary,i) =>
                                    <Typography variant="body1" key={i+1}>
                                        {vocabulary.character}    
                                        < Hearing onClick ={()=> 
                                           this.playSound(vocabulary.character)                         
                                        }/> 
                                    </Typography>
                                )}

                                <Button size="medium" color="primary" variant="contained" 
                                onClick={(id) =>
                                  this.startQuiz(this.props.topic.id)
                                }>
                                Quiz Time!
                                </Button>
                                                        
                            </Paper>                           
                            )
                        }
                    </Slide>
                </Grid>
                
            </Grid>
        )
    }
}


TopicContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TopicContainer));