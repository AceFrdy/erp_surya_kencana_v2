import { lazy } from 'react';
const Karyawan = lazy(() => import('../pages/MenuHumanResource/Karyawan/Karyawan'));
const AddKaryawan = lazy(() => import('../pages/MenuHumanResource/Karyawan/AddKaryawan'));
const EditKaryawan = lazy(() => import('../pages/MenuHumanResource/Karyawan/EditKaryawan'));
const Jabatan = lazy(() => import('../pages/MenuHumanResource/Jabatan/Jabatan'));
const DetailJabatan = lazy(() => import('../pages/MenuHumanResource/Jabatan/DetailJabatan'));
const HakAkses = lazy(() => import('../pages/MenuPengguna/HakAkses'));
const User = lazy(() => import('../pages/MenuPengguna/User'));
const DetailUser = lazy(() => import('../pages/MenuPengguna/DetailUser'));
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
const DetailLaporan = lazy(() => import('../pages/MenuKeuangan/Laporan/DetailLaporan'));
const EditPenjualan = lazy(() => import('../pages/MenuPenjualan/Penjualan/EditPenjualan'));
const CustomerOffline = lazy(() => import('../pages/Customer/CustomerOffline/CustomerOffline'));
const EditCustomer = lazy(() => import('../pages/Customer/CustomerOffline/EditCustomerOffline'));
const AddCustomerOffline = lazy(() => import('../pages/Customer/CustomerOffline/AddCustomerOffline'));
const CustomerOnline = lazy(() => import('../pages/Customer/CustomerOnline/CustomerOnline'));
const AddCustomerOnline = lazy(() => import('../pages/Customer/CustomerOnline/AddCustomerOnline'));
const EditCustomerOnline = lazy(() => import('../pages/Customer/CustomerOnline/EditCustomerOnline'));
const NotFound = lazy(() => import('../pages/not-found'));

