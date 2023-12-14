import axios from 'axios';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
// import IconBell from '../../../components/Icon/IconBell';
// import IconXCircle from '../../../components/Icon/IconXCircle';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
// import { Dialog, Transition } from '@headlessui/react';
// import IconPlus from '../../../components/Icon/IconPlus';
import IconNotes from '../../../components/Icon/IconNotes';
import Swal from 'sweetalert2';
// import IconSend from '../../../components/Icon/IconSend';
import IconPlus from '../../../components/Icon/IconPlus';
// import * as Yup from 'yup';
// import { Field, Form, Formik } from 'formik';
import { useModal } from '../../../hooks/use-modal';



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

interface AkunDataProps {
    id: number;
    acc_code: string;
    acc_type: string;
    acc_group_name: string;
    acc_info: string;
    // branch_address: string;
}

const Akun = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') || '';
    const { onOpen } = useModal();


    useEffect(() => {
        dispatch(setPageTitle('Akun'));
    });

    // State untuk menyimpan data dari API
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState([]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);


    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // Fungsi untuk memuat data dari API
    const fetchData = async () => {
        try {
            const response = await axios.get('https://erp.digitalindustryagency.com/api/accounts', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.data.resource.data;
            setInitialRecords(data);
            // setRecordsData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            fetchData();

        }, 2000)
        return () => clearInterval(id);
    }, [initialRecords]);
    const handleDelete = async (id) => {
        const confirmed = await Swal.fire({
            title: 'Hapus Akun',
            text: "Apakah Anda Yakin Ingin Menghapus Akun?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Kembali',
            reverseButtons: true,
        });

        if (confirmed.value) {
            try {
                const response = await axios.delete(`https://erp.digitalindustryagency.com/api/accounts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                Swal.fire('Deleted!', 'The account has been deleted.', 'success');

                setRecordsData(prevRecords => prevRecords.filter(record => record.id !== id));
            } catch (error) {
                console.error('Error deleting the account:', error);
                Swal.fire('Cancelled', 'There was an error deleting the account.', 'error');
            }
        }
    };


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
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.acc_code.toLowerCase().includes(search.toLowerCase()) ||
                    item.acc_type.toLowerCase().includes(search.toLowerCase())

                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, initialRecords]);

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

    const [cost, setCost] = useState('');

    const handleCostChange = (e: { target: { value: any } }) => {
        const inputValue = e.target.value;
        let formatValue = '';

        // Remove non-numeric characters
        const numValue = inputValue.replace(/\D/g, '');

        // Format the number with 'Rp.' prefix
        if (numValue !== '') {
            formatValue = `Rp. ${parseInt(numValue, 10).toLocaleString('id-ID')}`;
        }

        setCost(formatValue);
    };


    return (
        <div>
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
                    <span> Penjualan </span>
                </li>

            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center">Akun</h1>
                <Link to="/menukeuangan/akun/addakun">
                    <button type="button" className=" px-2 btn btn-outline-info">
                        <IconPlus className="flex mx-2" fill={true} /> Add
                    </button>
                </Link>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">

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
                            { accessor: 'acc_code', title: 'Kode Akun', sortable: true },
                            { accessor: 'acc_type', title: 'Jenis Akun', sortable: true },

                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (row) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'blue' }}>
                                            <Link to="/menukeuangan/akun/detailakun">
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <Link to={`/menukeuangan/akun/editakun/${row.id}`}>
                                            <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                        </Link>
                                        {/* <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-akun', row.id)}> */}
                                        {/* <button type="button" style={{ color: 'red' }} onClick={() => handleDelete(row.id)}> */}
                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-akun', row.id)}>
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

export default Akun;
