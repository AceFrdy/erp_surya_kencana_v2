import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import Pagination from '../../../../components/Pagination';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, formatPrice } from '../../../../utils';

import 'react-toastify/dist/ReactToastify.css';

interface DebtPayDataProps {
    id: number;
    payment_date: string;
    debt_id: number;
    payment_total: number;
    debt_unpaid: number;
}

const EditHutang = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        dispatch(setPageTitle('Edit Hutang'));
    });
    const [initialRecords, setInitialRecords] = useState<DebtPayDataProps[]>([]);
    const [idDebt, setIdDebt] = useState<number>(0);
    const [debtBalance, setDebtBalance] = useState<number>(0);
    const [paymentAmount, setPaymentAmount] = useState<number>(0);
    const [debtUnpaid, setDebtUnpaid] = useState<number>(0);
    const [page, setPage] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [formData, setFormData] = useState({
        debt_id: '',
        payment_date: '',
        payment_total: '',
    });
    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            debt_id: String(idDebt),
        }));
    }, [idDebt]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fetchData = () => {
        const url = `https://erp.digitalindustryagency.com/api/debt-pays/${id + (page && '?page=' + page)}`;
        axios
            .get(`https://erp.digitalindustryagency.com/api/debts/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setIdDebt(response.data.data.resource.id);
                setDebtBalance(response.data.data.resource.debt_balance);
                setPaymentAmount(response.data.data.resource.payment_amount);
                setDebtUnpaid(response.data.data.resource.debt_unpaid);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

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
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            debt_id: formData.debt_id,
            payment_date: formData.payment_date,
            payment_total: formData.payment_total,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/debt-pay', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Hutang Berhasil Diperbarui',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(-1);
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    debt_id: formData.debt_id,
                    payment_date: formData.payment_date,
                    payment_total: formData.payment_total,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Hutang Gagal Diperbarui',
                    log: err.message,
                    title: 'ERROR_UPDATING_DEBT',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

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
            if (type === 'error') {
                toast.error(message);
                console.log(title, log);

                return localStorage.removeItem('notification');
            }
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
                    <span> Edit Data Hutang </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-lg font-bold">Edit Data Hutang</h1>
                <div className="flex mb-4 justify-end">
                    <Link to="/menukeuangan/hutang-piutang/hutang">
                        <button type="button" className="btn btn-outline-primary">
                            <IconArrowBackward className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                            Kembali
                        </button>
                    </Link>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="debtBalance">Total : </label>
                        <input id="debtBalance" value={formatPrice(debtBalance)} className="form-input text-black border-zinc-300" disabled />
                    </div>
                    <div>
                        <label htmlFor="paymentAmount">Terbayar : </label>
                        <input id="paymentAmount" value={formatPrice(paymentAmount)} className="form-input text-black border-zinc-300" disabled />
                    </div>
                    <div>
                        <label htmlFor="debtUnpaid">Sisa</label>
                        <input id="debtUnpaid" value={formatPrice(debtUnpaid)} className="form-input text-black border-zinc-300" disabled />
                    </div>
                    <div>
                        <label htmlFor="debt_id">Kode Hutang</label>
                        <input id="debt_id" type="text" placeholder="Jumlah Bayar..." className="form-input" name="debt_id" value={formData.debt_id} onChange={handleChange} disabled />
                    </div>
                    <div>
                        <label htmlFor="payment_date">Tanggal Pembayaran</label>
                        <input id="payment_date" type="date" placeholder="Tanggal Bayar..." className="form-input" name="payment_date" value={formData.payment_date} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="payment_total">Bayar</label>
                        <input id="payment_total" type="text" placeholder="Jumlah Bayar..." className="form-input" name="payment_total" value={formData.payment_total} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-outline-primary !mt-6 w-full">
                        Tambah
                    </button>
                </form>

                <h5 className="font-semibold text-lg dark:text-white-light mb-2 mt-6">Data Hutang</h5>
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
                            { accessor: 'debt_unpaid', title: 'Sisa', sortable: true, render: (e) => formatPrice(e.debt_unpaid) },
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

export default EditHutang;
