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

import Swal from 'sweetalert2';
import IconPlus from '../../../components/Icon/IconPlus';
import { useModal } from '../../../hooks/use-modal';
import { Divider } from '@mantine/core';


interface DetailAkunProps {
    id: number;
    detail_acc_code: string;
    detail_acc_type: string;
    account_id: number;
    detail_acc_name: string;
    detail_acc_info: string;
    // branch_address: string;
}


// detail-accounts


const DetailAkun = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') || '';
    const { onOpen } = useModal();

    useEffect(() => {
        dispatch(setPageTitle('Detail Akun'));
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<DetailAkunProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    console.log("initial, records: ", initialRecords, recordsData);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        const id = setInterval(() => {
            axios.get('https://erp.digitalindustryagency.com/api/detail-accounts', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }, 
            }).then(response => {
                const data = response.data.data.resource.data;
                console.log("data :", response.data.data.resource);
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
                return item.detail_acc_code.toLowerCase().includes(search.toLowerCase()) || item.detail_acc_type.toLowerCase().includes(search.toLowerCase())

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
                    <span>Menu Keuangan</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Detail akun </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center">Detail Akun</h1>
                <Link to="/menukeuangan/akun/adddetailakun">
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
                            { accessor: 'detail_acc_code', title: 'Detail Kode Akun', sortable: true },
                            { accessor: 'detail_acc_type', title: 'Detail Type Akun', sortable: true },
                            { accessor: 'detail_acc_name', title: 'Detail Nama Akun', sortable: true },
                                                         
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (row) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <Link to={`/menukeuangan/akun/editdetailakun/${row.id}`}>
                                            <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                        </Link>
                                       
                                        <div style={{ color: 'red' }} onClick={() => onOpen('delete-detail-akun', row.id)}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                        </div>

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

export default DetailAkun;
