import useUser from 'api/modules/user';
import React from 'react';
import useStyles from './Home.css';
import { HomeStateModel } from './Home.d';

export const Home: React.FunctionComponent = () => {
    const classes = useStyles();
    return <div className={classes.Home}>Test home</div>;
};

export default Home;
