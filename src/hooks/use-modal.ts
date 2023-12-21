import { StoreApi, UseBoundStore, create } from 'zustand';

export type ModalType =
    | 'delete-customer-offline'
    | 'delete-cabang'
    | 'delete-unit'
    | 'delete-akun'
    | 'delete-product'
    | 'delete-data-distribusi'
    | 'delete-seluruh-distribusi'
    | 'edit-distribusi'
    | 'delete-restock'
    | 'delete-detail-akun'
    | 'delete-seluruh-restock'
    | 'finish-restock'
    | 'finish-distribusi'
    | 'delete-data-detail-penjualan'
    | 'delete-seluruh-restock'
    | 'delete-saldo'
    | 'delete-data-penjualan'
    | 'delete-index';

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: number;
    onOpen: (type: ModalType, data: number) => void;
    onClose: () => void;
}

export const useModal: UseBoundStore<StoreApi<ModalStore>> = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: 0,
    onOpen: (type, data) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null }),
}));
