import { lazy } from 'react';
import InputCustomer from '../pages/Customer/CustomerOffline/InputCustomer';
import MultipleTables from '../pages/Customer/CustomerOffline/MultipleTables';
const Index = lazy(() => import('../pages/Index'));
const Ecommerce = lazy(() => import('../pages/Ecommerce'));
const OrderSorting = lazy(() => import('../pages/Basic'));

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
    // Customer
    {
        path: '/customer-offline',
        element: <MultipleTables />,
        layout: 'default',
    },
    {
        path: '/tambah-customer',
        element: <InputCustomer />,
        layout: 'default',
    },
];

export { routes };
