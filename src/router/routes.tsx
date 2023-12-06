import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Ecommerce = lazy(() => import('../pages/Ecommerce'));
const OrderSorting = lazy(() => import('../pages/Basic'))

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/ecommerce',
        element: <Ecommerce />,
        layout: 'default',
    },
    // menu penjualan
    {
        path: '/menupenjualan/product/kategoriproduk',
        element: <OrderSorting />,
        layout: 'default',
    },
];

export { routes };
