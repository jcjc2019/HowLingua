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


const faker = require("faker");

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

class SignupForm extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        showPassword: false,
        avatar: "",
        // points: localStorage.getItem('points'),
        // TODO: a user who sign up after quiz should use the above line for points
        points: 0,
        currentTopic: "",
        // currentTopic: localStorage.getItem('topic'),
        // TODO: a user who sign up after finishing a topic should use the above line for topic
        currentLanguage: "",
        // currentTopic: localStorage.getItem('foreignLanguage'),
        // TODO: a user who sign up after finishing a topic should use the above line for language
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    generateRandomUsername = () => {
        let randomUsername = faker.internet.userName();
        this.setState(state => ({
            username: randomUsername
        }));
    };

    generateRandomAvatar = () => {
        let randomAvatar = faker.random.image();
        this.setState(state => ({
            avatar: randomAvatar
        }));
    };

    generateRandomPassword = () => {
        let randomPassword = faker.internet.password();
        this.setState(state => ({
            password: randomPassword
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // let username = e.target.querySelector("#username");
        // let password = e.target.querySelector("#password");
        // let email = e.target.querySelector("#email");
        this.fetchData();
    }

    fetchData = () => {
        fetch(`${expressUrl}/users`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                //sending this.state
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                avatar: this.state.avatar,
                //remember the progress
                points: this.state.points,
                currentTopic: this.state.currentTopic,
                currentLanguage: this.state.currentLanguage
            })
        })
        .then(res => res.json())
        .then(user => {
            console.log(user);
            localStorage.setItem("userid", user.id);
            localStorage.setItem("username", user.username);
            localStorage.setItem("token", user.token);
            console.log(localStorage);
            //show Drawer page 
            this.props.history.push('/main')
        })
    }
    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                    id="email"
                    label="Your email:"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    margin="normal"
                    variant="outlined"
                />
                <p />
                <Divider variant="middle" />
                <p />
                <TextField
                    required
                    id="username"
                    label="Your username:"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChange("username")}
                    helperText="Required"
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    color="primary"
                    variant="outlined"
                    margin="auto"
                    onClick={this.generateRandomUsername}
                    className={classes.button}
                >
                    Get a random username
                </Button>
                <p />
                <Divider variant="middle" />
                <p />

                <TextField
                    required
                    id="outlined-adornment-password"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    margin="normal"
                    helperText="Required"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Your favorite password:"
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    color="primary"
                    variant="outlined"
                    margin="normal"
                    onClick={this.generateRandomPassword}
                    className={classes.button}
                >
                   Get a random password
                </Button>
                <p />
                <Divider variant="middle" />
                <p />
                <Button
                    color="primary"
                    variant="outlined"
                    margin="normal"
                    onClick={this.generateRandomAvatar}
                    className={classes.button}
                >
                    Get a random avatar picture
                </Button>
                <Grid container>
                    <Avatar src={this.state.avatar} className={classes.bigAvatar} />
                </Grid>

                <p />
                <Divider variant="middle" />
                <p />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="small"
                    className={classes.button}
                >
                    <Typography variant="button" color="inherit" margin="normal">
                        Create a new account
                    </Typography>
                </Button>
            </form>
        );
    }
}

SignupForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignupForm));
