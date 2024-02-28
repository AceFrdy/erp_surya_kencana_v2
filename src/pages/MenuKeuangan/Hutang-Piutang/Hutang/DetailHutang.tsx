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
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, endpoint, formatPrice } from '../../../../utils';
import Pagination from '../../../../components/Pagination';

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
    const [initialRecords, setInitialRecords] = useState<DebtPayDataProps[]>([]);
    const [locationAcc, setLocationAcc] = useState<string>('');
    const [directionAcc, setDirectionAcc] = useState<string>('');
    const [debtDate, setDebtDate] = useState<string>('');
    const [debtBalance, setDebtBalance] = useState<number>(0);
    const [creditureName, setCreditureName] = useState<string>('');
    const [page, setPage] = useState('');
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
        const url = `${endpoint}/api/debt-pays/${id + (page && '?page=' + page)}`;
        axios
            .get(`${endpoint}/api/debts/${id}`, {
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
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.data);
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
    }, [page]);

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

                <h5 className="font-semibold text-lg dark:text-white-light mt-6 mb-2">Table Hutang</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
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

export default DetailHutang;
