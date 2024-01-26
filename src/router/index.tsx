import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import Middleware from '../middleware';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

const finalMiddleware = finalRoutes.map((route) => {
    return {
        ...route,
        element: route.middleware === 'auth' ? <Middleware>{route.element}</Middleware> : <>{route.element}</>,
    };
});

const router = createBrowserRouter(finalMiddleware);

export default router;
