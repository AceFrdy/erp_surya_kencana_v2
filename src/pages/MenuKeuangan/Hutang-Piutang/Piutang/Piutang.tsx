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
import IconPencil from '../../../../components/Icon/IconPencil';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps } from '../../../../utils';

import 'react-toastify/dist/ReactToastify.css';
import IconTrashLines from '../../../../components/Icon/IconTrashLines';
import { useModal } from '../../../../hooks/use-modal';

interface DataProps {
    id: number;
    receivable_code: string;
    debitur_name: string;
    receivable_balance: number;
    receivable_date: string;
    receivable_status: string;
}

const Piutang = () => {
    const { onOpen } = useModal();
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const [initialRecords, setInitialRecords] = useState<DataProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/receivables');

    // get_data
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
                console.log('ERROR_GETTING_PIUTANG:', err.message);
            });
    }, [url]);

    // handle_search
    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return (
                    item.receivable_code.includes(search.toLowerCase()) ||
                    item.debitur_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.receivable_date.toLowerCase().includes(search.toLowerCase()) ||
                    item.receivable_status.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, recordsData]);

    // handle_sort
    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    // handle_title_page
    useEffect(() => {
        dispatch(setPageTitle('Piutang'));
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
                    <span> Piutang </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center">List Piutang</h1>
                <div className="flex md:items-center md:flex-row flex-col my-8 gap-5">
                    <Link to="/menukeuangan/hutang-piutang/addpiutang">
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
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => recordsData.indexOf(e) + 1 },
                            {
                                accessor: 'receivable_code',
                                title: 'Kode Debitur',
                                sortable: true,
                            },
                            {
                                accessor: 'debitur_name',
                                title: 'Nama Debitur',
                                sortable: true,
                            },
                            { accessor: 'receivable_balance', title: 'Nominal', sortable: true },
                            {
                                accessor: 'receivable_date',
                                title: 'Tanggal',
                                sortable: true,
                            },
                            {
                                accessor: 'receivable_status',
                                title: 'Status',
                                sortable: true,
                                render: (rowData) => (
                                    <span className={`badge whitespace-nowrap ${rowData.receivable_status === 'Belum Lunas' ? 'bg-red-500' : 'bg-green-500'}`}>{rowData.receivable_status}</span>
                                ),
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'blue' }}>
                                            <Link to={`/menukeuangan/hutang-piutang/detailpiutang/${e.id}`}>
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <button type="button" style={{ color: 'orange' }}>
                                            <Link to={`/menukeuangan/hutang-piutang/editpiutang/${e.id}`}>
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-piutang', e.id)}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                        </button>
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

export default Piutang;
