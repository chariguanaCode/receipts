import React from 'react';
import useStyles from './App.css';
import { Routes } from 'modules';

export const App: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.App}>
            <Routes />
        </div>
    );
};

export default App;
