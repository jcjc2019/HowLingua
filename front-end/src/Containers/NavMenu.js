import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TypoGraphy from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar';

//use list instead of menu
const styles = theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        height: "95%",
        width: "50%"
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
            <AppBar color="primary" position="static">
                    
                    <MenuList>
                    <MenuItem>
                    <Toolbar>
                        <TypoGraphy variant="title" color="inherit">HowLingua</TypoGraphy>
                    </Toolbar>
                    </MenuItem>
                    </MenuList>        

                    <Divider />
                    <Paper>
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
                </AppBar>   
        );
    }
}

MenuListAll.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListAll);
