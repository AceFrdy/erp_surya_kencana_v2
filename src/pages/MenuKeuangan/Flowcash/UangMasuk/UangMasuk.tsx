import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconTrashLines from '../../../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
import IconNotes from '../../../../components/Icon/IconNotes';
import IconPlus from '../../../../components/Icon/IconPlus';
import axios from 'axios';
import { useModal } from '../../../../hooks/use-modal';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps } from '../../../../utils';
import Pagination from '../../../../components/Pagination';

interface InflowDataProps {
    id: number;
    cash_inflow_date: string;
    cash_inflow_amount: number;
    cash_inflow_info: string;
    detail_account: {
        detail_acc_code: string;
        detail_acc_type: string;
        detail_acc_name: string;
    };
}

const UangMasuk = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Uang Masuk'));
    });
    const [initialRecords, setInitialRecords] = useState<InflowDataProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const { onOpen } = useModal();
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/cash-inflows');

    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return (
                    item.detail_account?.detail_acc_code.toLowerCase().includes(search.toLowerCase()) ||
                    item.detail_account?.detail_acc_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.detail_account?.detail_acc_type.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const inflows = response.data.data.resource.data;
                setInitialRecords(inflows);
                setRecordsData(inflows);
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
    }, [url]);

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
                <h1 className="text-lg font-bold flex justify-center">Data Uang Masuk</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <Link to="/menukeuangan/flowcash/adduangmasuk">
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
                                accessor: 'detail_account.detail_acc_code',
                                title: 'Kode Detail Akun',
                                sortable: true,
                            },
                            { accessor: 'detail_account.detail_acc_name', title: 'Index', sortable: true },
                            { accessor: 'cash_inflow_info', title: 'Keterangan', sortable: true },
                            { accessor: 'cash_inflow_amount', title: 'Cash', sortable: true },
                            {
                                accessor: 'cash_inflow_date',
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
                                            <Link to={`/menukeuangan/flowcash/detailuangmasuk/${e.id}`}>
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        {/* <button type="button" style={{ color: 'orange' }}>
                                                <Link to="/menupenjualan/restock/editrestock">
                                                    <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                                </Link>
                                            </button> */}
                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-inflow-cash', e.id)}>
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

export default UangMasuk;
