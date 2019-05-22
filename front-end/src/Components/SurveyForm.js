import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from '@material-ui/core/FormGroup';
import NativeSelect from "@material-ui/core/NativeSelect";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '10%',
        align: 'center'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SurveyForm extends React.Component{
    
    state = {
        nativeLanguage: "",
        topic: "",
        targetLanguage: "",
        labelWidth: 0,
    };

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = name => event => {
        if (event.target.value !== ""){
            this.setState({
                [name]: event.target.value
            })
        }
    };

    handleSubmit = (e)=> {
        e.preventDefault();
        localStorage.setItem('foreignLanguage', `${this.state.targetLanguage}`)
        localStorage.setItem('topic', `${this.state.topic}`)
        localStorage.setItem('points', 0)
        localStorage.setItem('nativeLanguage', `${this.state.nativeLanguage}`)
        console.log(localStorage)
        console.log(this.state)
        if(this.state.nativeLanguage !== "" && this.state.targetLanguage !== "" && this.state.topic !== ""){
            this.props.history.push('/main')
        }
    }

    render(){
        const {classes} = this.props;
        return (
            <form className={classes.root} onSubmit={this.handleSubmit}>
            <FormGroup>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Typography variant="h5" inline={false}>I speak  </Typography>
                        <InputLabel 
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="native-language">
                        </InputLabel>
                        <NativeSelect
                            value={this.state.nativeLanguage}
                            onChange={this.handleChange("nativeLanguage")}
                            input={
                                <OutlinedInput
                                    name="nativeLanguage"
                                    labelWidth={this.state.labelWidth}
                                    id="native-language"
                                />
                            }
                            error={this.state.nativeLanguage === ""}
                        >
                        <option value="" />
                        <option value={"English"}>English</option>
                        </NativeSelect>
                        <FormHelperText>Select your native language</FormHelperText>
                    </FormControl>

                    <FormControl variant="outlined" className={classes.formControl}>
                        <Typography variant="h5" inline={false}>I wanna learn how to</Typography>
                        <InputLabel htmlFor="topic"></InputLabel>
                        <NativeSelect
                            value={this.state.topic}
                            onChange={this.handleChange("topic")}
                            inputProps={{
                                name: "topic",
                                id: "topic"
                            }}
                            error={this.state.topic === ""}
                        >
                            <option value="" />
                            <option value={"greetings"}>greet people</option>
                            <option value={"courtesy"}>say thanks to people</option>
                            <option value={"introduction"}>introduce myself</option>
                        </NativeSelect>
                        <FormHelperText>Select the topic you want to know</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <Typography variant="h5" inline={false}>in</Typography>
                        <InputLabel htmlFor="targetLanguage"></InputLabel>
                        <NativeSelect
                            value={this.state.targetLanguage}
                            onChange={this.handleChange("targetLanguage")}
                            inputProps={{
                                name: "targetLanguage",
                                id: "targetLanguage"
                            }}
                            error={this.state.targetLanguage === ""}
                        >
                            <option value="" >Select a foreign language</option>
                            <option value={"Mandarin"}>Chinese-Mandarin</option>
                            <option value={"Japanese"}>Japanese</option>
                            <option value={"Cantonese"}>Chinese-Cantonese(currently unavailbale)</option>
                            <option value={"Spanish"}>Spanish(currently unavailbale)</option>
                            <option value={"French"}>French(currently unavailbale)</option>
                            <option value={"German"}>German(currently unavailbale)</option>
                            <option value={"Tamil"}>Tamil(currently unavailable)</option>
                            <option value={"Hebrew"}>Hebrew(currently unavailable)</option>
                        </NativeSelect>
                        <FormHelperText>Select the language you want to learn</FormHelperText>
                    </FormControl>

                    <Button type="submit" color="primary" variant="contained" size="medium">
                        <Typography variant="h5" color="inherit">Start my journey now!</Typography>
                    </Button>
                    <p></p>
                    <Divider/>
                    <p></p>
                    <Grid item>
                    <Typography variant="subheading" color="inherit" align="left">Already have an account?   
                        <Button color="secondary" variant="contained" size="medium" onClick={() => this.props.history.push('/login')} style={{marginLeft:"5%"}}s>
                        <Typography variant="subheading" color="inherit">Login</Typography>
                        </Button>
                    </Typography>
                    </Grid>
 
                </FormGroup> 
            </form>  
        )
    }

}

SurveyForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SurveyForm));