const routes = [
    //not-found
    {
        path: '*',
        element: <NotFound />,
        layout: 'blank',
        middleware: 'public',
    },
    //Auth
    {
        path: '/auth/boxed-signin',
        element: <Login />,
        layout: 'blank',
        middleware: 'public',
    },
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/ecommerce',
        element: <Ecommerce />,
        layout: 'default',
        middleware: 'auth',
    },
    // menu penjualan bagian Product
    {
        path: '/menupenjualan/product/produk',
        element: <Produk />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/product/produk/addproduk',
        element: <AddProduk />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/product/produk/editproduk/:id',
        element: <EditProduk />,
        layout: 'default',
        middleware: 'auth',
    },
    // Kategori Produk
    {
        path: '/menupenjualan/product/kategoriproduk',
        element: <Kategoriproduk />,
        layout: 'default',
        middleware: 'auth',
    },
    //Unit
    {
        path: '/menupenjualan/product/unit',
        element: <Unit />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/product/unit/addunit',
        element: <AddUnit />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/product/unit/editunit/:id',
        element: <EditUnit />,
        layout: 'default',
        middleware: 'auth',
    },
    // Customer
    {
        path: '/customer/offline',
        element: <CustomerOffline />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/customer/offline/tambah-customer-offline',
        element: <AddCustomerOffline />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/customer/offline/edit-customer-offline/:id',
        element: <EditCustomer />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/customer/online',
        element: <CustomerOnline />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/customer/online/tambah-customer-online',
        element: <AddCustomerOnline />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/customer/online/edit-customer-online',
        element: <EditCustomerOnline />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/customer/online/detailcustomeronline/:id',
        element: <DetailCustomerOnline />,
        layout: 'default',
        middleware: 'auth',
    },
    // Cabang
    {
        path: '/menupenjualan/cabang/listcabang',
        element: <ListCabang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/cabang/listcabang/addcabang',
        element: <AddCabang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/cabang/listcabang/editcabang/:id',
        element: <EditCabang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/cabang/detailcabang',
        element: <DetailCabang />,
        layout: 'default',
        middleware: 'auth',
    },
    // Suplier
    {
        path: '/menupenjualan/supplier',
        element: <Supplier />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/supplier/addsupplier',
        element: <AddSupplier />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/supplier/editsupplier/:id',
        element: <EditSupplier />,
        layout: 'default',
        middleware: 'auth',
    },
    // Restock
    {
        path: '/menupenjualan/restock/listrestock',
        element: <ListRestock />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/restock/restock',
        element: <Restock />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/restock/editrestock/:id',
        element: <EditRestock />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/restock/detailrestock/:id',
        element: <DetailRestock />,
        layout: 'default',
        middleware: 'auth',
    },
    // Penjualan
    {
        path: '/menupenjualan/penjualan/penjualan',
        element: <Penjualan />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/penjualan/laporanpenjualan',
        element: <LaporanPenjualan />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/penjualan/detailpenjualan/:id',
        element: <DetailPenjualan />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/penjualan/editpenjualan/:id',
        element: <EditPenjualan />,
        layout: 'default',
        middleware: 'auth',
    },
    // Distribution
    {
        path: '/menupenjualan/distribution/distribution',
        element: <Distribusi />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/distribution/laporandistribution',
        element: <LaporanDistribusi />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupenjualan/distribution/detaildistribution/:id',
        element: <DetailDistribusi />,
        layout: 'default',
        middleware: 'auth',
    },
    // Menu keuangan Akun
    {
        path: '/menukeuangan/akun/akun',
        element: <Akun />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/akun/addakun',
        element: <AddAkun />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/akun/editakun/:id',
        // path: '/menupenjualan/cabang/listcabang/editcabang/:id',
        element: <EditAkun />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/akun/detailakun',
        element: <DetailAkun />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/akun/adddetailakun',
        element: <AddDetailAkun />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/akun/editdetailakun/:id',
        element: <EditDetailAkun />,
        layout: 'default',
        middleware: 'auth',
    },
    // Control Panel
    {
        path: '/menukeuangan/controlpanel',
        element: <ControlPanel />,
        layout: 'default',
        middleware: 'auth',
    },
    // Saldo
    {
        path: '/menukeuangan/saldo',
        element: <Saldo />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/saldo/addsaldo',
        element: <AddSaldo />,
        layout: 'default',
        middleware: 'auth',
    },
    // FlowCash
    {
        path: '/menukeuangan/flowcash/uangmasuk',
        element: <UangMasuk />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/flowcash/adduangmasuk',
        element: <AddUangMasuk />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/flowcash/detailuangmasuk/:id',
        element: <DetailUangMasuk />,
        layout: 'default',
        middleware: 'auth',
    },
    // Uang Keluar
    {
        path: '/menukeuangan/flowcash/uangkeluar',
        element: <UangKeluar />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/flowcash/adduangkeluar',
        element: <AddUangKeluar />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/flowcash/detailuangkeluar/:id',
        element: <DetailUangKeluar />,
        layout: 'default',
        middleware: 'auth',
    },
    // Hutang
    {
        path: '/menukeuangan/hutang-piutang/hutang',
        element: <Hutang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/hutang-piutang/addhutang',
        element: <AddHutang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/hutang-piutang/detailhutang/:id',
        element: <DetailHutang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/hutang-piutang/edithutang/:id',
        element: <EditHutang />,
        layout: 'default',
        middleware: 'auth',
    },
    // PIUTANG
    {
        path: '/menukeuangan/hutang-piutang/piutang',
        element: <Piutang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/hutang-piutang/addpiutang',
        element: <AddPiutang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/hutang-piutang/detailpiutang/:id',
        element: <DetailPiutang />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/hutang-piutang/editpiutang/:id',
        element: <EditPiutang />,
        layout: 'default',
        middleware: 'auth',
    },
    // Laporan
    {
        path: '/menukeuangan/laporan/laporan',
        element: <Laporan />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menukeuangan/laporan/detaillaporan',
        element: <DetailLaporan />,
        layout: 'default',
        middleware: 'auth',
    },
    // Karyawan
    {
        path: '/menuhumanresource/karyawan',
        element: <Karyawan />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menuhumanresource/karyawan/addkaryawan',
        element: <AddKaryawan />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menuhumanresource/karyawan/editkaryawan/:id',
        element: <EditKaryawan />,
        layout: 'default',
        middleware: 'auth',
    },
    //Jabatan
    {
        path: '/menuhumanresource/jabatan',
        element: <Jabatan />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menuhumanresource/jabatan/detailjabatan/:id',
        element: <DetailJabatan />,
        layout: 'default',
        middleware: 'auth',
    },
    //Hak Akses
    {
        path: '/menupengguna/hakakses',
        element: <HakAkses />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupengguna/akun',
        element: <User />,
        layout: 'default',
        middleware: 'auth',
    },
    {
        path: '/menupengguna/akun/akundetail',
        element: <DetailUser />,
        layout: 'default',
        middleware: 'auth',
    },
];

export { routes };
