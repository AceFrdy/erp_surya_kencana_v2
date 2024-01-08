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

const tableData = [
    {
        id: 1,
        name: 'John Doe',
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
        name: 'Shaun Park',
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
        name: 'Alma Clarke',
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
        name: 'Vincent Carpenter',
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

const showAlert = async (type: number) => {
    if (type === 11) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                popup: 'sweet-alerts',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
                padding: '2em',
            })
            .then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                }
            });
    }
    if (type === 15) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Berhasil Dikirim',
            padding: '10px 20px',
        });
    }
    if (type == 20) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Data Berhasil Ditambah',
            padding: '10px 20px',
        });
    }
};
const HakAkses = () => {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState<boolean>(false);
    useEffect(() => {
        dispatch(setPageTitle('Hak Akses'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(tableData, 'firstName'));
    const [recordsData, setRecordsData] = useState(initialRecords);

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
        setInitialRecords(() => {
            return tableData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    // item.dob.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase())
                    // item.phone.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    const formatDate = (date: string | number | Date) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
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
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">Edit Distribusi Product</div>
                                    </div>
                                    <div className="p-5">
                                        <div className="w-full flex py-2">
                                            <div className="w-10">No</div>
                                            <div className="w-full">Nama</div>
                                            <div className="w-20">Action</div>
                                        </div>
                                        <div className="w-full flex py-2">
                                            <div className="w-10">1</div>
                                            <div className="w-full">Dashboard</div>
                                            <div className="w-20">
                                                <input type="checkbox" />
                                            </div>
                                        </div>
                                        <div className="w-full flex py-2">
                                            <div className="w-10">2</div>
                                            <div className="w-full">E-Commerce</div>
                                            <div className="w-20">
                                                <input type="checkbox" />
                                            </div>
                                        </div>
                                        <div className="w-full flex py-2">
                                            <div className="w-10">3</div>
                                            <div className="w-full">Product</div>
                                            <div className="w-20">
                                                <input type="checkbox" />
                                            </div>
                                        </div>
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
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <Link to="/menupenjualan/cabang/listcabang/addcabang">
                        <button type="button" className=" px-2 btn btn-outline-info">
                            <IconPlus className="flex mx-2" fill={true} /> Add
                        </button>
                    </Link> */}
                    <div className="ltr:mr-auto rtl:ml-auto"></div>
                </div>

                <div className="grid xl:grid-cols-3 gap-6 grid-cols-1">
                    <div className="datatables panel xl:col-span-3">
                        <div className="pb-[500px]">
                            <div className="flex w-full py-3 border-y">
                                <div className="w-20">no</div>
                                <div className="w-[500px]">Nama</div>
                                <div className="w-full">Menu</div>
                                <div className="w-[200px]">action</div>
                            </div>
                            <div className="flex w-full py-3  border-y">
                                <div className="w-20">1</div>
                                <div className="w-[500px]">Admin</div>
                                <div className="w-full flex gap-2">
                                    <span className="px-3 py-0.5 bg-blue-500 rounded-md">dashboard</span>
                                    <span className="px-3 py-0.5 bg-blue-500 rounded-md">e-commerce</span>
                                </div>
                                <div className="w-[200px]">
                                    <button onClick={() => setOpenModal(true)}>
                                        <IconPencil className="text-yellow-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-full py-3  border-y">
                                <div className="w-20">2</div>
                                <div className="w-[500px]">Operator</div>
                                <div className="w-full flex gap-2">
                                    <span className="px-3 py-0.5 bg-blue-500 rounded-md">dashboard</span>
                                    <span className="px-3 py-0.5 bg-blue-500 rounded-md">e-commerce</span>
                                </div>
                                <div className="w-[200px]">
                                    <button>
                                        <IconPencil className="text-yellow-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-full py-3  border-y">
                                <div className="w-20">3</div>
                                <div className="w-[500px]">Karyawan</div>
                                <div className="w-full flex gap-2">
                                    <span className="px-3 py-0.5 bg-blue-500 rounded-md">dashboard</span>
                                    <span className="px-3 py-0.5 bg-blue-500 rounded-md">e-commerce</span>
                                </div>
                                <div className="w-[200px]">
                                    <button>
                                        <IconPencil className="text-yellow-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-full py-3  border-y">
                                <div className="w-20">4</div>
                                <div className="w-[500px]">Guest</div>
                                <div className="w-full flex gap-2">
                                    <span className="px-3 py-0.5 bg-blue-500 rounded-md">dashboard</span>
                                    <span className="px-3 py-0.5 bg-blue-500 rounded-md">e-commerce</span>
                                </div>
                                <div className="w-[200px]">
                                    <button>
                                        <IconPencil className="text-yellow-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive mb-5">
                            <table>
                                <thead>
                                    <tr>
                                        {/* <th>
                                    <input type="checkbox" className="form-checkbox" />
                                </th> */}
                                        <th className="text-lg font-semibold">Nama Jabatan</th>
                                        <th className="text-lg font-semibold">Hak Akses</th>
                                        {/* <th>Sale</th> */}
                                        {/* <th className="!text-center">Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                {/* <td>
                                            <input type="checkbox" className="form-checkbox" />
                                        </td> */}
                                                <td>
                                                    <div className="whitespace-nowrap">{data.name}</div>
                                                </td>
                                                <td>
                                                    <div className="flex grid grid-cols-2">
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Product </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Restock </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Cabang </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Customer </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Penjualan </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Distribusi </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Supplier </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Akun </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Control Panel </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Saldo </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Flow Cash </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Hutang Piutang </span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" className="form-checkbox outline-primary my-2" defaultChecked />
                                                            <span> Laporan </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <form className="space-y-5 panel xl:col-span-1">
                    <h1 className="font-semibold text-xl dark:text-white-light mb-2 justify-center flex">Tambah Index</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="">
                            <label htmlFor="gridTotal" className="text-xl font-medium mr-8">
                                Keterangan:
                            </label>
                            <input id="gridTotal" type="text" placeholder="Keterangan..." defaultValue="Nasi Goreng" className="form-input text-lg" />
                        </div>
                        <div className="space-y-2">
                            <div className="text-xl font-medium">Makan :</div>
                            <div>
                                <label className="inline-flex">
                                    <input type="checkbox" className="form-checkbox outline-info w-6 h-6" />
                                    <span className="text-lg">Pemasukan</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex">
                                    <input type="checkbox" className="form-checkbox outline-info w-6 h-6" />
                                    <span className="text-lg ">Pengeluaran</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex">
                                    <input type="checkbox" defaultChecked className="form-checkbox outline-info w-6 h-6" />
                                    <span className="text-lg">Pengajuan</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary !mt-6 w-full">
                            <IconPlus className="mr-2 " /> Tambah
                        </button>
                    </div>
                </form> */}
                </div>
            </div>
        </>
    );
};

export default HakAkses;
