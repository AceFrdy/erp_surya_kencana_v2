import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import AuthMiddleware from '../middleware/auth-middleware';
import PublicMiddleware from '../middleware/public-middleware';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

const finalMiddleware = finalRoutes.map((route) => {
    return {
        ...route,
        element: route.middleware === 'auth' ? <AuthMiddleware menu={route.menuAkses}>{route.element}</AuthMiddleware> : <PublicMiddleware>{route.element}</PublicMiddleware>,
    };
});

const router = createBrowserRouter(finalMiddleware);

export default router;
