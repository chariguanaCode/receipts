import React from 'react';
import useStyles from './NotFound.css';
import { NotFoundStateModel } from './NotFound.d';

export const NotFound: React.FunctionComponent = () => {
    const classes = useStyles();
    return <div className={classes.NotFound}>404 error</div>;
};

export default NotFound;
