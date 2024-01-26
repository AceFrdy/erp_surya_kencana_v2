import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAkses, useAuth } from '../hooks/auth';

interface AuthMiddlewareProps extends PropsWithChildren {
    menu: string;
}

const AuthMiddleware = ({ children, menu }: AuthMiddlewareProps) => {
    const authorize = useAuth();
    const akses = useAkses({ menu });
    if (authorize === 'isUnauthorized') {
        return <Navigate to="/auth/boxed-signin" />;
    }
    if (authorize === 'isAuthorized') {
        return <>{children}</>;
    }
    return null;
};

export default AuthMiddleware;
