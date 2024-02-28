import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { endpoint, formatPrice } from '../../../../utils';
import { useModal } from '../../../../hooks/use-modal';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconTrashLines from '../../../../components/Icon/IconTrashLines';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';

import 'react-toastify/dist/ReactToastify.css';

interface PiutangProps {
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

interface PaidProps {
    id: number;
    payment_date: string;
    payment_total: number;
}

interface FormProps {
    payment_date: string;
    payment_total: number;
}

const EditPiutang = () => {
    const { id } = useParams();
    const { onOpen } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [initialRecords, setInitialRecords] = useState<PaidProps[]>([]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const [dataPiutang, setDataPiutang] = useState<PiutangProps>({
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

    const [formData, setFormData] = useState<FormProps>({
        payment_date: '',
        payment_total: 0,
    });

    // handle_change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value, type } = e.target;
        if (type === 'number') {
            setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // handle_submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            receivable_id: parseFloat(id ?? ''),
            payment_date: formData.payment_date,
            payment_total: formData.payment_total,
        };
        axios
            .post(`${endpoint}/api/receivable-pay`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Piutang Berhasil Dibayar',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    payment_date: formData.payment_date,
                    payment_total: formData.payment_total,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Piutang Gagal Dibayar',
                    log: err.message,
                    title: 'ERROR_BAYAR_PIUTANG',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    // get_data
    useEffect(() => {
        axios
            .get(`${endpoint}/api/receivables/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDataPiutang(response.data.data.resource);
                setInitialRecords(response.data.data.resource.receivable_pays);
                console.log(response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('ERROR_GETTING_DATA:', err.message);
            });
    }, []);

    // handle_sort
    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    // handle_title_page
    useEffect(() => {
        dispatch(setPageTitle('Edit Piutang'));
    }, []);

    // handle_notif
    useEffect(() => {
        const isOldValue = sessionStorage.getItem('old_value');
        if (isOldValue) {
            const oldValue = JSON.parse(isOldValue);
            setFormData(oldValue);

            return sessionStorage.removeItem('old_value');
        }
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { title, log, type, message } = JSON.parse(notificationMessage);
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
                console.log(title, log);
            }
            return localStorage.removeItem('notification');
        }
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
                    <span> Edit Data Piutang </span>
                </li>
            </ul>
            <div className="panel mt-6 ">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">Edit Piutang: {dataPiutang.receivable_code}</h1>
                        <span className={`badge whitespace-nowrap h-auto ml-2 ${dataPiutang.receivable_status === 'Belum Lunas' ? 'bg-red-500' : 'bg-green-500'}`}>
                            {dataPiutang.receivable_status}
                        </span>
                    </div>
                    <Link to="/menukeuangan/hutang-piutang/piutang">
                        <button type="button" className="btn btn-outline-primary">
                            <IconArrowBackward className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                            Kembali
                        </button>
                    </Link>
                </div>
                <div className="space-y-5 mb-8">
                    <div className="space-x-5 flex w-full">
                        <div className="w-full">
                            <label htmlFor="direction_acc">Akun Asal</label>
                            <input id="direction_acc" name="direction_acc" disabled type="text" value={dataPiutang.direction_acc.detail_acc_name} className="form-input" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="debitur_name">Debitur</label>
                            <input id="debitur_name" name="debitur_name" disabled type="text" value={dataPiutang.debitur_name} className="form-input" />
                        </div>
                    </div>
                    <div className="space-x-5 flex w-full">
                        <div className="w-full">
                            <label htmlFor="location_acc">Akun Tujuan</label>
                            <input id="location_acc" name="location_acc" disabled type="text" value={dataPiutang.location_acc.detail_acc_name} className="form-input" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="receivable_date">Tanggal</label>
                            <input id="receivable_date" name="receivable_date" disabled type="text" value={dataPiutang.receivable_date} className="form-input" />
                        </div>
                    </div>
                    <div className="flex w-full space-x-5">
                        <div className="w-full">
                            <label htmlFor="receivable_balance">Total Piutang</label>
                            <input id="receivable_balance" name="receivable_balance" disabled type="text" value={formatPrice(dataPiutang.receivable_balance)} className="form-input" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="payment_amount">Total Dibayar</label>
                            <input id="payment_amount" name="payment_amount" disabled type="text" value={formatPrice(dataPiutang.payment_amount)} className="form-input" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="receivable_unpaid">Total Belum Dibayar</label>
                            <input id="receivable_unpaid" name="receivable_unpaid" disabled type="text" value={formatPrice(dataPiutang.receivable_unpaid)} className="form-input" />
                        </div>
                    </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Pembayaran Piutang</h3>
                <form className="space-y-5 w-full mb-8" onSubmit={handleSubmit}>
                    <div className="space-y-5 sm:space-y-0 space-x-5 flex sm:flex-row flex-col w-full">
                        <div className="relative w-full">
                            <label htmlFor="payment_total">Total Pembayaran :</label>
                            <input
                                id="payment_total"
                                name="payment_total"
                                type="number"
                                value={formData.payment_total}
                                onChange={handleChange}
                                placeholder="Total pembayaran..."
                                className="form-input pl-10"
                            />
                            <p className="absolute top-9 left-3">Rp.</p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="payment_date">Tanggal Pembayaran :</label>
                            <input id="payment_date" name="payment_date" type="date" value={formData.payment_date} onChange={handleChange} className="form-input" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline-primary !mt-6 w-full">
                        Tambah
                    </button>
                </form>

                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Pembayaran Piutang</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            { accessor: 'payment_total', title: 'Bayar', sortable: true, render: (e) => formatPrice(e.payment_total) },
                            {
                                accessor: 'payment_date',
                                title: 'Tanggal',
                                sortable: true,
                            },
                            {
                                accessor: 'action',
                                title: 'Action',
                                textAlignment: 'center',
                                render: (e) => (
                                    <div className="flex w-full justify-center">
                                        <button className="text-red-500" onClick={() => onOpen('delete-pay-piutang', e.id)}>
                                            <IconTrashLines />
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

export default EditPiutang;
