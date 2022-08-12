import React from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FC } from 'react';
import {useAppSelector} from "../../utils/types";

//Компонент для реализации защищенного роута
const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const user = useAppSelector((store) => store.user.user);
    const location = useLocation();

    return (
        <Route
            {...rest}
            render={
                () => (user ? (children) : (
                    <Redirect to={{
                        pathname: `/login`,
                        state: { from: location },
                    }}
                    />
                ))
            }
        />
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
