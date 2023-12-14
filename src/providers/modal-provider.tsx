import DeleteCustomerOfflineModal from '../components/modals/delete-customer-offline-modal';
import DeleteCabangModal from '../components/modals/delete-modal-cabang';
import DeleteUnitModal from '../components/modals/delete-modal-unit';
import DeleteAkunModal from '../components/modals/delete-modal-akun';
import DeleteProductModal from '../components/modals/delete-product-modal';

const ModalProvider = () => {
    return (
        <>
            <DeleteCustomerOfflineModal />
            <DeleteUnitModal />
            <DeleteCabangModal />
            <DeleteAkunModal />
            <DeleteProductModal />
        </>
    );
};

export default ModalProvider;
