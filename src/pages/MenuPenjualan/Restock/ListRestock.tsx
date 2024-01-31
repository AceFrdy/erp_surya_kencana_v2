import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import Pagination from '../../../components/Pagination';
import { useModal } from '../../../hooks/use-modal';
import IconNotes from '../../../components/Icon/IconNotes';
import IconArchive from '../../../components/Icon/IconArchive';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, formatPrice } from '../../../utils';

import 'react-toastify/dist/ReactToastify.css';

interface DataInitial {
    id: number;
    distribution_report_code: string;
    suplier: {
        id: number;
        suplier_name: string;
    };
    operating_cost: number;
    items_total: number;
    grand_total_price: number;
    status: string;
}

const ListRestock = () => {
    const dispatch = useDispatch();
    const { onOpen } = useModal();
    useEffect(() => {
        dispatch(setPageTitle('List Restock'));
    });
    const [initialRecords, setInitialRecords] = useState<DataInitial[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    // get distribution report
    useEffect(() => {
        const url = `https://erp.digitalindustryagency.com/api/distribution-report-restoks${search && page ? '?q=' + search + '&&page=' + page : search ? '?q=' + search : page && '?page=' + page}`;
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
            .catch((err: any) => {
                console.log('GET DISTRIBRUTION REPORT', err.message);
            });
    }, [search, page]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    useEffect(() => {
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { title, log, type, message } = JSON.parse(notificationMessage);
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
                console.log(title, log);
            }
        }
        return localStorage.removeItem('notification');
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
                    <span> List Restock </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Restock</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            { accessor: 'distribution_report_code', title: 'Kode Dokumen', sortable: true },
                            {
                                accessor: 'suplier.suplier_name',
                                title: 'Supplier',
                                sortable: true,
                            },
                            { accessor: 'operating_cost', title: 'Operasional', sortable: true, render: (e) => formatPrice(e.operating_cost) },
                            {
                                accessor: 'items_total',
                                title: 'Distribution Qty',
                                sortable: true,
                                textAlignment: 'center',
                            },
                            { accessor: 'grand_total_price', title: 'Total', sortable: true, render: (e) => formatPrice(e.grand_total_price) },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (data) => (
                                    <span className={`badge whitespace-nowrap ${data.status === 'selesai' ? 'bg-primary' : data.status === 'pending' ? 'bg-secondary' : 'bg-success'}`}>
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
                                            <Link to={`/menupenjualan/restock/detailrestock/${e.id}`}>
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        {e.status !== 'selesai' && (
                                            <button type="submit" style={{ color: 'blue' }} onClick={() => onOpen('finish-restock', e.id)}>
                                                <IconArchive className="ltr:mr-2 rtl:ml-2 " />
                                            </button>
                                        )}
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

export default ListRestock;
