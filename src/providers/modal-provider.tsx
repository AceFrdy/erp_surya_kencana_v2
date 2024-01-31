import DeleteCustomerOfflineModal from '../components/modals/delete-customer-offline-modal';
import DeleteCabangModal from '../components/modals/delete-modal-cabang';
import DeleteUnitModal from '../components/modals/delete-modal-unit';
import DeleteAkunModal from '../components/modals/delete-modal-akun';
import DeleteDetailAkunModal from '../components/modals/delete-modal-detail-akun';
import DeleteProductModal from '../components/modals/delete-product-modal';
import DeleteDataDistribusiModal from '../components/modals/delete-data-distribusi-modal';
import DeleteSeluruhDistribusiModal from '../components/modals/delete-seluruh-distribusi-modal';
import DeleteRestockModal from '../components/modals/delete-restock-modal';
import DeleteDataRestockModal from '../components/modals/delete-data-restock-modal';
import DeleteDataPenjualanModal from '../components/modals/delete-data-penjualan-modal';
import FinishRestock from '../components/modals/finish-restock';
import FinishDistribusi from '../components/modals/finish-distribusi';
import SearchProduct from '../components/modals/search-product';
import SearchCabang from '../components/modals/search-cabang';
import SearchUnit from '../components/modals/search-unit';
import DeletePayPiutang from '../components/modals/delete-modal-pay-piutang';
import DeletePiutang from '../components/modals/delete-modal-piutang';
import SearchProductBarcode from '../components/modals/search-product barcode';
import DeleteKaryawanModal from '../components/modals/delete-modal-karyawan';

const ModalProvider = () => {
    return (
        <>
            <DeleteCustomerOfflineModal />
            <DeleteUnitModal />
            <DeleteCabangModal />
            <DeleteAkunModal />
            <DeleteProductModal />
            <DeleteDataDistribusiModal />
            <DeleteSeluruhDistribusiModal />
            <DeleteRestockModal />
            <DeleteDataRestockModal />
            <DeleteDataPenjualanModal />
            <DeleteDetailAkunModal />
            <FinishRestock />
            <FinishDistribusi />
            <SearchProduct />
            <SearchCabang />
            <SearchUnit />
            <DeletePayPiutang />
            <DeletePiutang />
            <SearchProductBarcode />
            <DeleteKaryawanModal />
        </>
    );
};

export default ModalProvider;
