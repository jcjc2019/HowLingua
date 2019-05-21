import React from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Welcome from './Welcome';
import NavDrawer from './NavDrawer';

export default class MainContainer extends React.Component {

    render() {
        return (
            <div>

                Here is the Component of Course Content after User logs in, or after user submits the survey form.
                QuizCard here, TopicCard here, filters here.
            </div>
        )
    }
}


