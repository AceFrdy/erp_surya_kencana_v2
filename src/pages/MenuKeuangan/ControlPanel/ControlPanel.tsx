import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';

import { useModal } from '../../../hooks/use-modal';
import IconEye from '../../../components/Icon/IconEye';
import Pagination from '../../../components/Pagination';
import IconPlus from '../../../components/Icon/IconPlus';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, formatPrice } from '../../../utils';

import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Transition } from '@headlessui/react';

interface FormDataProps {
    index_info: string;
    income: boolean;
    outcome: boolean;
    submission: boolean;
}

interface DataProps {
    id: number;
    index_info: string;
    income: string;
    outcome: string;
    submission: string;
}

interface SaldoProps {
    saldo_akhir: number;
    saldo_awal: number;
    inflow_total: number;
    outflow_total: number;
}

const ControlPanel = () => {
    const { onOpen } = useModal();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Control Panel'));
    });
    const [initialRecords, setInitialRecords] = useState<DataProps[]>([]);
    const token = localStorage.getItem('accessToken') ?? '';
    const [page, setPage] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [formData, setFormData] = useState<FormDataProps>({
        index_info: '',
        income: false,
        outcome: false,
        submission: false,
    });
    const [saldo, setSaldo] = useState<SaldoProps>({
        saldo_akhir: 0,
        saldo_awal: 0,
        inflow_total: 0,
        outflow_total: 0,
    });

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    const fetchData = () => {
        const url = `https://erp.digitalindustryagency.com/api/indexs${page && '?q=' + page}`;
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
                console.log('ERROR_INDEX', err.message);
            });
    };

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('index_info', formData.index_info);
        data.append('income', formData.income ? 'yes' : 'no');
        data.append('outcome', formData.outcome ? 'yes' : 'no');
        data.append('submission', formData.submission ? 'yes' : 'no');

        axios
            .post('https://erp.digitalindustryagency.com/api/indexs', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setFormData((prev) => ({ ...prev, index_info: '', income: false, outcome: false, submission: false }));
                fetchData();
                toast.success('Index berhasil ditambahkan');
            })
            .catch((err: any) => {
                toast.error('Index gagal ditambahkan');
                console.log('ERROR_ADDING_INDEX', err.message);
            });
    };

    const handleUpdate = (e: FormEvent, id: number, index: string, income: string, outcome: string, submission: string) => {
        e.preventDefault();

        const dataSubmission = {
            index_info: index,
            income: income,
            outcome: outcome,
            submission: submission,
        };

        axios
            .put(`https://erp.digitalindustryagency.com/api/indexs/${id}`, dataSubmission, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                fetchData();
                toast.success('Index berhasil diperbarui');
            })
            .catch((err: any) => {
                toast.error('Index gagal diperbarui');
                console.log('ERROR_UPDATING_INDEX', err.message);
            });
    };

    const handleDelete = (id: number) => {
        axios
            .delete(`https://erp.digitalindustryagency.com/api/indexs/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setOpen(false);
                fetchData();
                toast.success('Index berhasil dihapus');
            })
            .catch((err) => {
                setOpen(false);
                toast.error('Index gagal dihapus');
                console.log('ERROR_DELETING_INDEX');
            });
    };

    // get index
    useEffect(() => {
        fetchData();
    }, [page]);

    // get saldo
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/saldo-total', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setSaldo(response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('ERROR_GETTING_SALDO:', err.message);
            });
    }, []);

    useEffect(() => {
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { type, message } = JSON.parse(notificationMessage);
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }
        }
        return localStorage.removeItem('notification');
    }, []);

    return (
        <div>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" open={open} onClose={() => setOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">Hapus Index</div>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <form className="space-y-5">
                                                <div>
                                                    <h1>Apakah Anda yakin ingin menghapus Index</h1>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setOpen(false)}>
                                                Kembali
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleDelete(id)}>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
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
                    <span> Control Panel </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Data Penjualan</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    <div className="panel col-span-4 text-black dark:text-white bg-gradient-to-r to-[#35654d] from-[#7ed56f] dark:from-[#35654d] dark:to-[#7ed56f]">
                        <div className="flex">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Saldo Awal</div>
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold mx-2 ">-</div>
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Dari Akun Bank BRI</div>
                            <div className="dropdown"></div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {formatPrice(saldo.saldo_awal)} </div>
                        </div>
                        <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week Rp.644.700,-
                        </div>
                    </div>
                    <div className="panel overflow-hidden col-span-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold">Total Keseluruhan</div>
                                <div className="text-success"> Berdasarkan Tahun 2022 </div>
                            </div>
                        </div>
                        <div className="relative mt-10">
                            <div className="grid grid-cols-1 ss:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                <div className="panel bg-gray-400">
                                    <div className="text-dark">Saldo Akhir</div>
                                    <div className="mt-2 font-semibold text-2xl border-b border-b-gray-800">{formatPrice(saldo.saldo_akhir)}</div>
                                    <div className="mt-2 font-medium text-lg">Total Saldo Sampai Hari ini</div>
                                </div>
                                <div className="panel bg-gray-400">
                                    <div className="text-dark">Pemasukan</div>
                                    <div className="mt-2 font-semibold text-2xl border-b border-b-gray-800">{formatPrice(saldo.inflow_total)}-</div>
                                    <div className="mt-2 font-medium text-lg">Total Saldo Sampai Hari ini</div>
                                </div>
                                <div className="panel bg-gray-400 ">
                                    <div className="text-dark">Pengeluaran</div>
                                    <div className="mt-2 font-semibold text-2xl border-b border-b-gray-800">{formatPrice(saldo.outflow_total)}-</div>
                                    <div className="mt-2 font-medium text-lg">Total Saldo Sampai Hari ini</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse xl:flex-row w-full gap-8 mt-8 h-full">
                    <div className="datatables panel w-full xl:w-2/3 h-full min-h-[400px]">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={initialRecords}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                                { accessor: 'index_info', title: 'Keterangan', sortable: true },
                                {
                                    accessor: 'income',
                                    title: 'Masuk',
                                    sortable: true,
                                    render: (e) => (
                                        <div className="flex">
                                            <label className="inline-flex">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox outline-info w-8 h-8"
                                                    checked={e.income === 'yes'}
                                                    onChange={(event) => {
                                                        handleUpdate(event, e.id, e.index_info, e.income === 'yes' ? 'no' : 'yes', e.outcome, e.submission);
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'outcome',
                                    title: 'Keluar',
                                    sortable: true,
                                    render: (e) => (
                                        <div className="flex">
                                            <label className="inline-flex">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox outline-info w-8 h-8"
                                                    checked={e.outcome === 'yes'}
                                                    onChange={(event) => {
                                                        handleUpdate(event, e.id, e.index_info, e.income, e.outcome === 'yes' ? 'no' : 'yes', e.submission);
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'submission',
                                    title: 'Pengajuan',
                                    sortable: true,
                                    render: (e) => (
                                        <div className="flex ">
                                            <label className="inline-flex">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox outline-info w-8 h-8"
                                                    checked={e.submission === 'yes'}
                                                    onChange={(event) => {
                                                        handleUpdate(event, e.id, e.index_info, e.income, e.outcome, e.submission === 'yes' ? 'no' : 'yes');
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    titleClassName: '!text-center',
                                    render: (e) => (
                                        <div className="flex items-center w-max mx-auto gap-2">
                                            <button
                                                type="button"
                                                style={{ color: 'red' }}
                                                onClick={() => {
                                                    setOpen(true);
                                                    setId(e.id);
                                                }}
                                            >
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
                    <form className="space-y-5 panel w-full xl:w-1/3 h-[400px]" onSubmit={handleSubmit}>
                        <h1 className="font-semibold text-xl dark:text-white-light mb-2 justify-center flex">Tambah Index</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div className="">
                                <label htmlFor="index_info" className="text-xl font-medium mr-8">
                                    Keterangan:
                                </label>
                                <input id="index_info" type="text" name="index_info" placeholder="Keterangan..." className="form-input text-lg" onChange={handleChange} value={formData.index_info} />
                            </div>
                            <div className="space-y-2">
                                <div className="text-xl font-medium">Jenis :</div>
                                <div>
                                    <label className="inline-flex">
                                        <input type="checkbox" className="form-checkbox outline-info w-6 h-6" name="income" onChange={handleChange} checked={formData.income} />
                                        <span className="text-lg">Pemasukan</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex">
                                        <input type="checkbox" className="form-checkbox outline-info w-6 h-6" name="outcome" onChange={handleChange} checked={formData.outcome} />
                                        <span className="text-lg ">Pengeluaran</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex">
                                        <input type="checkbox" className="form-checkbox outline-info w-6 h-6" name="submission" onChange={handleChange} checked={formData.submission} />
                                        <span className="text-lg">Pengajuan</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary !mt-6 w-full">
                                <IconPlus className="mr-2 " /> Tambah
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
