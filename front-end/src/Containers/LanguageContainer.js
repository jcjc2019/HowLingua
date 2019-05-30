
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router-dom';
import SocketHandler from "../SocketHandler";
import { Divider } from "@material-ui/core";



const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        width: "100%"
    },
    image: {
        position: "relative",
        height: 200,
        [theme.breakpoints.down("xs")]: {
            width: "100% !important", // Overrides inline-style
            height: 100
        },
        "&:hover, &$focusVisible": {
            zIndex: 1,
            "& $imageBackdrop": {
                opacity: 0.15
            },
            "& $imageMarked": {
                opacity: 0
            },
            "& $imageTitle": {
                border: "4px solid currentColor"
            }
        }
    },
    focusVisible: {},
    imageButton: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.common.white
    },
    imageSrc: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        backgroundPosition: "center 40%"
    },
    imageBackdrop: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create("opacity")
    },
    imageTitle: {
        position: "relative",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
            .spacing.unit + 6}px`
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: "absolute",
        bottom: -2,
        left: "calc(50% - 9px)",
        transition: theme.transitions.create("opacity")
    }
});


//change this after deployment
const expressUrl = "http://localhost:3001"

class LanguageCards extends React.Component {
    
    state ={
        allLanguages: []
    }

    componentDidMount(){
        if(localStorage.getItem("userid") === null){
            fetch(`${expressUrl}/languages`)
                .then(res => res.json())
                .then(allLanguages => {
                    this.setState({
                        ...this.state,
                        allLanguages: allLanguages
                    })
                })
        }else{
            let userid = localStorage.getItem('userid')
            fetch(`${expressUrl}/users/${userid}/languages`)
                .then(res => res.json())
                .then(userLanguages => {
                    this.setState({
                        ...this.state,
                        allLanguages: userLanguages
                    })
                })
        }
    }

    handleChange = name => event => {
        console.log(event)
        console.log(name)
        if (event.target.value !== "") {
            this.setState({
                [name]: event.target.value
            })
        }
    };

    handleClick=(id) => {
        
        fetch(`${expressUrl}/languages/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('foreignLanguage', data.name);
            this.props.history.push({
            pathname: `/languages/${data.id}`,
            })
        })

    }
    
    //map data to language cards
    render(){
        const { classes } = this.props;
        console.log(this.state.allLanguages)
        return (
            <div className={classes.root}>
                {this.state.allLanguages.map((language,i) => (
                    <ButtonBase
                        focusRipple
                        key={language.id}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33%"
                        }}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url("${language.imageURL}")`
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}
                        onClick={(id)=> this.handleClick(language.id)}>
                            <Typography
                                component="span"
                                variant="h4"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {language.name}
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                ))}
            </div>
        );
    }

}

LanguageCards.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(LanguageCards));