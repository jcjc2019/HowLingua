import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink, withRouter, Route } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
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
        // maxWidth: 420,
        // marginTop: '5%'
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
        vocabulary: []
    }

    componentDidMount=()=> {
        fetch(`http://localhost:3001/topics/${this.props.topic.id}/languages`)
        .then(res => res.json())
        .then(languages=>{
            this.setState({
                ...this.state,
                availableLanguages: languages.map(language => language.name)
            })
        })
    }

    showDetails = () => {
        this.setState(
            {
                ...this.state,
                showDetails: !this.state.showDetails            
            }
        )
        //get language
        const {myKey} = this.props.match.params

        SocketHandler.emit('FindTopicDetails', { language: localStorage.getItem("foreignLanguage"), topicId: this.props.topic.id });
        SocketHandler.on("TopicDetailsFound", data => (
            this.setState({
                ...this.state, 
                details: data.details,
                vocabulary: data.vocabulary.split(";"),
            }))
        )
    }
    
    playSound= (vocabulary)=> {
        let speaker = new window.SpeechSynthesisUtterance();
        speaker.lang = 'zh-TW';
        speaker.text = `${vocabulary}`;
        speechSynthesis.speak(speaker);
    }

    render() {
        console.log(this.state)
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
                                You are learning this topic in {localStorage.getItem("foreignLanguage")}.
                            </Typography>
                            <Typography variant="body2" component="p">
                                Available Languages: {this.state.availableLanguages.join(", ")}.
                            </Typography>                        
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="secondary" onClick={this.showDetails}>
                                Learn More
                            </Button>
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
                                {this.state.vocabulary.map(vocabulary =>
                                    <Typography variant="body1">
                                        {vocabulary}    
                                        < Hearing onClick ={()=> 
                                           this.playSound(vocabulary.split("(")[0])                         
                                        }/> 
                                    </Typography>
                                )}
                                <Button size="medium" color="primary" variant="contained" onClick={() =>
                                    this.props.history.push({
                                        pathname: `/quizzes`,
                                        props: {
                                            vocabulary: this.state.vocabulary,
                                            topic: this.props.topic.name
                                        }
                                })}>
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