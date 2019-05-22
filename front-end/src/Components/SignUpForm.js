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

class SignupForm extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        avatar: "",
        showPassword: false
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
        console.log("New user created.")
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

export default withStyles(styles)(SignupForm);
