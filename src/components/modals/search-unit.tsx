import { ChangeEvent, Fragment, useState } from 'react';
import { useModal } from '../../hooks/use-modal';
import { Dialog, Transition } from '@headlessui/react';
import { DataTable } from 'mantine-datatable';
import IconSquareCheck from '../Icon/IconSquareCheck';

const SearchUnit = () => {
    const { isOpen, type, onClose, unit, setGet } = useModal();

    const isModalOpen = isOpen && type === 'search-unit';

    const [search, setSearch] = useState('');

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
                            <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden my-8 w-full max-w-5xl text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between">
                                    <div className="text-lg font-bold">Pilih Satuan</div>
                                </div>
                                <div className="w-1/2 mt-5">
                                    <input className="form-input" placeholder="Search..." onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} value={search} autoFocus />
                                </div>
                                <div className="max-h-[290px] overflow-y-scroll rounded-md mt-5">
                                    <DataTable
                                        highlightOnHover
                                        className="whitespace-nowrap table-hover"
                                        records={search.length > 0 ? unit.filter((item) => item.unit_stock_name?.toLowerCase().includes(search.toLowerCase())) : unit}
                                        columns={[
                                            {
                                                accessor: 'id',
                                                title: 'No',
                                                sortable: true,
                                                render: (e) =>
                                                    search.length > 0 ? unit.filter((item) => item.unit_stock_name?.toLowerCase().includes(search.toLowerCase())).indexOf(e) + 1 : unit.indexOf(e) + 1,
                                            },
                                            {
                                                accessor: 'unit_stock_name',
                                                title: 'Nama',
                                            },
                                            {
                                                accessor: 'number_of_units',
                                                title: 'Satuan',
                                            },
                                            {
                                                accessor: 'action',
                                                title: 'Opsi',
                                                titleClassName: '!text-center',
                                                render: (e) => (
                                                    <div className="flex items-center w-max mx-auto gap-2">
                                                        <button
                                                            type="button"
                                                            className="text-zinc-400 hover:text-green-500"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                setGet(e.unit_stock_name ?? '');
                                                                onClose();
                                                                setSearch('');
                                                            }}
                                                        >
                                                            <IconSquareCheck className="ltr:mr-2 rtl:ml-2 " />
                                                        </button>
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        minHeight={200}
                                    />
                                </div>
                                <div className="flex justify-end items-center mt-8">
                                    <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                        Kembali
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SearchUnit;
