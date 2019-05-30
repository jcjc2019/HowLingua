import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    margin: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        flexBasis: 200,
        display: "flex",
        flexWrap: "wrap"
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: "flex",
        flexWrap: "wrap"
    },
    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100
    }
});

//change this after deployment
const expressUrl = "http://localhost:3001"

class LeaderBoard extends React.Component{
    componentDidMount() {
        //TODO: GET ALL USERS DATA, SOCKET OR FETCH
        //TODO: GET CURRENT USER,SOCKET OR FETCH
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                Under construction. Coming soon...
            </div>
        )
    }
}

LeaderBoard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(LeaderBoard));

