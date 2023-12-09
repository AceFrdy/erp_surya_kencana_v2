import { lazy } from 'react';
// import MultipleTables from '../pages/Customer/CustomerOffline/CustomerOffline';
import InputCustomer from '../pages/Customer/CustomerOffline/InputCustomer';
import CustomerOffline from '../pages/Customer/CustomerOffline/CustomerOffline';
import EditCustomer from '../pages/Customer/CustomerOffline/EditCustomer';
const Index = lazy(() => import('../pages/Index'));
const Ecommerce = lazy(() => import('../pages/Ecommerce'));
const Kategoriproduk = lazy(() => import('../pages/MenuPenjualan/KategoriProduk/KategoriProduk'))
const Produk = lazy(() => import('../pages/MenuPenjualan/Product/Produk'))
// const OrderSorting = lazy(() => import('../pages/Basic'));
const Unit = lazy(() => import('../pages/MenuPenjualan/Unit/Unit'))
const AddUnit = lazy(() => import('../pages/MenuPenjualan/Unit/AddUnit'))
const EditUnit = lazy(() => import('../pages/MenuPenjualan/Unit/EditUnit'))
const AddProduk = lazy(() => import('../pages/MenuPenjualan/Product/InputProduk'))
const EditProduk = lazy(() => import('../pages/MenuPenjualan/Product/EditProduk'))
const ListCabang = lazy(() => import('../pages/MenuPenjualan/Cabang/ListCabang'))
const AddCabang = lazy(() => import('../pages/MenuPenjualan/Cabang/AddCabang'))
const EditCabang = lazy(() => import('../pages/MenuPenjualan/Cabang/EditCabang'))
const Supplier = lazy(() => import('../pages/MenuPenjualan/Supplier/Supplier'))
const AddSupplier = lazy(() => import('../pages/MenuPenjualan/Supplier/AddSupplier'))
const EditSupplier = lazy(() => import('../pages/MenuPenjualan/Supplier/EditSupplier'))
const ListRestock = lazy(() => import('../pages/MenuPenjualan/Restock/ListRestock'))



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
        path: '/menupenjualan/product/produk/editproduk',
        element: <EditProduk/>,
        layout: 'default',
    },
    // Kategori Produk
    {
        path: '/menupenjualan/product/kategoriproduk',
        element: <Kategoriproduk />,
        layout: 'default',
    },
    //Unit
    {
        path: '/menupenjualan/product/unit',
        element: <Unit />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/product/unit/addunit',
        element: <AddUnit />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/product/unit/editunit',
        element: <EditUnit />,
        layout: 'default',
    },
    // Customer
    {
        path: '/customer/offline',
        element: <CustomerOffline />,
        layout: 'default',
    },
    {
        path: '/customer/offline/tambah-customer-offline',
        element: <InputCustomer />,
        layout: 'default',
    },
    {
        path: '/customer/offline/edit-customer-offline',
        element: <EditCustomer />,
        layout: 'default',
    },
    // Cabang
    {
        path: '/menupenjualan/cabang/listcabang',
        element: <ListCabang />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/cabang/listcabang/addcabang',
        element: <AddCabang />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/cabang/listcabang/editcabang',
        element: <EditCabang />,
        layout: 'default',
    },
    // Suplier
    {
        path: '/menupenjualan/supplier',
        element: <Supplier />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/supplier/addsupplier',
        element: <AddSupplier />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/supplier/editsupplier',
        element: <EditSupplier />,
        layout: 'default',
    },
    // Restock
    {
        path: '/menupenjualan/restock/listrestock',
        element: <ListRestock />,
        layout: 'default',
    },
];

export { routes };
