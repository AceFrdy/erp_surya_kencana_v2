import React, { SetStateAction, useState, Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';

import { Pagination } from '@mantine/core';
import { Link } from 'react-router-dom';
import IconPlus from '../components/Icon/IconPlus';
import IconTrashLines from '../components/Icon/IconTrashLines';
import IconPencil from '../components/Icon/IconPencil';
const tableData = [
    {
        id: 1,
        nama: 'John Doe',
        email: 'johndoe@yahoo.com',
        date: '10/08/2020',
        sale: 120,
        status: 'Complete',
        register: '5 min ago',
        progress: '40%',
        position: 'Developer',
        office: 'London',
    },
    {
        id: 2,
        nama: 'Shaun Park',
        email: 'shaunpark@gmail.com',
        date: '11/08/2020',
        sale: 400,
        status: 'Pending',
        register: '11 min ago',
        progress: '23%',
        position: 'Designer',
        office: 'New York',
    },
    {
        id: 3,
        nama: 'Alma Clarke',
        email: 'alma@gmail.com',
        date: '12/02/2020',
        sale: 310,
        status: 'In Progress',
        register: '1 hour ago',
        progress: '80%',
        position: 'Accountant',
        office: 'Amazon',
    },
    {
        id: 4,
        nama: 'Vincent Carpenter',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,
        status: 'Canceled',
        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
    },
    {
        id: 4,
        nama: 'Vincent Carpenter',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,
        status: 'Canceled',
        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
    },
    {
        id: 4,
        nama: 'Vincent Carpenter',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,
        status: 'Canceled',
        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
    },
    {
        id: 4,
        nama: 'Vincent Carpenter',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,
        status: 'Canceled',
        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
    },
    {
        id: 4,
        nama: 'Vincent Carpenter',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,
        status: 'Canceled',
        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
    },
];
const Basic = () => {
    const [currentPage, setCurrentPage] = useState<number>(1); // Menggunakan tipe data number untuk state currentPage
    const itemsPerPage = 5;
    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
    const [modal1, setModal1] = useState(false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Memperbarui state currentPage saat halaman berubah
    };

    return (
        <div>
            <div className="mb-5">
                <Transition appear show={modal1} as={Fragment}>
                    <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
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
                                            <div className="text-lg font-bold">Tambah Kategori</div>
                                            {/* <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal1(false)}>
                                                <svg>...</svg>
                                            </button> */}
                                        </div>
                                        <div className="p-5">
                                            <div>
                                                <form className="space-y-5">
                                                    <div>
                                                        <input type="textfield" placeholder="Masukan Kategori" className="form-input" />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
                                                    Discard
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModal1(false)}>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Menu Penjualan</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Kategori Produk</span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="datatables">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Kategori Produk </h5>
                        {/* <Link to="/menupenjualan/product/kategoriproduk/forminput"> */}
                        <button type="button" className=" px-2 btn btn-outline-info" onClick={() => setModal1(true)}>
                            <IconPlus className="flex mx-2" fill={true} /> Add
                        </button>
                        {/* </Link> */}
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Kategori</th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.id}</td>
                                            <td>
                                                <div className="whitespace-nowrap">{data.nama}</div>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td className="p-3 border-b border-[#ebedf2] dark:border-[#191e3a] text-center">
                                                <button type="button" style={{ color: 'orange' }}>
                                                    <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                                </button>
                                                <button type="button" style={{ color: 'red' }}>
                                                    <IconTrashLines />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Integrasikan Pagination di sini */}
                    <Pagination total={totalPages} page={currentPage} onChange={handlePageChange} size="md" />
                </div>
            </div>
        </div>
    );
};

export default Basic;
