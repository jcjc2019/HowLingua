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
        color: theme.palette.text.secondary,
        margin: `${theme.spacing.unit}px auto`,
        marginTop: '10%'
    },
});

class About extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} id="welcome">
                <Paper className={classes.paper} elevation={1}>
                    <Grid
                        container
                        spacing={24}
                       >
                        <Grid item xs={12} itemAlign="center">
                            <img src={logo} alt="Logo" style={{ width: 200, height: 200 }}></img>
                            <Typography variant="h6">A Learner-Centered App for Studying</Typography>
                            <Typography variant="h6">Less Commonly Taught Languages.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" justify="left">
                                Less Commonly Taught Languages (or LCTLs) is a designation used in the United States for languages other than the most commonly taught foreign languages in US public schools. The term covers a wide array of world languages (other than English), ranging from some of the world's largest and most influential languages, such as Chinese, Russian, Arabic, Hindi, Portuguese, Japanese, Persian, Urdu, and Turkish, to smaller regional languages studied in the US mainly by area experts, such as Twi, spoken in West Africa, and Finnish.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>

                            <Typography variant="body1" justify="left">
                                This app is designed to help learners to study those languages. Currently only the first topic "greetings" is available for Mandarin and Japanese languages. Support for more languages will be added in the future.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" justify="left">
                                Current Features:
                                <li>Users are able to hear how words sound. Made through Microsoft Speech API.</li>
                                <li>Users are able to talk to the computer and learn to improve the pronunciation through practices. </li>
                                <li>Users are able to learn a single topic in different languages.</li>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" justify="left">
                                Forthcoming Features:
                                <li>Users can take multiple choice questions and culture questions to test the understanding of the words and the context. </li>
                            </Typography>
                        </Grid>                          
                    </Grid>
                </Paper>
            </div>
        )
    }
}

About.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);