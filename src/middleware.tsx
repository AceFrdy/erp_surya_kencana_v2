import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/auth';

const Middleware = ({ children }: PropsWithChildren) => {
    const authorize = useAuth();
    if (authorize === 'isUnauthorized') {
        return <Navigate to="/auth/boxed-signin" />;
    }
    if (authorize === 'isAuthorized') {
        return <>{children}</>;
    }
};

export default Middleware;
