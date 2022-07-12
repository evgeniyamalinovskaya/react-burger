import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

//Компонент для реализации защищенного роута
const ProtectedRoute = ({ children, ...rest }) => {
    const user = useSelector((store) => store.user.user);
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
