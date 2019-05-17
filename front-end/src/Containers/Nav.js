import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        // marginRight: theme.spacing.unit * 2,
        height: "100%",
        width: "100&"
    },
});

class MenuListAll extends React.Component {
    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <p>HowLingua</p>
                    <Divider />
                    <MenuList>
                        <MenuItem>My Languages</MenuItem>
                        <Divider />
                            <MenuList>
                                <MenuItem> Mandarin-Chinese</MenuItem>
                                <MenuItem> Japanese</MenuItem>
                            </MenuList>
                        <Divider />
                        <MenuItem>My Topics</MenuItem>
                        <Divider />
                        <MenuItem>My Trophies</MenuItem>
                        <Divider />
                        <MenuItem>Leaderboard</MenuItem>
                        <Divider />
                        <MenuItem>Settings</MenuItem>
                        <Divider />
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Paper>
            </div>
        );
    }
}

MenuListAll.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListAll);
