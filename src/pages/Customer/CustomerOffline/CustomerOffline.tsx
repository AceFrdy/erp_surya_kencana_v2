import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
import IconPlus from '../../../components/Icon/IconPlus';
import axios from 'axios';
import { orderBy } from 'lodash';
import { useModal } from '../../../hooks/use-modal';

interface CustomersDataProps {
    id: number;
    name: string;
    contact: number;
    address: string;
}

const CustomerOffline = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Customer Offline'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const [initialRecords, setInitialRecords] = useState<CustomersDataProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const { onOpen } = useModal();

    useEffect(() => {
        const id = setInterval(() => {
            axios
                .get('https://erp.digitalindustryagency.com/api/customers-offline', {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setInitialRecords(orderBy(response.data.data.resource, 'created_at', 'desc'));
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, 2000);
        return () => clearInterval(id);
    }, [initialRecords]);

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
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.address.toLowerCase().includes(search.toLowerCase()) || item.contact.toString().includes(search.toLowerCase());
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, recordsData]);

    useEffect(() => {
        const data = orderBy(initialRecords, sortStatus.columnAccessor, 'desc');
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
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
                    <span>Customer</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Customer Offline</span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <Link to="/customer/offline/tambah-customer-offline">
                        <button type="button" className=" px-2 btn btn-outline-info">
                            <IconPlus className="flex mx-2" fill={true} /> Add
                        </button>
                    </Link>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Customer</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'index', title: 'No', render: (e) => recordsData.indexOf(e) + 1 },
                            { accessor: 'name', title: 'Nama Customer', sortable: true },
                            {
                                accessor: 'address',
                                title: 'Address',
                                sortable: true,
                            },
                            { accessor: 'contact', title: 'No HP', sortable: true },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'orange' }}>
                                            <Link to={`/customer/offline/edit-customer-offline/${e.id}`}>
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-customer-offline', e.id)}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                        </button>
                                    </div>
                                ),
                            },
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

export default CustomerOffline;
