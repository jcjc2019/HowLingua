import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SurveyForm from '../Components/SurveyForm';
import logo from '../assets/logo.png';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: 420,
        margin: `${theme.spacing.unit}px auto`,
        marginTop: '10%'
    },
});

class WelcomeContainer extends React.Component{

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} id="welcome">
            <Paper className={classes.paper} elevation={1}>
                    <Grid 
                    container 
                    wrap="nowrap" 
                    spacing={16} 
                    justify="center"
                    alignItems="center">
                    <Grid item xs>
                        <img src={logo} alt="Logo" style={{ width: 200, height: 200}}></img>
                            <Typography variant="subheading">A Learner-Centered App for Studying</Typography>
                            <Typography variant="subheading">Less Commonly Taught Languages.</Typography>
                        <SurveyForm />
                    </Grid>
                </Grid>
            </Paper>
        </div>
        )
    }
}

WelcomeContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WelcomeContainer);