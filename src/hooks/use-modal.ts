import { Dispatch, SetStateAction } from 'react';
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
    | 'delete-index'
    | 'search-product'
    | 'search-cabang'
    | 'search-unit';

interface DataProps {
    id?: number;
    product_barcode?: string;
    product_name?: string;
}

interface CabangProps {
    id?: number;
    branch_name?: string;
    branch_address?: string;
}

interface UnitProps {
    id?: number;
    unit_stock_name?: string;
    number_of_units?: number;
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: number;
    qty: number;
    product: DataProps[];
    cabang: CabangProps[];
    unit: UnitProps[];
    setGet: Dispatch<SetStateAction<string>>;
    onOpen: (type: ModalType, data?: number, qty?: number, product?: DataProps[], cabang?: CabangProps[], unit?: UnitProps[], setGet?: Dispatch<SetStateAction<string>>) => void;
    onClose: () => void;
}

export const useModal: UseBoundStore<StoreApi<ModalStore>> = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: 0,
    qty: 0,
    product: [],
    cabang: [],
    unit: [],
    setGet: () => {},
    onOpen: (type, data, qty, product, cabang, unit, setGet) => set({ isOpen: true, type, data, qty, product, cabang, unit, setGet }),
    onClose: () => set({ isOpen: false, type: null }),
}));
