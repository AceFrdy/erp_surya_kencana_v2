import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Ecommerce = lazy(() => import('../pages/Ecommerce'));
const Kategoriproduk = lazy(() => import('../pages/MenuPenjualan/KategoriProduk/KategoriProduk'))
const Produk = lazy(() => import('../pages/MenuPenjualan/Product/Produk'))
const Unit = lazy(() => import('../pages/MenuPenjualan/Unit'))
const AddProduk = lazy(() => import('../pages/MenuPenjualan/Product/InputProduk'))



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
    // menu penjualan bagian Product
    {
        path: '/menupenjualan/product/produk',
        element: <Produk />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/product/produk/addproduk',
        element: <AddProduk/>,
        layout: 'default',
    },
    {
        path: '/menupenjualan/product/kategoriproduk',
        element: <Kategoriproduk />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/product/unit',
        element: <Unit />,
        layout: 'default',
    },
];

export { routes };
