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
import NativeSelect from "@material-ui/core/NativeSelect";
import SocketHandler from "../SocketHandler";


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

class EditForm extends React.Component {

    constructor() {
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }

    state = {
        username: "",
        email: "",
        password: "",
        showPassword: false,
        avatar: "",
        points: 0,
        newLanguage: "",
        newTopic: ""
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
        let id = localStorage.getItem('userid')
        //update user info
        fetch(`${expressUrl}/users/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                avatar: this.state.avatar,
                id: id
            })            
        })
        //use socket to add new topic and new language
        SocketHandler.emit('addLanguageAndTopic', {
            userid: localStorage.getItem('userid'),
            language: this.state.newLanguage,
            topic: this.state.newTopic
        })
        
        //redirect
        this.props.history.push('/languages')
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        let id = localStorage.getItem('userid')
        fetch(`${expressUrl}/users/${id}`)
        .then(res=> res.json())
        .then( user => {
            this.setState({
                username: user.username,
                email: user.email,
                password: user.password,
                showPassword: true,
                avatar: user.avatar,
                points: user.points,
            })
        })
        // console.log('get current user data, use info to store in placeholder display in the form')
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
            <Typography variant="h4">{this.state.username}, your current score is {this.state.points} points.</Typography>
                <Typography variant="h5">Edit Your Account information</Typography>
                <img src={this.state.avatar} style={{ width: 100, height: 100 }}></img>
            <p></p>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <Divider />
                <TextField
                    id="email"
                    label="Your email:"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    margin="normal"
                    variant="outlined"
                    placeholder={this.state.email}
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
                    placeholder={this.state.username}
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
                    Get a new random username
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
                    placeholder={this.state.password}
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
                    Get a new random password
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
                    Get a new random avatar picture
                </Button>
                <Grid container>
                    <Avatar src={this.state.avatar} className={classes.bigAvatar} />
                </Grid>

                <p />
                <Divider variant="middle" />
                <p />
                <NativeSelect
                 value={this.state.newLanguage}
                onChange={this.handleChange("newLanguage")}
                inputProps={{
                    name: "newLanguage",
                    id: "newLanguage"
                }}
                error={this.state.newLanguage === ""}
                >
                <option value="" >Add a new language</option>
                <option value={"Mandarin"}>Chinese-Mandarin</option>
                <option value={"Japanese"}>Japanese</option>
                <option value={"Cantonese"}>Chinese-Cantonese(currently unavailbale)</option>
                <option value={"Tamil"}>Tamil(currently unavailable)</option>
                <option value={"Hebrew"}>Hebrew(currently unavailable)</option>
                <option value={"More"}>More languages...</option>
                </NativeSelect>
                <p></p>
                    <Divider variant="middle"/>
                <p></p>

                <NativeSelect
                        value={this.state.newTopic}
                        onChange={this.handleChange("newTopic")}
                        inputProps={{
                            name: "newTopic",
                            id: "newTopic"
                        }}
                        error={this.state.newTopic === ""}
                    >
                        <option value="">Add a new topic</option>
                        <option value={"greetings"}>greet people</option>
                        <option value={"courtesy"}>say thanks to people</option>
                        <option value={"introduction"}>introduce myself</option>
                    </NativeSelect>
                <p></p>
                <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="small"
                        className={classes.button}
                    >
                    <Typography variant="button" color="inherit" margin="normal">
                        Confirm Editing
                    </Typography>
                </Button>
            </form>


            </div>
        );
    }
}

EditForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(EditForm));
