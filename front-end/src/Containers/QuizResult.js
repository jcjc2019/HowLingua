import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LoginContainer from "./LoginContainer"
import Divider from "@material-ui/core/Divider";
import YouTube from 'react-youtube';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%",
        margin: 'auto',
    },
});

const opts = {
    height: '400',
    width: '640',
    align: "center",
    playerVars: {
        autoplay: 1
    }
};

const ChineseSongIds = ["0fm11XFw8uY","lpWYSLa3qME"]

class QuizResult extends React.Component{

    state={
        videoId: ""
    }

    componentDidMount(){
        //use fireworks library
        const Fireworks = require('fireworks-canvas') // cjs

        const container = document.getElementById('result')
        const options = {
            maxRockets: 10,            // max # of rockets to spawn
            rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
            numParticles: 500,        // number of particles to spawn when rocket explodes (+0-10)
            explosionMinHeight: 0.2,  // percentage. min height at which rockets can explode
            explosionMaxHeight: 0.9,  // percentage. max height before a particle is exploded
            explosionChance: 0.08     // chance in each tick the rocket will explode
        }

        // instantiate the class and call start
        // this returns a disposable - calling it will stop fireworks.
        const fireworks = new Fireworks(container, options)
        fireworks.start()
        // fireworks.fire() // fire a single rocket.
        this.renderVideo()
    }

    renderVideo =()=> {
       //set up videoId here 
        if(localStorage.getItem('foreignLanguage')== "Mandarin"){
            if (localStorage.getItem("topic") === "greetings"){
                this.setState({ 
                    videoId: "lpWYSLa3qME"
                })
            } 
        } else if (localStorage.getItem('foreignLanguage') == "Japanese"){
            if (localStorage.getItem("topic") === "greetings") {
                this.setState({
                    videoId: "pZKtfnx6kNQ"
                })
            }
        }
    }
    
    render(){
    
        const { classes } = this.props;
        return (
            <div className={classes.root} justify="center" id="result">
            <Grid container spacing={24}>
                
                    {
                        localStorage.getItem("userid") === null && localStorage.getItem("topic") !== "greetings"
                        
                        ?

                        (<Paper className={classes.paper}>
                            <LoginContainer/>
                        </Paper>)

                        :

                        (<Paper className={classes.paper}>

                            <Typography variant="h2" align="center">
                                Congratulations! You have finished the quiz.
                            </Typography>
                            <p></p>
                            <Divider />
                            <Typography variant="h3" align="center">
                            Your current score is {localStorage.getItem('points')} points!
                            </Typography>
                        <p></p>
                        <Divider />  
                        <p></p>  
                        <p></p>
                        <p></p>  

                        {localStorage.getItem("userid") === null ?                       
                        (
                            <Button 
                                color="secondary"
                                onClick={()=> this.props.history.push('/login')}>
                                Log in or sign up to access all content
                            </Button>
                        )
                        :
                        (
                            <Button
                               color="secondary"
                                onClick={() => this.props.history.push('/topics')}>
                                Continue my journey...
                            </Button>
                        )}
                        <p></p>
                        <Divider />
                        
                        <Typography variant="h5">Learn A Song!</Typography>
                            <YouTube videoId={this.state.videoId} opts={opts} onReady={this._onReady} />
                        </Paper>)                     
                    }


            </Grid>
            </div>
        );
    }

}

export default withRouter(withStyles(styles)(QuizResult));
