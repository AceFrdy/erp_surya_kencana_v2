import { lazy } from 'react';

const Karyawan = lazy(() => import('../pages/MenuHumanResource/Karyawan/Karyawan'));
const AddKaryawan = lazy(() => import('../pages/MenuHumanResource/Karyawan/AddKaryawan'));
const EditKaryawan = lazy(() => import('../pages/MenuHumanResource/Karyawan/EditKaryawan'));
const Jabatan = lazy(() => import('../pages/MenuHumanResource/Jabatan/Jabatan'));
const DetailJabatan = lazy(() => import('../pages/MenuHumanResource/Jabatan/DetailJabatan'));
const HakAkses = lazy(() => import('../pages/MenuPengguna/HakAkses'));
const AddProduk = lazy(() => import('../pages/MenuPenjualan/Product/InputProduk'));
const Index = lazy(() => import('../pages/Index'));
const Ecommerce = lazy(() => import('../pages/Ecommerce'));
const Kategoriproduk = lazy(() => import('../pages/MenuPenjualan/KategoriProduk/KategoriProduk'));
const Produk = lazy(() => import('../pages/MenuPenjualan/Product/Produk'));
const Unit = lazy(() => import('../pages/MenuPenjualan/Unit/Unit'));
const AddUnit = lazy(() => import('../pages/MenuPenjualan/Unit/AddUnit'));
const EditUnit = lazy(() => import('../pages/MenuPenjualan/Unit/EditUnit'));
const EditProduk = lazy(() => import('../pages/MenuPenjualan/Product/EditProduk'));
const ListCabang = lazy(() => import('../pages/MenuPenjualan/Cabang/ListCabang'));
const AddCabang = lazy(() => import('../pages/MenuPenjualan/Cabang/AddCabang'));
const EditCabang = lazy(() => import('../pages/MenuPenjualan/Cabang/EditCabang'));
const Supplier = lazy(() => import('../pages/MenuPenjualan/Supplier/Supplier'));
const AddSupplier = lazy(() => import('../pages/MenuPenjualan/Supplier/AddSupplier'));
const EditSupplier = lazy(() => import('../pages/MenuPenjualan/Supplier/EditSupplier'));
const ListRestock = lazy(() => import('../pages/MenuPenjualan/Restock/ListRestock'));
const Restock = lazy(() => import('../pages/MenuPenjualan/Restock/Restock'));
const EditRestock = lazy(() => import('../pages/MenuPenjualan/Restock/EditRestock'));
const DetailRestock = lazy(() => import('../pages/MenuPenjualan/Restock/DetailRestock'));
const Penjualan = lazy(() => import('../pages/MenuPenjualan/Penjualan/Penjualan'));
const LaporanPenjualan = lazy(() => import('../pages/MenuPenjualan/Penjualan/LaporanPenjualan'));
const DetailPenjualan = lazy(() => import('../pages/MenuPenjualan/Penjualan/DetailPenjualan'));
const Distribusi = lazy(() => import('../pages/MenuPenjualan/Distribusi/Distribusi'));
const LaporanDistribusi = lazy(() => import('../pages/MenuPenjualan/Distribusi/LaporanDistribusi'));
const Login = lazy(() => import('../pages/Auth/Login'));
const DetailDistribusi = lazy(() => import('../pages/MenuPenjualan/Distribusi/DetailDistribusi'));
const DetailCabang = lazy(() => import('../pages/MenuPenjualan/Cabang/DetailCabang'));
const DetailCustomerOnline = lazy(() => import('../pages/Customer/CustomerOnline/DetailCustomerOnline'));
const Akun = lazy(() => import('../pages/MenuKeuangan/Akun/Akun'));
const AddAkun = lazy(() => import('../pages/MenuKeuangan/Akun/AddAkun'));
const EditAkun = lazy(() => import('../pages/MenuKeuangan/Akun/EditAkun'));
const DetailAkun = lazy(() => import('../pages/MenuKeuangan/DetailAkun/DetailAkun'));
const AddDetailAkun = lazy(() => import('../pages/MenuKeuangan/DetailAkun/AddDetailAkun'));
const EditDetailAkun = lazy(() => import('../pages/MenuKeuangan/DetailAkun/EditDetailAkun'));
const ControlPanel = lazy(() => import('../pages/MenuKeuangan/ControlPanel/ControlPanel'));
const Saldo = lazy(() => import('../pages/MenuKeuangan/Saldo/Saldo'));
const AddSaldo = lazy(() => import('../pages/MenuKeuangan/Saldo/AddSaldo'));
const UangMasuk = lazy(() => import('../pages/MenuKeuangan/Flowcash/UangMasuk/UangMasuk'));
const AddUangMasuk = lazy(() => import('../pages/MenuKeuangan/Flowcash/UangMasuk/AddUangMasuk'));
const DetailUangMasuk = lazy(() => import('../pages/MenuKeuangan/Flowcash/UangMasuk/DetailUangMasuk'));
const UangKeluar = lazy(() => import('../pages/MenuKeuangan/Flowcash/UangKeluar/UangKeluar'));
const AddUangKeluar = lazy(() => import('../pages/MenuKeuangan/Flowcash/UangKeluar/AddUangKeluar'));
const DetailUangKeluar = lazy(() => import('../pages/MenuKeuangan/Flowcash/UangKeluar/DetailUangKeluar'));
const Hutang = lazy(() => import('../pages/MenuKeuangan/Hutang-Piutang/Hutang/Hutang'));
const AddHutang = lazy(() => import('../pages/MenuKeuangan/Hutang-Piutang/Hutang/Addhutang'));
const DetailHutang = lazy(() => import('../pages/MenuKeuangan/Hutang-Piutang/Hutang/DetailHutang'));
const EditHutang = lazy(() => import('../pages/MenuKeuangan/Hutang-Piutang/Hutang/EditHutang'));
const Piutang = lazy(() => import('../pages/MenuKeuangan/Hutang-Piutang/Piutang/Piutang'));
const AddPiutang = lazy(() => import('../pages/MenuKeuangan/Hutang-Piutang/Piutang/AddPiutang'));
const DetailPiutang = lazy(() => import('../pages/MenuKeuangan/Hutang-Piutang/Piutang/DetailPiutang'));
const EditPiutang = lazy(() => import('../pages/MenuKeuangan/Hutang-Piutang/Piutang/EditPiutang'));
const Laporan = lazy(() => import('../pages/MenuKeuangan/Laporan/Laporan'));
const EditPenjualan = lazy(() => import('../pages/MenuPenjualan/Penjualan/EditPenjualan'));
const CustomerOffline = lazy(() => import('../pages/Customer/CustomerOffline/CustomerOffline'));
const EditCustomer = lazy(() => import('../pages/Customer/CustomerOffline/EditCustomerOffline'));
const AddCustomerOffline = lazy(() => import('../pages/Customer/CustomerOffline/AddCustomerOffline'));
const CustomerOnline = lazy(() => import('../pages/Customer/CustomerOnline/CustomerOnline'));
const NotFound = lazy(() => import('../pages/not-found'));
const Error404 = lazy(() => import('../pages/Error/Erorr404'));
const Error500 = lazy(() => import('../pages/Error/Error500'));
const Error503 = lazy(() => import('../pages/Error/Error503'));
const Profile = lazy(() => import('../pages/User/Profil'));

