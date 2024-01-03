import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link, useNavigate } from 'react-router-dom';
import IconPlus from '../../../components/Icon/IconPlus';
import axios from 'axios';
import { formatPrice } from '../../../utils';
import { useModal } from '../../../hooks/use-modal';

interface SaldoDataProps {
    id: number;
    saldo_amount: number;
    detail_account: {
        detail_acc_code: string;
        detail_acc_type: string;
        detail_acc_name: string;
    };
}

const Saldo = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const { onOpen } = useModal();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Saldo'));
    });
    const [initialRecords, setInitialRecords] = useState<SaldoDataProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

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
            .get('https://erp.digitalindustryagency.com/api/saldos', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const saldo = response.data.data.resource.data;
                setInitialRecords(saldo);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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
                    <span> Saldo </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center">Data Saldo</h1>
                <Link to="/menukeuangan/saldo/addsaldo">
                    <button type="button" className=" px-2 btn btn-outline-info">
                        <IconPlus className="flex mx-2" fill={true} /> Add
                    </button>
                </Link>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
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
                                title: 'Kode Akun',
                                sortable: true,
                            },
                            { accessor: 'detail_account.detail_acc_type', title: 'Jenis Akun', sortable: true },
                            { accessor: 'detail_account.detail_acc_name', title: 'Nama Akun', sortable: true },
                            {
                                accessor: 'saldo_amount',
                                title: 'Saldo Akhir',
                                sortable: true,
                                render: (e) => formatPrice(e.saldo_amount),
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        {/* <button type="button" style={{ color: 'blue' }}>
                                            <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                        </button> */}
                                        {/* <button type="button" style={{ color: 'orange' }}>
                                            <Link to="/menukeuangan/akun/editakun">
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button> */}
                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-saldo', e.id)}>
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
                </div>
            </div>
        </div>
    );
};

export default Saldo;
