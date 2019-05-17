import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Welcome from './Containers/Welcome';
import Nav from './Containers/Nav';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: "2%",
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});
class App extends React.Component {

  render(){
    const { classes } = this.props;

    return (
    <div>
        <Grid container spacing={24}>
          <Grid item xs={2}>
              <Nav />
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
    </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);