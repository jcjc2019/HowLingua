import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import SingleTopicCard from '../Components/SingleTopicCard';
import SocketHandler from '../SocketHandler';

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
//TODO: FIX USERTOPICS
class TopicContainer extends React.Component {

    state={
        allTopics: [],
        userTopics: [],
    }

    constructor() {
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }

    componentDidMount() {
        //get all topics if not signed in
        if (localStorage.getItem("userid") === null){
            fetch(`${expressUrl}/topics`)
                .then(res => res.json())
                .then(allTopics => {
                    //not directed from languages, so props is undefined
                    if (this.props.location.props === undefined) {
                        this.setState({
                            ...this.state,
                            allTopics: allTopics
                        })
                    } else {
                        //directed from languages, props has topics belong to this language
                        this.setState({
                            ...this.state,
                            allTopics: this.props.location.props.languageTopics,
                        })
                    }
                })
        }else{
            //socket to get user's topics
            SocketHandler.emit("FindUserTopics", {
                id: localStorage.getItem("userid")
            })
            SocketHandler.on("UserTopicsFound", data => {
                this.setState({
                    ...this.state,
                    allTopics: data
                })
            })
        }

    }

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.root}>
            {this.state.allTopics.map( (topic, i) =>
                
                    <SingleTopicCard 
                    topic={topic} 
                    key={i+1}
                    />
                
            )}
        </div>
        )
    }
}


TopicContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TopicContainer));