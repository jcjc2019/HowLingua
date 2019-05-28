import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

//add fetch to get questions from back end, to post points to users database
//add onClick for rendering next question card

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'auto',
    color: theme.palette.text.secondary,
    height: "100%"
  },
});

class MultipleChoiceQuestionCard extends React.Component {

    render (){
        const {classes} = this.props
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant ="h4">
                                This is the question prompt                        
                            </Typography>
                            <p></p>
                            <Typography variant="h5">
                                <p> A. </p>
                                <p> B. </p>
                                <p> C. </p>
                                <p> D. </p>
                            </Typography>
                            <p></p>
                            <Divider />
                            <p></p>
                            <Typography variant="h4">
                                This is the answer
                            </Typography>
                            <p></p>                    
                            <Typography>
                                <Button size="large" color="primary" variant="contained">
                                    Next
                                </Button>
                            </Typography>   
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

MultipleChoiceQuestionCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultipleChoiceQuestionCard);