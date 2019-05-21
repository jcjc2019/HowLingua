import React from 'react';
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SurveyForm from '../Components/SurveyForm';


class Welcome extends React.Component{

    render() {
        const { classes } = this.props;

        return (                
            <h1>This is a test</h1>
        )
    }
}

export default Welcome;