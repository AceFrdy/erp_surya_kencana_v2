import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import Pagination from '../../../components/Pagination';
import IconNotes from '../../../components/Icon/IconNotes';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, endpoint, formatPrice } from '../../../utils';

interface PenjualanDataProps {
    id: number;
    sale_report_invoice: string;
    sale_report_customer: string;
    user: {
        id: number;
        name: string;
    };
    branch: {
        id: number;
        branch_name: string;
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
    const [initialRecords, setInitialRecords] = useState<PenjualanDataProps[]>([]);
    const [search, setSearch] = useState('');
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
        const url = `${endpoint}/api/sale-reports${search && page ? '?q=' + search + '&&page=' + page : search ? '?q=' + search : page && '?page=' + page}`;
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const penjualan = response.data.data.resource.data;
                setInitialRecords(penjualan);
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
                    first: response.data.data.resource.links.first,
                    last: response.data.data.resource.links.last,
                    next: response.data.data.resource.links.next,
                    prev: response.data.data.resource.links.prev,
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [search, page]);

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
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">Laporan Penjualan</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
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
                                    <span
                                        className={`badge whitespace-nowrap ${data.sale_report_status === 'lunas' ? 'bg-primary' : data.sale_report_status === 'hutang' ? 'bg-danger' : 'bg-success'}`}
                                    >
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

export default LaporanPenjualan;
