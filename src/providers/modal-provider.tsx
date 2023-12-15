import DeleteCustomerOfflineModal from '../components/modals/delete-customer-offline-modal';
import DeleteCabangModal from '../components/modals/delete-modal-cabang';
import DeleteUnitModal from '../components/modals/delete-modal-unit';
import DeleteAkunModal from '../components/modals/delete-modal-akun';
import DeleteProductModal from '../components/modals/delete-product-modal';
import DeleteDataDistribusiModal from '../components/modals/delete-data-distribusi-modal';
import DeleteSeluruhDistribusiModal from '../components/modals/delete-seluruh-distribusi-modal';
import EditDistribusiModal from '../components/modals/edit-distribusi-modal';

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
        </>
    );
};

export default ModalProvider;
