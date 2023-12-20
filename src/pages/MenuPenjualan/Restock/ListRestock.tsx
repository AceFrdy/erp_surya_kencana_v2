import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import { Link, useNavigate } from 'react-router-dom';
import IconNotes from '../../../components/Icon/IconNotes';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, formatPrice } from '../../../utils';
import IconArchive from '../../../components/Icon/IconArchive';

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

interface SuplierProps {
    id: number;
    suplier_name: string;
}

const ListRestock = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Restock'));
    });
    const [initialRecords, setInitialRecords] = useState<DataInitial[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const navigate = useNavigate();

    const handleFinished = (idRestock: number) => {
        axios
            .post(
                `https://erp.digitalindustryagency.com/api/distribution-reports-approved-restok/${idRestock}`,
                {},
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                navigate(0);
            });
    };

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/distribution-report-restoks');

    // get distribution report
    useEffect(() => {
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
    }, [url]);

    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return (
                    item.distribution_report_code.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.suplier.suplier_name.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
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
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => recordsData.indexOf(e) + 1 },
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
                                            <Link to={`/menupenjualan/restock/detailrestock/${e.id}`}>
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <form className="flex items-center" onSubmit={() => {}}>
                                            <button type="submit" style={{ color: 'blue' }}>
                                                <IconArchive className="ltr:mr-2 rtl:ml-2 " />
                                            </button>
                                        </form>
                                    </div>
                                ),
                            },
                        ]}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                    />
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}
                </div>
            </div>
        </div>
    );
};

export default ListRestock;
