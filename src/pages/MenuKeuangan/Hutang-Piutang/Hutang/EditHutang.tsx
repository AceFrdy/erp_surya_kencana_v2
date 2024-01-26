import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, formatPrice } from '../../../../utils';
import Pagination from '../../../../components/Pagination';

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
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [idDebt, setIdDebt] = useState<number>(0);
    const [debtBalance, setDebtBalance] = useState<number>(0);
    const [paymentAmount, setPaymentAmount] = useState<number>(0);
    const [debtUnpaid, setDebtUnpaid] = useState<number>(0);
    const [search, setSearch] = useState('');
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
    const [url, setUrl] = useState<string>(`https://erp.digitalindustryagency.com/api/debt-pays/${id}`);

    useEffect(() => {
        if (!initialRecords) {
            return;
        }

        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.payment_date.toLowerCase().includes(search.toLowerCase()) ||
                    item.debt_id.toString().includes(search.toLowerCase()) ||
                    item.payment_total.toString().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

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
                setRecordsData(response.data.data.resource.data);
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
    }, [url, token]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        const id = formElement.id;
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
                console.log('Data Hutang berhasil ditambahkan:', response.data);
                fetchData();
                navigate(`/menukeuangan/hutang-piutang/edithutang/${idDebt}`);
                toast.success('Data berhasil ditambahkan', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const apiErrors = error.response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        errors: apiErrors,
                    }));
                }
                console.error('Error adding debt data:', error);
                toast.error('Error adding data');
            });
    };

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
                        <label>Total : </label>
                        <input value={formatPrice(debtBalance)} className="form-input text-black border-zinc-300" disabled />
                    </div>
                    <div>
                        <label>Terbayar : </label>
                        <input value={formatPrice(paymentAmount)} className="form-input text-black border-zinc-300" disabled />
                    </div>
                    <div>
                        <label>Sisa</label>
                        <input value={formatPrice(debtUnpaid)} className="form-input text-black border-zinc-300" disabled />
                    </div>
                    <div>
                        <label>Kode Hutang</label>
                        <input type="text" placeholder="Jumlah Bayar..." className="form-input" name="debt_id" value={formData.debt_id} onChange={handleChange} disabled />
                    </div>
                    <div>
                        <label>Tanggal Pembayaran</label>
                        <input type="date" placeholder="Tanggal Bayar..." className="form-input" name="payment_date" value={formData.payment_date} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Bayar</label>
                        <input type="text" placeholder="Jumlah Bayar..." className="form-input" name="payment_total" value={formData.payment_total} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-outline-primary !mt-6 w-full">
                        Tambah
                    </button>
                </form>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mt-8">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <h5 className="font-semibold text-lg dark:text-white-light mb-2">Data Hutang</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
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
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}
                </div>
            </div>
        </div>
    );
};

export default EditHutang;
