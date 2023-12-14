import { lazy } from 'react';
import Karyawan from '../pages/MenuHumanResource/Karyawan/Karyawan';
import AddKaryawan from '../pages/MenuHumanResource/Karyawan/AddKaryawan';
import EditKaryawan from '../pages/MenuHumanResource/Karyawan/EditKaryawan';
import Jabatan from '../pages/MenuHumanResource/Jabatan/Jabatan';
import DetailJabatan from '../pages/MenuHumanResource/Jabatan/DetailJabatan';
const Index = lazy(() => import('../pages/Index'));
const Ecommerce = lazy(() => import('../pages/Ecommerce'));
const Kategoriproduk = lazy(() => import('../pages/MenuPenjualan/KategoriProduk/KategoriProduk'));
const Produk = lazy(() => import('../pages/MenuPenjualan/Product/Produk'));
const Unit = lazy(() => import('../pages/MenuPenjualan/Unit/Unit'));
const AddUnit = lazy(() => import('../pages/MenuPenjualan/Unit/AddUnit'));
const EditUnit = lazy(() => import('../pages/MenuPenjualan/Unit/EditUnit'));
const AddProduk = lazy(() => import('../pages/MenuPenjualan/Product/InputProduk'));
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
const EditDistribusi = lazy(() => import('../pages/MenuPenjualan/Distribusi/EditDistribusi'));
const LaporanDistribusi = lazy(() => import('../pages/MenuPenjualan/Distribusi/LaporanDistribusi'));
const Login = lazy(() => import('../pages/Auth/Login'));
const SignUp = lazy(() => import('../pages/Auth/SignUp'));
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
        element: <AddProduk />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/product/produk/editproduk/:id',
        element: <EditProduk />,
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
        path: '/menupenjualan/product/unit/editunit/:id',
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
        path: '/customer/offline/edit-customer-offline/:id',
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
    {
        path: '/customer/online/detailcustomeronline',
        element: <DetailCustomerOnline />,
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
        path: '/menupenjualan/supplier/editsupplier/:id',
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
    {
        path: '/menupenjualan/penjualan/editpenjualan',
        element: <EditPenjualan />,
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
        path: '/menupenjualan/distribution/detaildistribution/:id',
        element: <DetailDistribusi />,
        layout: 'default',
    },
    {
        path: '/menupenjualan/distribution/editdistribution',
        element: <EditDistribusi />,
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
    // Menu keuangan Akun
    {
        path: '/menukeuangan/akun/akun',
        element: <Akun />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/akun/addakun',
        element: <AddAkun />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/akun/editakun/:id',
        // path: '/menupenjualan/cabang/listcabang/editcabang/:id',
        element: <EditAkun />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/akun/detailakun',
        element: <DetailAkun />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/akun/adddetailakun',
        element: <AddDetailAkun />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/akun/editdetailakun',
        element: <EditDetailAkun />,
        layout: 'default',
    },
    // Control Panel
    {
        path: '/menukeuangan/controlpanel',
        element: <ControlPanel />,
        layout: 'default',
    },
    // Saldo
    {
        path: '/menukeuangan/saldo',
        element: <Saldo />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/saldo/addsaldo',
        element: <AddSaldo />,
        layout: 'default',
    },
    // FlowCash
    {
        path: '/menukeuangan/flowcash/uangmasuk',
        element: <UangMasuk />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/flowcash/adduangmasuk',
        element: <AddUangMasuk />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/flowcash/detailuangmasuk',
        element: <DetailUangMasuk />,
        layout: 'default',
    },
    // Uang Keluar
    {
        path: '/menukeuangan/flowcash/uangkeluar',
        element: <UangKeluar />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/flowcash/adduangkeluar',
        element: <AddUangKeluar />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/flowcash/detailuangkeluar',
        element: <DetailUangKeluar />,
        layout: 'default',
    },
    // Hutang
    {
        path: '/menukeuangan/hutang-piutang/hutang',
        element: <Hutang />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/hutang-piutang/addhutang',
        element: <AddHutang />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/hutang-piutang/detailhutang',
        element: <DetailHutang />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/hutang-piutang/edithutang',
        element: <EditHutang />,
        layout: 'default',
    },
    // PIUTANG
    {
        path: '/menukeuangan/hutang-piutang/piutang',
        element: <Piutang />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/hutang-piutang/addpiutang',
        element: <AddPiutang />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/hutang-piutang/detailpiutang',
        element: <DetailPiutang />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/hutang-piutang/editpiutang',
        element: <EditPiutang />,
        layout: 'default',
    },
    // Laporan
    {
        path: '/menukeuangan/laporan/laporan',
        element: <Laporan />,
        layout: 'default',
    },
    {
        path: '/menukeuangan/laporan/detaillaporan',
        element: <DetailLaporan />,
        layout: 'default',
    },
    // Karyawan
    {
        path: '/menuhumanresource/karyawan',
        element: <Karyawan />,
        layout: 'default',
    },
    {
        path: '/menuhumanresource/karyawan/addkaryawan',
        element: <AddKaryawan />,
        layout: 'default',
    },
    {
        path: '/menuhumanresource/karyawan/editkaryawan',
        element: <EditKaryawan />,
        layout: 'default',
    },
    //Jabatan
    {
        path: '/menuhumanresource/jabatan',
        element: <Jabatan />,
        layout: 'default',
    },
    {
        path: '/menuhumanresource/jabatan/detailjabatan',
        element: <DetailJabatan />,
        layout: 'default',
    },

];

export { routes };
