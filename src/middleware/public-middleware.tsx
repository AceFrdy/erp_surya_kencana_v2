import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const PublicMiddleware = ({ children }: PropsWithChildren) => {
    const authorize = useAuth();
    const { pathname } = useLocation();
    if (authorize === 'isAuthorized' && pathname === '/auth/boxed-signin') {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default PublicMiddleware;
