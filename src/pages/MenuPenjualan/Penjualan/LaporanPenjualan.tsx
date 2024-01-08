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
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, formatPrice } from '../../../utils';
import Pagination from '../../../components/Pagination';

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
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/sale-reports');

    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return (
                    item.sale_report_invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.sale_report_customer.toLowerCase().includes(search.toLowerCase()) ||
                    item.sale_report_status.toLowerCase().includes(search.toLowerCase()) ||
                    item.branch.branch_name.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search, recordsData]);

    useEffect(() => {
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
                    current_page: response.data.data.resource.meta.current_page,
                    last_page: response.data.data.resource.meta.last_page,
                    from: response.data.data.resource.meta.from,
                    to: response.data.data.resource.meta.to,
                    per_page: response.data.data.resource.meta.per_page,
                    total: response.data.data.resource.meta.total,
                });
                setMetaLinksLink(response.data.data.resource.meta.links);
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
    }, [url, token]);

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
                                        {/* <button type="button" style={{ color: 'red' }} onClick={() => showAlert(11)}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                        </button> */}
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

export default LaporanPenjualan;
