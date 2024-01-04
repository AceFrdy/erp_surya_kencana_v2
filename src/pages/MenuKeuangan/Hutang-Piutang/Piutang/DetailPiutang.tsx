import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import axios from 'axios';
import { formatPrice } from '../../../../utils';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { sortBy } from 'lodash';
import IconTrashLines from '../../../../components/Icon/IconTrashLines';

interface DataProps {
    direction_acc: {
        detail_acc_name: string;
    };
    location_acc: {
        detail_acc_name: string;
    };
    receivable_balance: number;
    receivable_code: string;
    receivable_date: string;
    receivable_status: string;
    receivable_unpaid: number;
    debitur_name: string;
    payment_amount: number;
}

interface PaysProps {
    id: number;
    payment_date: string;
    payment_total: number;
}

const DetailPiutang = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Piutang'));
    });
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const { id } = useParams();
    const [initialRecords, setInitialRecords] = useState<PaysProps[]>([]);
    const [data, setData] = useState<DataProps>({
        debitur_name: '',
        direction_acc: {
            detail_acc_name: '',
        },
        location_acc: {
            detail_acc_name: '',
        },
        receivable_balance: 0,
        receivable_code: '',
        receivable_date: '',
        receivable_status: '',
        receivable_unpaid: 0,
        payment_amount: 0,
    });
    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/receivables/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.data.resource);
                setData(response.data.data.resource);
                setInitialRecords(response.data.data.resource.receivable_pays);
            })
            .catch((err: any) => {
                console.log('ERROR_GET_DETAIL_PIUTANG', err.message);
            });
    }, []);

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
                    <span>Menu Keuangan</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Detail Piutang </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">Detail Piutang: {data.receivable_code}</h1>
                        <span className={`badge whitespace-nowrap h-auto ml-2 ${data.receivable_status === 'Belum Lunas' ? 'bg-red-500' : 'bg-green-500'}`}>{data.receivable_status}</span>
                    </div>
                    <Link to="/menukeuangan/hutang-piutang/piutang">
                        <button type="button" className="btn btn-outline-primary">
                            <IconArrowBackward className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                            Kembali
                        </button>
                    </Link>
                </div>
                <div className="panel mb-8">
                    <div className="space-y-5 flex flex-col w-full">
                        <div className="space-x-5 flex w-full">
                            <div className="w-full">
                                <label htmlFor="direction_acc">Akun Asal</label>
                                <input id="direction_acc" name="direction_acc" disabled type="text" value={data.direction_acc.detail_acc_name} className="form-input" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="debitur_name">Debitur</label>
                                <input id="debitur_name" name="debitur_name" disabled type="text" value={data.debitur_name} className="form-input" />
                            </div>
                        </div>
                        <div className="space-x-5 flex w-full">
                            <div className="w-full">
                                <label htmlFor="location_acc">Akun Tujuan</label>
                                <input id="location_acc" name="location_acc" disabled type="text" value={data.location_acc.detail_acc_name} className="form-input" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="receivable_date">Tanggal</label>
                                <input id="receivable_date" name="receivable_date" disabled type="text" value={data.receivable_date} className="form-input" />
                            </div>
                        </div>
                        <div className="flex w-full space-x-5">
                            <div className="w-full">
                                <label htmlFor="receivable_balance">Total Piutang</label>
                                <input id="receivable_balance" name="receivable_balance" disabled type="text" value={formatPrice(data.receivable_balance)} className="form-input" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="payment_amount">Total Dibayar</label>
                                <input id="payment_amount" name="payment_amount" disabled type="text" value={formatPrice(data.payment_amount)} className="form-input" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="receivable_unpaid">Total Belum Dibayar</label>
                                <input id="receivable_unpaid" name="receivable_unpaid" disabled type="text" value={formatPrice(data.receivable_unpaid)} className="form-input" />
                            </div>
                        </div>
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Pembayaran Piutang</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true },
                            {
                                accessor: 'payment_total',
                                title: 'Nominal',
                                sortable: true,
                                render: ({ payment_total }) => <div>{formatPrice(payment_total)}</div>,
                            },
                            { accessor: 'payment_date', title: 'Tanggal', sortable: true },
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

export default DetailPiutang;
