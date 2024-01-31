import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';

import Pagination from '../../../components/Pagination';
import IconPlus from '../../../components/Icon/IconPlus';
import IconNotes from '../../../components/Icon/IconNotes';
import IconPencil from '../../../components/Icon/IconPencil';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps } from '../../../utils';

import 'react-toastify/dist/ReactToastify.css';

interface PrivilagesDataProps {
    id: number;
    privilage_name: string;
}

const Jabatan = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Uang Masuk'));
    });
    const [initialRecords, setInitialRecords] = useState<PrivilagesDataProps[]>([]);
    const [addPrivilages, setAddPrivilages] = useState(false);
    const [editPrivilages, setEditPrivilages] = useState(false);
    const [deletePrivilages, setDeletePrivilages] = useState(false);
    const [editedPrivilagesId, setEditedPrivilagesId] = useState<number | null>(null);
    const [deletePrivilagesId, setDeletePrivilagesId] = useState<number | null>(null);
    const [page, setPage] = useState('');
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    const fetchData = () => {
        const url = `https://erp.digitalindustryagency.com/api/privilages${search && page ? '?q=' + search + '&&page=' + page : search ? '?q=' + search : page && '?page=' + page}`;
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const privilages = response.data.data.resource.data;
                setInitialRecords(privilages);
                // page
                setMetaLink({
                    current_page: response.data.data.resource.current_page,
                    last_page: response.data.data.resource.last_page,
                    from: response.data.data.resource.from,
                    to: response.data.data.resource.to,
                    per_page: response.data.data.resource.per_page,
                    total: response.data.data.resource.total,
                });
                setMetaLinksLink(response.data.data.resource.links);
                setLinksLink({
                    first: response.data.data.resource.first_page_url,
                    last: response.data.data.resource.last_page_url,
                    next: response.data.data.resource.next_page_url,
                    prev: response.data.data.resource.prev_page_url,
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const [formData, setFormData] = useState({
        privilage_name: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAdd = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            privilage_name: formData.privilage_name,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/privilages', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Data privilage berhasil ditambahkan:', response.data);
                setFormData({
                    privilage_name: '',
                });
                fetchData();
                setAddPrivilages(false);
                toast.success('success');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const apiErrors = error.response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        errors: apiErrors,
                    }));
                }
                console.error('Error adding privilage data:', error);
                toast.error('Error adding data');
            });
    };

    const handleEditButtonClick = (privilagesId: number) => {
        const editedPrivilages = initialRecords.find((privilage) => privilage.id === privilagesId);
        if (editedPrivilages) {
            setFormData({
                privilage_name: editedPrivilages.privilage_name,
            });
            setEditedPrivilagesId(privilagesId);
            setEditPrivilages(true);
        }
    };

    const handleEditPrivilages = () => {
        if (!editedPrivilagesId) {
            return;
        }

        const editedData = {
            id: editedPrivilagesId,
            privilage_name: formData.privilage_name,
        };

        console.log('Edited Data:', editedData);
        axios
            .put(`https://erp.digitalindustryagency.com/api/privilages/${editedPrivilagesId}`, editedData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('API Response:', response.data);
                console.log('Privilages data successfully updated:', response.data);
                navigate('/menuhumanresource/jabatan');
                toast.success('Data berhasil diedit', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setEditPrivilages(false);
                setEditedPrivilagesId(null);
                fetchData();
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setFormData((prevData) => ({
                        ...prevData,
                        errors: error.response.data,
                    }));
                    console.log('Validation Errors:', error.response.data);
                }
                console.error('Error updating Privilages data:', error);
                toast.error('Error updating data');
            });
    };

    const handleDeleteButtonClick = (privilagesId: number | null) => {
        const deletePrivilages = initialRecords.find((privilages) => privilages.id === privilagesId);
        if (deletePrivilages) {
            setFormData({
                privilage_name: deletePrivilages.privilage_name,
            });
            setDeletePrivilagesId(privilagesId);
            setDeletePrivilages(true);
        }
    };

    const handleDeletePrivilages = () => {
        if (!deletePrivilagesId) {
            return;
        }

        const deleteData = {
            id: deletePrivilagesId,
            privilage_name: formData.privilage_name,
        };
        console.log('Delete Data:', deleteData);
        axios
            .delete(`https://erp.digitalindustryagency.com/api/privilages/${deletePrivilagesId}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('API Response:', response.data);
                console.log('privilages data successfully deleted:', response.data);
                toast.success('Data berhasil dihapus', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                fetchData();
                setDeletePrivilages(false);
            })
            .catch((error) => {
                console.error('Error deleting privilages data:', error);
                toast.error('Error deleting data');
            });
    };

    return (
        <div>
            <Transition appear show={addPrivilages} as={Fragment}>
                <Dialog as="div" open={addPrivilages} onClose={() => setAddPrivilages(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">Tambah Jabatan</h5>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setAddPrivilages(false)}>
                                            {/* <svg>...</svg> */}
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <label htmlFor="gridName">Nama Jabatan</label>
                                            <form className="space-y-5" onSubmit={handleAdd}>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Masukan Privilages"
                                                        className="form-input"
                                                        name="privilage_name"
                                                        value={formData.privilage_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </form>{' '}
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setAddPrivilages(false)}>
                                                Batal
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleAdd}>
                                                Simpan
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={editPrivilages} as={Fragment}>
                <Dialog as="div" open={editPrivilages} onClose={() => setEditPrivilages(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg dark:text-white">Edit Jabatan</h5>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setEditPrivilages(false)}>
                                            {/* <svg>...</svg> */}
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <label htmlFor="gridName">Nama Jabatan</label>
                                            <form className="space-y-5">
                                                <div>
                                                    <input
                                                        type="textfield"
                                                        placeholder="Masukan Privilages"
                                                        className="form-input"
                                                        name="privilage_name"
                                                        value={formData.privilage_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </form>{' '}
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setEditPrivilages(false)}>
                                                Batal
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleEditPrivilages}>
                                                Simpan
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={deletePrivilages} as={Fragment}>
                <Dialog as="div" open={deletePrivilages} onClose={() => setDeletePrivilages(false)}>
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
                                        <div className="text-lg font-bold">Delete Privilages</div>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <form className="space-y-5">
                                                <div>
                                                    <h1>Apakah Anda yakin ingin menghapus jabatan</h1>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setDeletePrivilages(false)}>
                                                Kembali
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleDeletePrivilages}>
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
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Menu Human Resource</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Jabatan </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center">Jabatan</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <button onClick={() => setAddPrivilages(true)} type="button" className=" px-2 btn btn-outline-info">
                        <IconPlus className="flex mx-2" fill={true} /> Add
                    </button>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            { accessor: 'privilage_name', title: 'Nama Jabatan', sortable: true },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'blue' }}>
                                            <Link to={`/menuhumanresource/jabatan/detailjabatan/${e.id}`}>
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <button type="button" style={{ color: 'orange' }} onClick={() => handleEditButtonClick(e.id)}>
                                            <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                        </button>
                                        <button type="button" style={{ color: 'red' }} onClick={() => handleDeleteButtonClick(e.id)}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                    />
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setPage} />}
                </div>
            </div>
        </div>
    );
};

export default Jabatan;
