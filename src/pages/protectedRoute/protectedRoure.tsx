import React, {FC}from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import {useAppSelector} from "../../utils/types";

//Компонент для реализации защищенного роута
const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const user = useAppSelector((store) => store.user.user);
    const location = useLocation<{ from: string }>();

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

export default ProtectedRoute;
