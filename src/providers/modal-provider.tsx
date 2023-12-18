import DeleteCustomerOfflineModal from '../components/modals/delete-customer-offline-modal';
import DeleteCabangModal from '../components/modals/delete-modal-cabang';
import DeleteUnitModal from '../components/modals/delete-modal-unit';
import DeleteAkunModal from '../components/modals/delete-modal-akun';
import DeleteDetailAkunModal from '../components/modals/delete-modal-detail-akun';
import DeleteProductModal from '../components/modals/delete-product-modal';
import DeleteDataDistribusiModal from '../components/modals/delete-data-distribusi-modal';

const ModalProvider = () => {
    return (
        <>
            <DeleteCustomerOfflineModal />
            <DeleteUnitModal />
            <DeleteCabangModal />
            <DeleteAkunModal />
            <DeleteProductModal />
            <DeleteDataDistribusiModal />
            <DeleteDetailAkunModal />
        </>
    );
};

export default ModalProvider;
