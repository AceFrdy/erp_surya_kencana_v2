import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import Loader from '../components/Layouts/loader';

const PublicMiddleware = ({ children }: PropsWithChildren) => {
    const { authorize } = useAuth();
    const { pathname } = useLocation();

    if (authorize === 'isLoading') {
        return <Loader type="blank" />;
    } else if (authorize === 'isUnauthorized') {
        return <BlankLayout>{children}</BlankLayout>;
    }

    if (authorize === 'isAuthorized' && pathname !== '/auth/boxed-signin') {
        return <DefaultLayout>{children}</DefaultLayout>;
    } else if (authorize === 'isAuthorized' && pathname === '/auth/boxed-signin') {
        return <Navigate to="/" />;
    }

    return null;
};

export default PublicMiddleware;
