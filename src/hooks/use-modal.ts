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
    | 'delete-inflow-cash'
    | 'search-product'
    | 'search-cabang'
    | 'search-unit'
    | 'delete-pay-piutang'
    | 'delete-piutang'
    | 'delete-uang-keluar'
    | 'search-product-barcode';

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

interface BranchProductProps {
    id?: number;
    product?: {
        product_barcode?: string;
        product_name?: string;
    };
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: number;
    branchproduct: DataProps[];
    qty: number;
    product: DataProps[];
    cabang: CabangProps[];
    unit: UnitProps[];
    setGet: Dispatch<SetStateAction<string>>;
    onOpen: (
        type: ModalType,
        data?: number,
        branchproduct?: BranchProductProps[],
        qty?: number,
        product?: DataProps[],
        cabang?: CabangProps[],
        unit?: UnitProps[],
        setGet?: Dispatch<SetStateAction<string>>
    ) => void;
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
    branchproduct: [],
    setGet: () => {},
    onOpen: (type, data, branchproduct, qty, product, cabang, unit, setGet) => set({ isOpen: true, type, data, branchproduct, qty, product, cabang, unit, setGet }),
    onClose: () => set({ isOpen: false, type: null }),
}));
