import React from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Welcome from './Welcome';
import NavDrawer from './NavDrawer';

export default class MainContainer extends React.Component {

    render() {
        return (
            <div>
                <NavDrawer />
            </div>
        )
    }
}


