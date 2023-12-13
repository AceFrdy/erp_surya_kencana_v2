import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import IconNotes from '../../../components/Icon/IconNotes';
import axios from 'axios';

interface DataInitial {
    id: number;
    distribution_report_code: string;
    branch: {
        branch_name: string;
    };
    items_total: number;
    status: string;
}
const LaporanDistribusi = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Laporan Distribusi'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const [initialRecords, setInitialRecords] = useState<DataInitial[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // get distribution report
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/distribution-reports', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('GET DISTRIBRUTION REPORT', err.message);
            });
    }, []);

    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setInitialRecords(() => {
            return initialRecords.filter((item) => {
                return (
                    item.distribution_report_code.toLowerCase().includes(search.toLowerCase()) ||
                    item.branch.branch_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, recordsData]);

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
                    <span> Laporan Distribusi </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">Laporan Distribution</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'index', title: 'No', render: (e) => recordsData.indexOf(e) + 1 },
                            { accessor: 'distribution_report_code', title: 'No Dokumen', sortable: true },
                            {
                                accessor: 'branch.branch_name',
                                title: 'Tujuan Cabang',
                                sortable: true,
                            },
                            { accessor: 'items_total', title: 'Jumlah Barang', sortable: true },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (data) => (
                                    <span
                                        className={`badge whitespace-nowrap ${
                                            data.status === 'completed'
                                                ? 'bg-primary   '
                                                : data.status === 'Pending'
                                                ? 'bg-secondary'
                                                : data.status === 'In Progress'
                                                ? 'bg-success'
                                                : data.status === 'Canceled'
                                                ? 'bg-danger'
                                                : 'bg-primary'
                                        }`}
                                    >
                                        {data.status}
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
                                            <Link to={`/menupenjualan/distribution/detaildistribution/${e.id}`}>
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
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

export default LaporanDistribusi;
