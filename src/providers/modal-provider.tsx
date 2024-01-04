import DeleteCustomerOfflineModal from '../components/modals/delete-customer-offline-modal';
import DeleteCabangModal from '../components/modals/delete-modal-cabang';
import DeleteUnitModal from '../components/modals/delete-modal-unit';
import DeleteAkunModal from '../components/modals/delete-modal-akun';
import DeleteDetailAkunModal from '../components/modals/delete-modal-detail-akun';
import DeleteProductModal from '../components/modals/delete-product-modal';
import DeleteDataDistribusiModal from '../components/modals/delete-data-distribusi-modal';
import DeleteSeluruhDistribusiModal from '../components/modals/delete-seluruh-distribusi-modal';
import EditDistribusiModal from '../components/modals/edit-distribusi-modal';
import DeleteRestockModal from '../components/modals/delete-restock-modal';
import DeleteDataRestockModal from '../components/modals/delete-data-restock-modal';
import DeleteDataPenjualanModal from '../components/modals/delete-data-penjualan-modal';
import DeleteSaldoModal from '../components/modals/delete-modal-saldo';
import FinishRestock from '../components/modals/finish-restock';
import FinishDistribusi from '../components/modals/finish-distribusi';
import DeleteIndexModal from '../components/modals/delete-index-modal';
import SearchProduct from '../components/modals/search-product';
import SearchCabang from '../components/modals/search-cabang';
import SearchUnit from '../components/modals/search-unit';
import DeletePayPiutang from '../components/modals/delete-modal-pay-piutang';
import DeletePiutang from '../components/modals/delete-modal-piutang';
import DeleteUangKeluar from '../components/modals/delete-modal-uang-keluar';

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
            <EditDistribusiModal />
            <DeleteRestockModal />
            <DeleteDataRestockModal />
            <DeleteDataPenjualanModal />
            <DeleteSaldoModal />
            <DeleteDetailAkunModal />
            <FinishRestock />
            <FinishDistribusi />
            <DeleteIndexModal />
            <SearchProduct />
            <SearchCabang />
            <SearchUnit />
            <DeletePayPiutang />
            <DeletePiutang />
            <DeleteUangKeluar />
        </>
    );
};

export default ModalProvider;
