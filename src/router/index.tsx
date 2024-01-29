import { createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import AuthMiddleware from '../middleware/auth-middleware';
import PublicMiddleware from '../middleware/public-middleware';
import { Suspense } from 'react';

const finalMiddleware = routes.map((route) => {
    return {
        ...route,
        element:
            route.middleware === 'auth' ? (
                <AuthMiddleware menu={route.menuAkses}>
                    <Suspense fallback={<div>Loading...</div>}>{route.element}</Suspense>
                </AuthMiddleware>
            ) : (
                <PublicMiddleware>{route.element}</PublicMiddleware>
            ),
    };
});

const router = createBrowserRouter(finalMiddleware);

export default router;
