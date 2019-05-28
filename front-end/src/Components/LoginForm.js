import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withRouter } from 'react-router-dom';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
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
        margin: theme.spacing.unit,
    },
});

//change this after deployment
const expressUrl = "http://localhost:3001"


class LoginForm extends React.Component{
    state = {
        username: "",
        email: "",
        password: "",
        showPassword: false,
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    
    handleClickShowPassword = ()=> {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        })
    }
    
    handleSubmit = e => {
        e.preventDefault()
        let username = e.target.querySelector("#username");
        let password = e.target.querySelector("#password")
        this.fetchData()
    }


    fetchData = ()=> {
        fetch(`${expressUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(user =>{
            //to make sessions
            localStorage.setItem("username", user.username);
            localStorage.setItem("userid", user.id);
            localStorage.setItem("token", user.token);
            console.log(localStorage);
            //show Drawer page 
            this.props.history.push('/languages')
        })
    }
        //.then(()=> 
        //TODO: create link between user and language, between user and topic
        //)
    
    render(){
        const { classes } = this.props;

        return(
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                <TextField
                    id="email"
                    label="Enter your email:"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    margin="normal"
                    variant="outlined"
                />
                <br></br>
                <TextField
                    required
                    id="username"
                    label="Enter your username:"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChange("username")}
                    helperText="Required for logging in."
                    margin="normal"
                    variant="outlined"
                />
                <br></br>
                <TextField
                    id="password"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    margin="normal"
                    helperText="Required for logging in."
                    type={this.state.showPassword ? "text" : "password"}
                    label="Enter your Password"
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
                <br></br>
                <Button type="submit" color="primary" variant="contained" size="medium" className={classes.button}>
                    <Typography variant="button" color="inherit">Sign in</Typography>
                </Button>

                <Button color="secondary" variant="contained" size="medium" className={classes.button} onClick={() => this.props.history.push('/signup')}>
                    <Typography variant="button" color="inherit">Create a new account</Typography>
                </Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(LoginForm));