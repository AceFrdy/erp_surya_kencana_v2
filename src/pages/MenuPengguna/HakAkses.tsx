import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
// import IconBell from '../../../components/Icon/IconBell';
// import IconXCircle from '../../../components/Icon/IconXCircle';
import IconPencil from '../../components/Icon/IconPencil';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
// import { Dialog, Transition } from '@headlessui/react';
// import IconPlus from '../../../components/Icon/IconPlus';
// import IconNotes from '../../../components/Icon/IconNotes';
import Swal from 'sweetalert2';
import IconSend from '../../components/Icon/IconSend';
import IconPlus from '../../components/Icon/IconPlus';
// import IconCircleCheck from '../../../components/Icon/IconCircleCheck';
import IconTrendingUp from '../../components/Icon/IconTrendingUp';
import Dropdown from '../../components/Dropdown';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import { IRootState } from '../../store';
import IconEye from '../../components/Icon/IconEye';
import IconCashBanknotes from '../../components/Icon/IconCashBanknotes';
import { Dialog, Transition } from '@headlessui/react';
// import * as Yup from 'yup';
// import { Field, Form, Formik } from 'formik';

interface MenusProps {
    id: number;
    name_menu: string;
}

interface DataState {
    id: number;
    nama_previlige: string;
    menus: MenusProps[];
}

const dataHakAkses = [
    {
        id: 1,
        nama_previlige: 'admin',
        menus: [
            {
                id: 1,
                name_menu: 'dasboard',
            },
            {
                id: 2,
                name_menu: 'e-commerce',
            },
            {
                id: 3,
                name_menu: 'product',
            },
            {
                id: 4,
                name_menu: 'restoct',
            },
            {
                id: 5,
                name_menu: 'cabang',
            },
        ],
    },
    {
        id: 2,
        nama_previlige: 'karyawan',
        menus: [
            {
                id: 1,
                name_menu: 'dasboard',
            },
            {
                id: 2,
                name_menu: 'e-commerce',
            },
            {
                id: 3,
                name_menu: 'product',
            },
        ],
    },
    {
        id: 3,
        nama_previlige: 'operator',
        menus: [
            {
                id: 1,
                name_menu: 'dasboard',
            },
            {
                id: 2,
                name_menu: 'e-commerce',
            },
        ],
    },
    {
        id: 4,
        nama_previlige: 'customer',
        menus: [
            {
                id: 2,
                name_menu: 'e-commerce',
            },
        ],
    },
];

const dataMenu = [
    {
        id: 1,
        name_menu: 'dasboard',
    },
    {
        id: 2,
        name_menu: 'e-commerce',
    },
    {
        id: 3,
        name_menu: 'product',
    },
    {
        id: 4,
        name_menu: 'restoct',
    },
    {
        id: 5,
        name_menu: 'cabang',
    },
];

const HakAkses = () => {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState<boolean>(false);
    useEffect(() => {
        dispatch(setPageTitle('Hak Akses'));
    });
    const [initialRecords, setInitialRecords] = useState<DataState[]>(dataHakAkses);
    const [menuRecord, setMenuRecord] = useState<MenusProps[]>(dataMenu);

    return (
        <>
            <Transition appear show={openModal} as={Fragment}>
                <Dialog as="div" open={openModal} onClose={() => setOpenModal(false)}>
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
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-xl text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">Edit Distribusi Product</div>
                                    </div>
                                    <div className="p-5">
                                        <div className="datatables">
                                            <DataTable
                                                highlightOnHover
                                                className="whitespace-nowrap table-hover"
                                                records={menuRecord}
                                                columns={[
                                                    { accessor: 'id', title: 'No', width: 60, render: (e) => menuRecord.indexOf(e) + 1 },
                                                    {
                                                        accessor: 'name_menu',
                                                        title: 'Nama Menu',
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Opsi',
                                                        width: 100,
                                                        cellsClassName: 'flex justify-center',
                                                        titleClassName: '!text-center',
                                                        render: (e) => <input type="checkbox" />,
                                                    },
                                                ]}
                                                minHeight={200}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-end px-5 gap-x-2 py-3">
                                        <button onClick={() => setOpenModal(false)} className="btn btn-primary">
                                            Update
                                        </button>
                                        <button onClick={() => setOpenModal(false)} className="btn btn-primary">
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link to="/" className="text-primary hover:underline">
                            Home
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Menu Keuangan</span>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span> Hak Akses </span>
                    </li>
                </ul>

                <div className="grid xl:grid-cols-3 gap-6 grid-cols-1">
                    <div className="datatables panel xl:col-span-3">
                        <h5 className="font-semibold text-lg dark:text-white-light mb-2">Hak Akses</h5>
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={initialRecords}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                                {
                                    accessor: 'nama_previlige',
                                    title: 'Jabatan',
                                    sortable: true,
                                },
                                {
                                    accessor: 'menus',
                                    title: 'Menu Akses',
                                    sortable: true,
                                    render: (e) => (
                                        <div className="flex gap-2">
                                            {e.menus.map((item) => (
                                                <span key={item.id} className="px-3 py-0.5 bg-blue-500 rounded-md text-white">
                                                    {item.name_menu}
                                                </span>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    titleClassName: '!text-center',
                                    render: (e) => (
                                        <div className="flex items-center w-max mx-auto gap-2">
                                            <button type="button" style={{ color: 'orange' }} onClick={() => setOpenModal(true)}>
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            minHeight={200}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HakAkses;
