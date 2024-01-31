import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { setPageTitle } from '../../../store/themeConfigSlice';
import IconNotes from '../../../components/Icon/IconNotes';

import 'react-toastify/dist/ReactToastify.css';

interface CustomersDataProps {
    id: number;
    name: string;
    contact: number;
    address: string;
}

const CustomerOnline = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Customer Online'));
    });
    const [initialRecords, setInitialRecords] = useState<CustomersDataProps[]>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        const url = `https://erp.digitalindustryagency.com/api/customers-online${search && '?q=' + search}`;
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [search]);

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
    });

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
                    <span> Customer Online</span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Customer</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'index', title: 'No', render: (e) => initialRecords.indexOf(e) + 1 },
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
                                        <button type="button" style={{ color: 'blue' }}>
                                            <Link to={`/customer/online/detailcustomeronline/${e.id}`}>
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
                </div>
            </div>
        </div>
    );
};

export default CustomerOnline;
