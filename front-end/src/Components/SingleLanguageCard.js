import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router-dom';
import YouTube from 'react-youtube';
import Divider from "@material-ui/core/Divider";


const styles = {
    card: {
        maxWidth: '500'
    },
    media: {
        height: '500'
    }
};

//change this after deployment
//const expressUrl = "http://localhost:3001"

const opts = {
    height: '400',
    width: '640',
    align: "center",
    playerVars: { 
        autoplay: 1
    }
};

class SingleLanguageCard extends React.Component{

    state = {
        topics: [],
        currentLanguage: {}
    }

    componentDidMount(){
        //get currentLanguage
        fetch(`http://localhost:3001/languages/${this.props.match.params.id}`)
        .then(res=>res.json())
        .then(language => {
            console.log(language)
            this.setState({
                ...this.state,
                currentLanguage: language
            })
        })
        //get topics belong to currentLanguage
        //const {myKey} = this.props.match.params
        fetch(`http://localhost:3001/languages/${this.props.match.params.id}/topics`)
        .then(res => res.json())
        .then(topics=>{
            console.log(topics)
            this.setState({topics: topics})
        })
    }

    renderVideo = ()=> {
        //add language intro videos from Youtube
        if(this.state.currentLanguage.name === "Mandarin"){
            return(
                <YouTube videoId="QY0AMmLuiqk" opts={opts} onReady={this._onReady}/>
            )
        }else if(this.state.currentLanguage.name === "Japanese"){
            return (
                <YouTube videoId="x9-e_3GHrzw" opts={opts} onReady={this._onReady} />
            )
        }else if(this.state.currentLanguage.name === "Cantonese"){
            return (
                <YouTube videoId="s2km_z4-1T8" opts={opts} onReady={this._onReady} />
            )            
        } else if (this.state.currentLanguage.name === "Tamil"){
            return (
                <YouTube videoId="9TqIW8_BEt0" opts={opts} onReady={this._onReady} />
            )            
        }else if(this.state.currentLanguage.name === "Hebrew"){
            return (
                <YouTube videoId="RfThdgT6GSk" opts={opts} onReady={this._onReady} />
            )             
        }
    }

    render(){
        console.log(this.state)
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Card className={classes.card}>

                <img src={this.state.currentLanguage.imageURL} height="400" alt="language-logo"></img>
                    <CardContent>
                        <Typography gutterBottom variant="h2" component="h2" color="primary">
                            {this.state.currentLanguage.name}
                        </Typography>
                        <Typography variant="h6" component="h2">
                            {this.state.currentLanguage.introduction}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Watch a short intro video on {this.state.currentLanguage.name}.Try to answer this question:
                            <li>What is {this.state.currentLanguage.name}?</li>
                        </Typography>
                        <p></p>
                        <Divider />
                        {this.renderVideo()}

                    </CardContent>

                <CardActions>
                    <Button size="large" color="primary" variant="contained" onClick={() => 
                        this.props.history.push({pathname: "/topics", props:{ languageTopics: this.state.topics}})}>
                    
                        Study Time!
                
                    </Button>
                </CardActions>
            
                </Card>
            </div>
        )
    }
}


SingleLanguageCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SingleLanguageCard));