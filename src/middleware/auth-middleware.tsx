import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import Loader from '../components/Layouts/loader';

interface AuthMiddlewareProps extends PropsWithChildren {
    menu: string;
}

const AuthMiddleware = ({ children, menu }: AuthMiddlewareProps) => {
    const { authorize, akses } = useAuth();

    if (authorize === 'isLoading') {
        return <Loader type="blank" />;
    } else if (authorize === 'isUnauthorized') {
        return <Navigate to="/auth/boxed-signin" />;
    }

    if (authorize === 'isAuthorized' && akses[parseFloat(menu)]) {
        return <DefaultLayout>{children}</DefaultLayout>;
    } else if (authorize === 'isAuthorized' && !akses[parseFloat(menu)]) {
        return <Navigate to="/" />;
    }
    return <DefaultLayout>{children}</DefaultLayout>;
};

export default AuthMiddleware;
