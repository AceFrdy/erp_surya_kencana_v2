import { lazy } from 'react';
import DetailDistribusi from '../pages/MenuPenjualan/Distribusi/DetailDistribusi';
import DetailCabang from '../pages/MenuPenjualan/Cabang/DetailCabang';
// import MultipleTables from '../pages/Customer/CustomerOffline/CustomerOffline';
const CustomerOffline = lazy(() => import('../pages/Customer/CustomerOffline/CustomerOffline'))
const EditCustomer = lazy(() => import('../pages/Customer/CustomerOffline/EditCustomerOffline'))
const AddCustomerOffline = lazy(() => import('../pages/Customer/CustomerOffline/AddCustomerOffline'))
const CustomerOnline = lazy(() => import('../pages/Customer/CustomerOnline/CustomerOnline'))
const AddCustomerOnline = lazy(() => import('../pages/Customer/CustomerOnline/AddCustomerOnline'))
const EditCustomerOnline = lazy(() => import('../pages/Customer/CustomerOnline/EditCustomerOnline'))
const Index = lazy(() => import('../pages/Index'));
const Ecommerce = lazy(() => import('../pages/Ecommerce'));
const Kategoriproduk = lazy(() => import('../pages/MenuPenjualan/KategoriProduk/KategoriProduk'))
const Produk = lazy(() => import('../pages/MenuPenjualan/Product/Produk'))
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
const Restock = lazy(() => import('../pages/MenuPenjualan/Restock/Restock'))
const EditRestock = lazy(() => import('../pages/MenuPenjualan/Restock/EditRestock'))
const DetailRestock = lazy(() => import('../pages/MenuPenjualan/Restock/DetailRestock'))
const Penjualan = lazy(() => import('../pages/MenuPenjualan/Penjualan/Penjualan'))
const LaporanPenjualan = lazy(() => import('../pages/MenuPenjualan/Penjualan/LaporanPenjualan'))
const DetailPenjualan = lazy(() => import('../pages/MenuPenjualan/Penjualan/DetailPenjualan'))
const Distribusi = lazy(() => import('../pages/MenuPenjualan/Distribusi/Distribusi'))
const LaporanDistribusi = lazy(() => import('../pages/MenuPenjualan/Distribusi/LaporanDistribusi'))
const Login = lazy(() => import('../pages/Auth/Login'))
const SignUp = lazy(() => import('../pages/Auth/SignUp'))


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
        element: <AddCustomerOffline />,
        layout: 'default',
    },
    {
        path: '/customer/offline/edit-customer-offline',
        element: <EditCustomer />,
        layout: 'default',
    },
    {
        path: '/customer/online',
        element: <CustomerOnline />,
        layout: 'default',
    },
    {
        path: '/customer/online/tambah-customer-online',
        element: <AddCustomerOnline />,
        layout: 'default',
    },
    {
        path: '/customer/online/edit-customer-online',
        element: <EditCustomerOnline />,
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
        path: '/menupenjualan/cabang/listcabang/editcabang/:id',
        element: <EditCabang />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/cabang/detailcabang',
        element: <DetailCabang />,
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
    {
        path: '/menupenjualan/restock/restock',
        element: <Restock />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/restock/editrestock',
        element: <EditRestock />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/restock/detailrestock',
        element: <DetailRestock />,
        layout: 'default',
    },
    // Penjualan
    {
        path: '/menupenjualan/penjualan/penjualan',
        element: <Penjualan />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/penjualan/laporanpenjualan',
        element: <LaporanPenjualan />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/penjualan/detailpenjualan',
        element: <DetailPenjualan />,
        layout: 'default',
    },
    // Distribution
    {
        path: '/menupenjualan/distribution/distribution',
        element: <Distribusi />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/distribution/laporandistribution',
        element: <LaporanDistribusi />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/distribution/detaildistribution',
        element: <DetailDistribusi />,
        layout: 'default',
    },
    //Auth
    {
        path: '/auth/boxed-signin',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signup',
        element: <SignUp />,
        layout: 'blank',
    },
];

export { routes };
