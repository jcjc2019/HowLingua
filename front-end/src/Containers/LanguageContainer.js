
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { NavLink, withRouter, Route } from 'react-router-dom';
import SocketHandler from "../SocketHandler";


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
        allLanguages: [],
        userLanguages: [],
    }

    constructor() {
        super()
        SocketHandler.connect(localStorage.getItem("token"));
    }

    componentDidMount(){
        fetch(`${expressUrl}/languages`)
        .then(res => res.json())
        .then(allLanguages => {
            this.setState({
                ...this.state,
                allLanguages: allLanguages
            })
        })

        SocketHandler.emit('userLanguages.index', { id: localStorage.userid });
        SocketHandler.on("userLanguages.found", data => (
            this.setState({
                ...this.state,
                userLanguages: data
            })
        ))
    }
    
    //map data to language cards
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                { localStorage.getItem('userid') === null
                ?
                (this.state.allLanguages.map(language => (
                    <ButtonBase
                        focusRipple
                        key={language.name}
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
                        onClick={()=> 
                            this.props.history.push({
                                pathname: `/languages/${language.id}`,
                                props: {
                                    name: language.name,
                                    introduction:language.introduction,
                                    imageURL: language.imageURL
                                }
                            })
                        }>
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
                )))
                :
                (this.state.userLanguages.map(language => (
                    <ButtonBase
                        focusRipple
                            key={language.name}
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
                            onClick={() =>
                                this.props.history.push({
                                    pathname: `/languages/${language.id}`,
                                    props: {
                                        name: language.name,
                                        introduction: language.introduction,
                                        imageURL: language.imageURL
                                    }
                                })
                            }>                                
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
                    )))
            }
            </div>
        );
    }

}

LanguageCards.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(LanguageCards));