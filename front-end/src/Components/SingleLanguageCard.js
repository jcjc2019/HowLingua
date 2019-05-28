import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink, withRouter, Route } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import SocketHandler from "../SocketHandler";


const styles = {
    card: {
        maxWidth: '500'
    },
    media: {
        height: '500'
    }
};

//change this after deployment
const expressUrl = "http://localhost:3001"

class SingleLanguageCard extends React.Component{

    state = {
        topics: []
    }

    componentDidMount(){

        const {myKey} = this.props.match.params
        fetch(`http://localhost:3001/languages/${this.props.match.params.id}/topics`)
        .then(res => res.json())
        .then(topics=>{
            console.log(topics)
            this.setState({topics: topics})
        })
        console.log(this.state.topics)
    }

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Card className={classes.card}>
                <img src={this.props.location.props.imageURL} height="400"></img>
                    <CardContent>
                    <Typography gutterBottom variant="h2" component="h2">
                        {this.props.location.props.name}
                    </Typography>
                    <Typography variant="title" component="h2">
                        {this.props.location.props.introduction}
                    </Typography>
                    </CardContent>
                <CardActions>
                <Button size="large" color="primary" onClick={() => 
                    this.props.history.push({
                        pathname: "/topics",
                        props:{
                            languageTopics: this.state.topics
                        }
                    })}>
                    Study
                    </Button>
                    <Button size="large" color="secondary"
                        onClick={() =>
                        this.props.history.push({
                        pathname: `/quizzes`,
                        })}>
                    Test yourself
                    </Button>
                </CardActions>

                </Card>
            </div>)
    }
}


SingleLanguageCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SingleLanguageCard));