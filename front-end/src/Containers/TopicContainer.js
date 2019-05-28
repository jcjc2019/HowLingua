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
import SingleTopicCard from '../Components/SingleTopicCard';

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
});

class TopicContainer extends React.Component {

    state={
        allTopics: [],
        userTopics: [],
    }

    componentDidMount() {
        console.log(this.props.location.props)
        fetch(`${expressUrl}/topics`)
            .then(res => res.json())
            .then(allTopics => {
                if (this.props.location.props === undefined){
                    this.setState({...this.state,allTopics: allTopics})
                }else{
                    this.setState({ ...this.state, allTopics: this.props.location.props.languageTopics })
                }

            })

        fetch(`${expressUrl}/users/${localStorage.userid}/topics`)
            .then(res => res.json())
            .then(userTopics => {
                this.setState({
                    ...this.state,
                    userTopics: userTopics
                })
            })

    }

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.root}>
            {localStorage.getItem('userid') === null ?
            (this.state.allTopics.map( topic =>
                (
                    <SingleTopicCard topic={topic}/>
                ) 
            ))
            :
            (this.state.userTopics.map( topic =>
                (
                    <SingleTopicCard topic={topic} />
                )                
            ))}
        </div>
        )
    }
}


TopicContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TopicContainer));