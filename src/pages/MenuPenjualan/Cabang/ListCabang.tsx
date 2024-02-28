import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { useModal } from '../../../hooks/use-modal';
import Pagination from '../../../components/Pagination';
import IconPlus from '../../../components/Icon/IconPlus';
import IconPencil from '../../../components/Icon/IconPencil';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, endpoint } from '../../../utils';

import 'react-toastify/dist/ReactToastify.css';

interface BranchDataProps {
    id: number;
    branch_name: string;
    branch_contact: number;
    branch_address: string;
}

const ListCabang = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('List Cabang'));
    });
    const [initialRecords, setInitialRecords] = useState<BranchDataProps[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const { onOpen } = useModal();

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    // get branch
    useEffect(() => {
        const url = `${endpoint}/api/branches${search && page ? '?q=' + search + '&&page=' + page : search ? '?q=' + search : page && '?page=' + page}`;
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const branch = response.data.data.resource.data;
                setInitialRecords(branch);
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
    }, [search, page]);

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
                    <span> Cabang </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <Link to="/menupenjualan/cabang/listcabang/addcabang">
                        <button type="button" className=" px-2 btn btn-outline-info">
                            <IconPlus className="flex mx-2" fill={true} /> Add
                        </button>
                    </Link>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Cabang</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', render: (e) => initialRecords.indexOf(e) + 1 },
                            { accessor: 'branch_name', title: 'Nama Cabang', sortable: true },
                            {
                                accessor: 'branch_address',
                                title: 'Address',
                                sortable: true,
                            },
                            { accessor: 'branch_contact', title: 'No HP', sortable: true },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'orange' }}>
                                            <Link to={`/menupenjualan/cabang/listcabang/editcabang/${e.id}`}>
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-cabang', e.id)}>
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
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setPage} />}
                </div>
            </div>
        </div>
    );
};

export default ListCabang;
