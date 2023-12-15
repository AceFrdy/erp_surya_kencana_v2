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
    const [initialRecords, setInitialRecords] = useState<AkunDataProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    console.log("initial, records: ", initialRecords, recordsData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);


    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // Fungsi untuk memuat data dari API

    useEffect(() => {
        const id = setInterval(() => {
            axios.get('https://erp.digitalindustryagency.com/api/accounts', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                const data = response.data.data.resource.data;
                // console.log("data :", response.data.data.resource);
                setInitialRecords(data);

            })
            .catch((error:any) => {
                console.error('Error fetching data:', error);

            }) 
        

        }, 2000)
        return () => clearInterval(id);
    }, [initialRecords]);



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
                return item.acc_code.toLowerCase().includes(search.toLowerCase()) || item.acc_type.toLowerCase().includes(search.toLowerCase())

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
                            { accessor: 'acc_group_name', title: 'Group Akun', sortable: true },

                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (row) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'blue' }}>
                                            <Link to={`/menukeuangan/akun/detailakun`}>
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <Link to={`/menukeuangan/akun/editakun/${row.id}`}>
                                            <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                        </Link>
                                       
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