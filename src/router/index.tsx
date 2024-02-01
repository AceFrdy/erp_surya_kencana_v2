import { createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import AuthMiddleware from '../middleware/auth-middleware';
import PublicMiddleware from '../middleware/public-middleware';
import { Suspense } from 'react';
import Loader from '../components/Layouts/loader';
import DefaultLayout from '../components/Layouts/DefaultLayout';

const finalMiddleware = routes.map((route) => {
    return {
        ...route,
        element:
            route.middleware === 'auth' ? (
                <AuthMiddleware menu={route.menuAkses}>
                    <Suspense fallback={<Loader type="default" />}>{route.element}</Suspense>
                </AuthMiddleware>
            ) : (
                <PublicMiddleware>{route.element}</PublicMiddleware>
            ),
    };
});

const router = createBrowserRouter(finalMiddleware);

export default router;
