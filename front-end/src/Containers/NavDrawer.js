import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LanguageIcon from "@material-ui/icons/Language";
import TopicIcon from "@material-ui/icons/Class";
import AboutIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import SignupIcon from "@material-ui/icons/AccountBox";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import LeaderboardIcon from "@material-ui/icons/Assessment";
import ColorIcon from "@material-ui/icons/ColorLens"
import TrophiesIcon from "@material-ui/icons/ThumbUp";
import logo from '../assets/logo.png';
import darkTheme from '../themes/dark';
import lightTheme from '../themes/light';
import Switch from "@material-ui/core/Switch";
import MainContainer from "./MainContainer";
import { withRouter } from 'react-router-dom';


const drawerWidth = 220;
const theme1 = createMuiTheme(lightTheme);
const theme2 = createMuiTheme(darkTheme);

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
});

class NavDrawer extends React.Component {
    state = {
        open: false,
        isThemeLight: true
    };

    handleDrawerOpen =() => {
        this.setState({open:true});
    }

    handleDrawerClose =() => {
        this.setState({open:false});
    }
    
    toggleThemeClick = () => {
        this.setState({ 
            ...this.state,
            isThemeLight: !this.state.isThemeLight 
        })
    }

    handleLogout = ()=> {
        localStorage.clear();
        this.props.history.push('/')
    }
    
    render (){
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
        <MuiThemeProvider theme={this.state.isThemeLight ? theme1 : theme2}>

        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        HowLingua: A Learner-Centered App for Learning Foreign Languages
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                                <ChevronRightIcon />
                            )}
                    </IconButton>
                </div>
                <List>
                        <img src={logo} alt="Logo" style= {{width: 200, height: 200, align: "center"}}></img>
                </List>
                <Divider />

                <List>
                    <Typography variant="h6" align="center">Welcome, 
                    </Typography>
                    <Typography variant="h6" align="center">Learner !
                    </Typography>
                    <Divider/>    
                    {["Languages", "Topics"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <LanguageIcon /> : <TopicIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {["Trophies", "Leaderboard"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <TrophiesIcon /> : <LeaderboardIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button key="Account">
                        <ListItemIcon>
                            {localStorage.getItem("userid") !== null ? <SettingsIcon /> : <SignupIcon />}
                        </ListItemIcon>
                    <ListItemText primary={localStorage.getItem("userid") !== null ? "Settings" : "Signup for an account"} />
                    </ListItem>
                    <ListItem button key = "Exit" onClick = {this.handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                    <ListItemText primary={localStorage.getItem("userid") !== null ? "Logout" : "Exit"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key = "About">
                        <ListItemIcon>
                            <AboutIcon />
                        </ListItemIcon>
                        <ListItemText primary= "About" />
                    </ListItem>
                     <ListItem button key = "Dark/Light Theme" onClick = {this.toggleThemeClick}>
                        <ListItemIcon>
                            <ColorIcon />
                        </ListItemIcon>
                        <ListItemText primary= "Dark/Light Theme" />
                        <Switch
                            checked={!this.state.isThemeLight}
                            onChange={this.toggleThemeClick}
                            value="light"
                            color="primary"
                        />
                    </ListItem>
                </List>
            </Drawer>

            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader} />
                    <MainContainer />
                    <Typography variant="h6">
                    If user is logged in, render logout on the left, add username on the left. TODO
                    If user is not logged in, render login on the left. TODO
                    </Typography>
            </main>
        </div>
        </MuiThemeProvider>

    );
    }

}

NavDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default  withRouter(withStyles(styles, {withTheme: true }) (NavDrawer));
