import { create } from 'zustand';

export type ModalType = 'delete' | 'delete-cabang' | 'delete-unit';

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: number;
    onOpen: (type: ModalType, data: number) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: 0,
    onOpen: (type, data) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null }),
}));
