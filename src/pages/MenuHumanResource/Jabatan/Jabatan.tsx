import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link, useNavigate } from 'react-router-dom';
import IconNotes from '../../../components/Icon/IconNotes';
import IconPlus from '../../../components/Icon/IconPlus';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Tillman',
        lastName: 'Forbes',
        email: 'tillmanforbes@manglo.com',
        dob: '2016-09-05',
        address: {
            street: '240 Vandalia Avenue',
            city: 'Thynedale',
            zipcode: 8994,
            geo: {
                lat: -34.949388,
                lng: -82.958111,
            },
        },
        phone: '+1 (969) 496-2892',
        isActive: false,
        age: 26,
        company: 'APPLIDECK',
    },
    {
        id: 4,
        firstName: 'Daisy',
        lastName: 'Whitley',
        email: 'daisywhitley@applideck.com',
        dob: '1987-03-23',
        address: {
            street: '350 Pleasant Place',
            city: 'Idledale',
            zipcode: 9369,
            geo: {
                lat: -54.458809,
                lng: -127.476556,
            },
        },
        phone: '+1 (861) 564-2877',
        isActive: true,
        age: 21,
        company: 'VOLAX',
    },
    {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+1 (962) 466-3483',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    },
    {
        id: 6,
        firstName: 'Buckley',
        lastName: 'Townsend',
        email: 'buckleytownsend@orbaxter.com',
        dob: '2011-05-29',
        address: {
            street: '131 Guernsey Street',
            city: 'Vallonia',
            zipcode: 6779,
            geo: {
                lat: -2.681655,
                lng: 3.528942,
            },
        },
        phone: '+1 (884) 595-2643',
        isActive: true,
        age: 40,
        company: 'OPPORTECH',
    },
    {
        id: 7,
        firstName: 'Latoya',
        lastName: 'Bradshaw',
        email: 'latoyabradshaw@opportech.com',
        dob: '2010-11-23',
        address: {
            street: '668 Lenox Road',
            city: 'Lowgap',
            zipcode: 992,
            geo: {
                lat: 36.026423,
                lng: 130.412198,
            },
        },
        phone: '+1 (906) 474-3155',
        isActive: true,
        age: 24,
        company: 'GORGANIC',
    },
    {
        id: 8,
        firstName: 'Kate',
        lastName: 'Lindsay',
        email: 'katelindsay@gorganic.com',
        dob: '1987-07-02',
        address: {
            street: '773 Harrison Avenue',
            city: 'Carlton',
            zipcode: 5909,
            geo: {
                lat: 42.464724,
                lng: -12.948403,
            },
        },
        phone: '+1 (930) 546-2952',
        isActive: true,
        age: 24,
        company: 'AVIT',
    },
    {
        id: 9,
        firstName: 'Marva',
        lastName: 'Sandoval',
        email: 'marvasandoval@avit.com',
        dob: '2010-11-02',
        address: {
            street: '200 Malta Street',
            city: 'Tuskahoma',
            zipcode: 1292,
            geo: {
                lat: -52.206169,
                lng: 74.19452,
            },
        },
        phone: '+1 (927) 566-3600',
        isActive: false,
        age: 28,
        company: 'QUILCH',
    },
    {
        id: 10,
        firstName: 'Decker',
        lastName: 'Russell',
        email: 'deckerrussell@quilch.com',
        dob: '1994-04-21',
        address: {
            street: '708 Bath Avenue',
            city: 'Coultervillle',
            zipcode: 1268,
            geo: {
                lat: -41.550295,
                lng: -146.598075,
            },
        },
        phone: '+1 (846) 535-3283',
        isActive: false,
        age: 27,
        company: 'MEMORA',
    },
];

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
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<PrivilagesDataProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [addPrivilages, setAddPrivilages] = useState(false);
    const [editPrivilages, setEditPrivilages] = useState(false);
    const [deletePrivilages, setDeletePrivilages] = useState(false);
    const [editedPrivilagesId, setEditedPrivilagesId] = useState<number | null>(null);
    const [deletePrivilagesId, setDeletePrivilagesId] = useState<number | null>(null);
    // const [privilages, setPrivilages] = useState<PrivilagesDataProps[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return item.privilage_name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const fetchData = () => {
        axios
            .get('https://erp.digitalindustryagency.com/api/privilages', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const privilages = response.data.data.resource.data;
                setInitialRecords(privilages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const [formData, setFormData] = useState({
        privilage_name: '',
        errors: {},
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
                    errors: {},
                });
                fetchData();
                setAddPrivilages(false);
                navigate('/menuhumanresource/jabatan');
                toast.success('Data berhasil ditambahkan', {
                    position: 'top-right',
                    autoClose: 3000,
                });
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
                errors: {},
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
                errors: {},
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
                    {/* <Link to="/m"> */}
                    <button onClick={() => setAddPrivilages(true)} type="button" className=" px-2 btn btn-outline-info">
                        <IconPlus className="flex mx-2" fill={true} /> Add
                    </button>
                    {/* </Link> */}
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => recordsData.indexOf(e) + 1 },
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
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Jabatan;
