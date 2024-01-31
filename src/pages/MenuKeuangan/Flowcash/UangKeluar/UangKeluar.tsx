import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import Pagination from '../../../../components/Pagination';
import IconPlus from '../../../../components/Icon/IconPlus';
import IconNotes from '../../../../components/Icon/IconNotes';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, formatPrice } from '../../../../utils';

import 'react-toastify/dist/ReactToastify.css';

interface DataProps {
    id: number;
    detail_account: {
        detail_acc_code: string;
    };
    index: {
        index_info: string;
    };
    cash_outflow_date: string;
    cash_outflow_total: number;
    cash_outflow_name: string;
}

const UangKeluar = () => {
    const dispatch = useDispatch();
    const [initialRecords, setInitialRecords] = useState<DataProps[]>([]);

    const [page, setPage] = useState('');
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';

    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    // get_data
    useEffect(() => {
        const url = `https://erp.digitalindustryagency.com/api/cash-outflows${search && page ? '?q=' + search + '&&page=' + page : search ? '?q=' + search : page && '?page=' + page}`;
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
            });
    }, [page, search]);

    // handle_sort
    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    // handle_page_title
    useEffect(() => {
        dispatch(setPageTitle('Uang Keluar'));
    }, []);

    // handle_notif
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
                    <span>Menu Keuangan</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Flow Cash </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center">Data Uang Keluar</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <Link to="/menukeuangan/flowcash/adduangkeluar">
                        <button type="button" className=" px-2 btn btn-outline-info">
                            <IconPlus className="flex mx-2" fill={true} /> Add
                        </button>
                    </Link>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            {
                                accessor: 'detail_account.detail_acc_code',
                                title: 'Kode Detail Akun',
                                sortable: true,
                            },
                            { accessor: 'index.index_info', title: 'Index', sortable: true },
                            { accessor: 'cash_outflow_name', title: 'Name', sortable: true },
                            {
                                accessor: 'cash_outflow_total',
                                title: 'Nominal',
                                sortable: true,
                                render: ({ cash_outflow_total }) => formatPrice(cash_outflow_total),
                            },
                            {
                                accessor: 'cash_outflow_date',
                                title: 'Tanggal',
                                sortable: true,
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'blue' }}>
                                            <Link to={`/menukeuangan/flowcash/detailuangkeluar/${e.id}`}>
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

export default UangKeluar;
