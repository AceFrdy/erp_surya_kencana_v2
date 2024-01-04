import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import { Link } from 'react-router-dom';
import IconNotes from '../../../components/Icon/IconNotes';
import Swal from 'sweetalert2';
import axios from 'axios';
import { formatPrice } from '../../../utils';

interface PenjualanDataProps {
    id: number;
    sale_order_invoice: string;
    user: {
        id: number;
        name: string;
    };
    branch: {
        id: number;
        name: string;
    };
    sale_report_status: string;
    sale_report_money: number;
    sale_report_total_items: number;
}

const LaporanPenjualan = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') || '';
    useEffect(() => {
        dispatch(setPageTitle('Laporan Penjualan'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<PenjualanDataProps[]>([]);
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
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return (
                    // item.sale_order_invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.user.name.toLowerCase().includes(search.toLowerCase())
                    // item.branch.name.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search, recordsData]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/sale-reports', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const penjualan = response.data.data.resource.data;
                setInitialRecords(penjualan);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
                    <span> Laporan Penjualan </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <Link to="/menupenjualan/cabang/listcabang/addcabang">
                        <button type="button" className=" px-2 btn btn-outline-info">
                            <IconPlus className="flex mx-2" fill={true} /> Add
                        </button>
                    </Link> */}
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />{' '}
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">Laporan Penjualan</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => recordsData.indexOf(e) + 1 },
                            { accessor: 'sale_report_invoice', title: 'Kode Penjualan', sortable: true },
                            {
                                accessor: 'sale_report_customer',
                                title: 'Customer',
                                sortable: true,
                            },
                            { accessor: 'branch.branch_name', title: 'Cabang', sortable: true },
                            { accessor: 'sale_report_total_items', title: 'Qty Barang', sortable: true },
                            { accessor: 'sale_report_money', title: 'Total', sortable: true, render: (e) => formatPrice(e.sale_report_money) },
                            {
                                accessor: 'sale_report_status',
                                title: 'Status',
                                sortable: true,
                                render: (data) => (
                                    <span className={`badge whitespace-nowrap ${data.sale_report_status === 'lunas' ? 'bg-primary' : data.sale_report_status === 'hutang' ? 'bg-danger' : 'bg-success'}`}>
                                        {data.sale_report_status}
                                    </span>
                                ),
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'blue' }}>
                                            <Link to={`/menupenjualan/penjualan/detailpenjualan/${e.id}`}>
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        {/* <button type="button" style={{ color: 'red' }} onClick={() => showAlert(11)}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                        </button> */}
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

export default LaporanPenjualan;
