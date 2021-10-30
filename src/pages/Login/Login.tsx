import useUser from 'api/modules/user';
import React, { useState } from 'react';
import useStyles from './Login.css';
import { LoginStateModel } from './Login.d';

export const Login: React.FunctionComponent = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        login: '' as string,
        password: '' as string,
    });
    const { login, register, useData } = useUser();
    const userData = useData(true);

    return (
        <div className={classes.Login}>
            <input
                value={state.login}
                onChange={(evt) =>
                    setState((state) => ({ ...state, login: evt.target.value }))
                }
            />
            <input
                value={state.password}
                onChange={(evt) =>
                    setState((state) => ({
                        ...state,
                        password: evt.target.value,
                    }))
                }
            />
            <button onClick={() => login(state)}>Login</button>
            {JSON.stringify(userData)}
        </div>
    );
};

export default Login;
