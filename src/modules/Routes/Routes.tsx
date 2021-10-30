import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { RouteDefinitionType } from './Routes.d';

import { Home, Login, NotFound } from 'pages';
import { UserStatus } from 'reduxState/slices/user';
import useUser from 'api/modules/user';

export const routes = [
    { path: '/', label: 'Home', component: Home, exact: true },
    { path: '/login', label: 'Login', component: Login },
] as Array<RouteDefinitionType>;

export const Routes: React.FunctionComponent = () => {
    const { useStatus } = useUser();
    const userStatus = useStatus();
    const location = useLocation();

    return (
        <Switch>
            {location.pathname !== '/login' &&
                userStatus === UserStatus.Guest && (
                    <Redirect to="/login" push />
                )}
            {routes.map((r) => (
                <Route
                    key={r.path}
                    exact={r.exact ?? false}
                    path={r.path}
                    component={r.component}
                />
            ))}

            <Route exact path="/404" component={NotFound} />
            <Route path="*">
                <Redirect to="/404" />
            </Route>
        </Switch>
    );
};

export default Routes;