const routes = [
    //not-found
    {
        path: '*',
        element: <NotFound />,
        middleware: 'public',
        menuAkses: '-',
    },

    //Auth
    {
        path: '/auth/boxed-signin',
        element: <Login />,
        middleware: 'public',
        menuAkses: '-',
    },
    // User
    {
        path: '/user/profile',
        element: <Profile />,
        middleware: 'auth',
        menuAkses: '-',
    },
    // dashboard
    {
        path: '/',
        element: <Index />,
        middleware: 'auth',
        menuAkses: '0',
    },
    {
        path: '/ecommerce',
        element: <Ecommerce />,
        middleware: 'auth',
        menuAkses: '1',
    },
    // menu penjualan bagian Product
    {
        path: '/menupenjualan/product/produk',
        element: <Produk />,
        middleware: 'auth',
        menuAkses: '2',
    },
    {
        path: '/menupenjualan/product/produk/addproduk',
        element: <AddProduk />,
        middleware: 'auth',
        menuAkses: '2',
    },
    {
        path: '/menupenjualan/product/produk/editproduk/:id',
        element: <EditProduk />,
        middleware: 'auth',
        menuAkses: '2',
    },
    // Kategori Produk
    {
        path: '/menupenjualan/product/kategoriproduk',
        element: <Kategoriproduk />,
        middleware: 'auth',
        menuAkses: '2',
    },
    //Unit
    {
        path: '/menupenjualan/product/unit',
        element: <Unit />,
        middleware: 'auth',
        menuAkses: '2',
    },
    {
        path: '/menupenjualan/product/unit/addunit',
        element: <AddUnit />,
        middleware: 'auth',
        menuAkses: '2',
    },
    {
        path: '/menupenjualan/product/unit/editunit/:id',
        element: <EditUnit />,
        middleware: 'auth',
        menuAkses: '2',
    },
    // -->restock
    // Restock
    {
        path: '/menupenjualan/restock/listrestock',
        element: <ListRestock />,
        middleware: 'auth',
        menuAkses: '3',
    },
    {
        path: '/menupenjualan/restock/restock',
        element: <Restock />,
        middleware: 'auth',
        menuAkses: '3',
    },
    {
        path: '/menupenjualan/restock/editrestock/:id',
        element: <EditRestock />,
        middleware: 'auth',
        menuAkses: '3',
    },
    {
        path: '/menupenjualan/restock/detailrestock/:id',
        element: <DetailRestock />,
        middleware: 'auth',
        menuAkses: '3',
    },
    // ---> cabang
    // Cabang
    {
        path: '/menupenjualan/cabang/listcabang',
        element: <ListCabang />,
        middleware: 'auth',
        menuAkses: '4',
    },
    {
        path: '/menupenjualan/cabang/listcabang/addcabang',
        element: <AddCabang />,
        middleware: 'auth',
        menuAkses: '4',
    },
    {
        path: '/menupenjualan/cabang/listcabang/editcabang/:id',
        element: <EditCabang />,
        middleware: 'auth',
        menuAkses: '4',
    },
    {
        path: '/menupenjualan/cabang/detailcabang',
        element: <DetailCabang />,
        middleware: 'auth',
        menuAkses: '4',
    },
    // Customer
    {
        path: '/customer/offline',
        element: <CustomerOffline />,
        middleware: 'auth',
        menuAkses: '5',
    },
    {
        path: '/customer/offline/tambah-customer-offline',
        element: <AddCustomerOffline />,
        middleware: 'auth',
        menuAkses: '5',
    },
    {
        path: '/customer/offline/edit-customer-offline/:id',
        element: <EditCustomer />,
        middleware: 'auth',
        menuAkses: '5',
    },
    {
        path: '/customer/online',
        element: <CustomerOnline />,
        middleware: 'auth',
        menuAkses: '5',
    },
    {
        path: '/customer/online/detailcustomeronline/:id',
        element: <DetailCustomerOnline />,
        middleware: 'auth',
        menuAkses: '5',
    },
    // ---> penjualan
    // Penjualan
    {
        path: '/menupenjualan/penjualan/penjualan',
        element: <Penjualan />,
        middleware: 'auth',
        menuAkses: '6',
    },
    {
        path: '/menupenjualan/penjualan/laporanpenjualan',
        element: <LaporanPenjualan />,
        middleware: 'auth',
        menuAkses: '6',
    },
    {
        path: '/menupenjualan/penjualan/detailpenjualan/:id',
        element: <DetailPenjualan />,
        middleware: 'auth',
        menuAkses: '6',
    },
    {
        path: '/menupenjualan/penjualan/editpenjualan/:id',
        element: <EditPenjualan />,
        middleware: 'auth',
        menuAkses: '6',
    },
    // Distribution
    {
        path: '/menupenjualan/distribution/distribution',
        element: <Distribusi />,
        middleware: 'auth',
        menuAkses: '7',
    },
    {
        path: '/menupenjualan/distribution/laporandistribution',
        element: <LaporanDistribusi />,
        middleware: 'auth',
        menuAkses: '7',
    },
    {
        path: '/menupenjualan/distribution/detaildistribution/:id',
        element: <DetailDistribusi />,
        middleware: 'auth',
        menuAkses: '7',
    },
    // Suplier
    {
        path: '/menupenjualan/supplier',
        element: <Supplier />,
        middleware: 'auth',
        menuAkses: '8',
    },
    {
        path: '/menupenjualan/supplier/addsupplier',
        element: <AddSupplier />,
        middleware: 'auth',
        menuAkses: '8',
    },
    {
        path: '/menupenjualan/supplier/editsupplier/:id',
        element: <EditSupplier />,
        middleware: 'auth',
        menuAkses: '8',
    },
    // Menu keuangan Akun
    {
        path: '/menukeuangan/akun/akun',
        element: <Akun />,
        middleware: 'auth',
        menuAkses: '9',
    },
    {
        path: '/menukeuangan/akun/addakun',
        element: <AddAkun />,
        middleware: 'auth',
        menuAkses: '9',
    },
    {
        path: '/menukeuangan/akun/editakun/:id',
        element: <EditAkun />,
        middleware: 'auth',
        menuAkses: '9',
    },
    {
        path: '/menukeuangan/akun/detailakun',
        element: <DetailAkun />,
        middleware: 'auth',
        menuAkses: '9',
    },
    {
        path: '/menukeuangan/akun/adddetailakun',
        element: <AddDetailAkun />,
        middleware: 'auth',
        menuAkses: '9',
    },
    {
        path: '/menukeuangan/akun/editdetailakun/:id',
        element: <EditDetailAkun />,
        middleware: 'auth',
        menuAkses: '9',
    },
    // Control Panel
    {
        path: '/menukeuangan/controlpanel',
        element: <ControlPanel />,
        middleware: 'auth',
        menuAkses: '10',
    },
    // Saldo
    {
        path: '/menukeuangan/saldo',
        element: <Saldo />,
        middleware: 'auth',
        menuAkses: '11',
    },
    {
        path: '/menukeuangan/saldo/addsaldo',
        element: <AddSaldo />,
        middleware: 'auth',
        menuAkses: '11',
    },
    // FlowCash
    {
        path: '/menukeuangan/flowcash/uangmasuk',
        element: <UangMasuk />,
        middleware: 'auth',
        menuAkses: '12',
    },
    {
        path: '/menukeuangan/flowcash/adduangmasuk',
        element: <AddUangMasuk />,
        middleware: 'auth',
        menuAkses: '12',
    },
    {
        path: '/menukeuangan/flowcash/detailuangmasuk/:id',
        element: <DetailUangMasuk />,
        middleware: 'auth',
        menuAkses: '12',
    },
    // Uang Keluar
    {
        path: '/menukeuangan/flowcash/uangkeluar',
        element: <UangKeluar />,
        middleware: 'auth',
        menuAkses: '12',
    },
    {
        path: '/menukeuangan/flowcash/adduangkeluar',
        element: <AddUangKeluar />,
        middleware: 'auth',
        menuAkses: '12',
    },
    {
        path: '/menukeuangan/flowcash/detailuangkeluar/:id',
        element: <DetailUangKeluar />,
        middleware: 'auth',
        menuAkses: '12',
    },
    // Hutang
    {
        path: '/menukeuangan/hutang-piutang/hutang',
        element: <Hutang />,
        middleware: 'auth',
        menuAkses: '13',
    },
    {
        path: '/menukeuangan/hutang-piutang/addhutang',
        element: <AddHutang />,
        middleware: 'auth',
        menuAkses: '13',
    },
    {
        path: '/menukeuangan/hutang-piutang/detailhutang/:id',
        element: <DetailHutang />,
        middleware: 'auth',
        menuAkses: '13',
    },
    {
        path: '/menukeuangan/hutang-piutang/edithutang/:id',
        element: <EditHutang />,
        middleware: 'auth',
        menuAkses: '13',
    },
    // PIUTANG
    {
        path: '/menukeuangan/hutang-piutang/piutang',
        element: <Piutang />,
        middleware: 'auth',
        menuAkses: '13',
    },
    {
        path: '/menukeuangan/hutang-piutang/addpiutang',
        element: <AddPiutang />,
        middleware: 'auth',
        menuAkses: '13',
    },
    {
        path: '/menukeuangan/hutang-piutang/detailpiutang/:id',
        element: <DetailPiutang />,
        middleware: 'auth',
        menuAkses: '13',
    },
    {
        path: '/menukeuangan/hutang-piutang/editpiutang/:id',
        element: <EditPiutang />,
        middleware: 'auth',
        menuAkses: '13',
    },
    // Laporan
    {
        path: '/menukeuangan/laporan/laporan',
        element: <Laporan />,
        middleware: 'auth',
        menuAkses: '14',
    },
    // Karyawan
    {
        path: '/menuhumanresource/karyawan',
        element: <Karyawan />,
        middleware: 'auth',
        menuAkses: '15',
    },
    {
        path: '/menuhumanresource/karyawan/addkaryawan',
        element: <AddKaryawan />,
        middleware: 'auth',
        menuAkses: '15',
    },
    {
        path: '/menuhumanresource/karyawan/editkaryawan/:id',
        element: <EditKaryawan />,
        middleware: 'auth',
        menuAkses: '15',
    },
    //Jabatan
    {
        path: '/menuhumanresource/jabatan',
        element: <Jabatan />,
        middleware: 'auth',
        menuAkses: '16',
    },
    {
        path: '/menuhumanresource/jabatan/detailjabatan/:id',
        element: <DetailJabatan />,
        middleware: 'auth',
        menuAkses: '16',
    },
    //Hak Akses
    {
        path: '/menupengguna/hakakses',
        element: <HakAkses />,
        middleware: 'auth',
        menuAkses: '17',
    },
    //Error Page
    {
        path: '/pages/error/error404',
        element: <Error404 />,
        middleware: 'public',
        menuAkses: '-',
    },
    {
        path: '/pages/error/error500',
        element: <Error500 />,
        middleware: 'public',
        menuAkses: '-',
    },
    {
        path: '/pages/error/error503',
        element: <Error503 />,
        middleware: 'public',
        menuAkses: '-',
    },
];

export { routes };
