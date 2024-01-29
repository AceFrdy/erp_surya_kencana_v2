import { Fragment } from 'react';
import { useModal } from '../../hooks/use-modal';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteRestockModal = () => {
    const { isOpen, type, onClose, data } = useModal();
    const token = localStorage.getItem('accessToken') ?? '';

    const isModalOpen = isOpen && type === 'delete-restock';
    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        axios
            .delete(`https://erp.digitalindustryagency.com/api/distribution-restok/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                onClose();
                const notification = {
                    type: 'success',
                    message: 'Data Restock Berhasil Dihapus',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            })
            .catch((err) => {
                onClose();
                const notification = {
                    type: 'error',
                    message: 'Data Restock Gagal Dihapus.',
                    log: err.message,
                    title: 'ERROR_DELETING_RESTOCK',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog as="div" open={isModalOpen} onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-start justify-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <div className="text-lg font-bold">Hapus Restock</div>
                                </div>
                                <div className="p-5">
                                    <div>
                                        <form className="space-y-5">
                                            <div>
                                                <h1>Apakah Anda yakin ingin menghapus Restock</h1>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="flex justify-end items-center mt-8">
                                        <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                            Kembali
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                            onClick={() => {
                                                handleDelete(data);
                                            }}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DeleteRestockModal;
