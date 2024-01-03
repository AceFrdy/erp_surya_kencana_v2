import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconTrashLines from '../../../../components/Icon/IconTrashLines';
import { Link, useParams } from 'react-router-dom';
import 'flatpickr/dist/flatpickr.css';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import axios from 'axios';
import { formatPrice } from '../../../../utils';

interface DebtPayDataProps {
    id: number;
    payment_date: string;
    debt_id: number;
    payment_total: number;
    debt_unpaid: number;
}

const DetailHutang = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Detail Hutang'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<DebtPayDataProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [locationAcc, setLocationAcc] = useState<string>('');
    const [directionAcc, setDirectionAcc] = useState<string>('');
    const [debtDate, setDebtDate] = useState<string>('');
    const [debtBalance, setDebtBalance] = useState<number>(0);
    const [creditureName, setCreditureName] = useState<string>('');
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
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.payment_date.toLowerCase().includes(search.toLowerCase()) ||
                    item.debt_id.toString().includes(search.toLowerCase()) ||
                    item.payment_total.toString().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
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

    const fetchData = () => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/debts/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setLocationAcc(response.data.data.resource.location_acc.detail_acc_name);
                setDirectionAcc(response.data.data.resource.direction_acc.detail_acc_name);
                setDebtBalance(response.data.data.resource.debt_balance);
                setDebtDate(response.data.data.resource.debt_date);
                setCreditureName(response.data.data.resource.creditur_name);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios
            .get(`https://erp.digitalindustryagency.com/api/debt-pays/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [token]);

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
                    <span> Detail Hutang </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex mb-4 justify-end">
                    <Link to="/menukeuangan/hutang-piutang/hutang">
                        <button type="button" className="btn btn-outline-primary">
                            <IconArrowBackward className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                            Kembali
                        </button>
                    </Link>
                </div>
                <div className="panel">
                    <h1 className="text-xl font-bold mb-6">Detail Data Hutang</h1>
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="Cost">Akun Asal</label>
                            <input id="Cost" disabled type="text" value={locationAcc} placeholder="Keterangan..." className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Cost">Akun Tujuan</label>
                            <input id="Cost" disabled type="text" value={directionAcc} placeholder="Keterangan..." className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Cost">Total Nominal</label>
                            <input id="Cost" disabled type="text" value={debtBalance} placeholder="Rp." className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Cost">Kreditur</label>
                            <input id="Cost" disabled type="text" value={creditureName} placeholder="Keterangan..." className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Tanggal">Tanggal</label>
                            <input id="Cost" disabled type="date" value={debtDate} placeholder="Keterangan..." className="form-input" />
                        </div>
                    </form>
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mt-8">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <h5 className="font-semibold text-lg dark:text-white-light mb-2">Table Hutang</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            { accessor: 'payment_total', title: 'Bayar', sortable: true, render: (e) => formatPrice(e.payment_total) },
                            {
                                accessor: 'payment_date',
                                title: 'Tanggal',
                                sortable: true,
                            },
                            { accessor: 'debt_unpaid', title: 'Sisa', sortable: true, render: (e) => formatPrice(e.debt_unpaid) },
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

export default DetailHutang;
