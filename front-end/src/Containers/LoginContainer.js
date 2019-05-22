import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LoginForm from '../Components/LoginForm';
import logo from '../assets/logo.png';
import { Typography } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";


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
        marginTop: '5%'
    },
});

class LoginContainer extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper className={classes.paper} elevation={1}>
                    <Grid
                        container
                        wrap="nowrap"
                        spacing={16}
                        justify="center"
                        alignItems="center">
                        <Grid item xs>
                            <img src={logo} alt="Logo" style={{ width: 200, height: 200 }}></img>
                            <Typography variant="subheading">A Learner-Centered App for</Typography>
                            <Typography variant="subheading">Learning Foreign Languages</Typography>
                            
                            <p>
                                <Divider variant="middle" />
                            </p>
                            <LoginForm />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

LoginContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginContainer);