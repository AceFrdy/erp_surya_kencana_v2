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
    | 'delete-data-penjualan'
    | 'delete-data-detail-penjualan'
    | 'delete-seluruh-restock';

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
