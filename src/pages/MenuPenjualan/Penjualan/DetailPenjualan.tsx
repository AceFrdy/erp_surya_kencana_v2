import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link, useParams } from 'react-router-dom';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import axios from 'axios';
import { endpoint, formatPrice } from '../../../utils';
import { useModal } from '../../../hooks/use-modal';

interface DetailPenjualan {
    id: number;
    sale_order_invoice: string;
    sale_order_qty: number;
    product: {
        product_name: string;
    };
    sale_order_total: number;
    sale_order_sub_total: number;
}

const DetailPenjualan = () => {
    const { onOpen } = useModal();
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Detail Penjualan'));
    });
    const [initialRecords, setInitialRecords] = useState<DetailPenjualan[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [customer, setCustomer] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [grandTotal, setGrandTotal] = useState(0);
    const [cash, setCash] = useState(0);
    const [debt, setDebt] = useState(0);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const { id } = useParams();

    useEffect(() => {
        if (!initialRecords) {
            return;
        }

        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return item.sale_order_invoice.toLowerCase().includes(search.toLowerCase()) || item.product?.product_name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() => {
        axios
            .get(`${endpoint}/api/sale-reports/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setRecordsData(response.data.data.resource.sale_order);
                setInitialRecords(response.data.data.resource.sale_order);
                setCustomer(response.data.data.resource.sale_report_customer);
                setBranch(response.data.data.resource.branch.branch_name);
                setGrandTotal(response.data.data.resource.sale_report_grand_total);
                setCash(response.data.data.resource.sale_report_money);
                setDebt(response.data.data.resource.sale_report_change_money);
            })
            .catch((err: any) => {
                console.log('GET SALE REPORT', err.message);
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
                    <span>Menu Penjualan</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Penjualan </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center">Detail Penjualan</h1>

                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <Link to="/menupenjualan/penjualan/laporanpenjualan">
                        <button type="button" className=" px-2 btn btn-outline-info">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Kembali
                        </button>
                    </Link>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 gap-6 grid-cols-1">
                    <div className="datatables panel xl:col-span-2">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={recordsData}
                            columns={[
                                { accessor: 'id', title: 'No', render: (e) => recordsData.indexOf(e) + 1 },
                                {
                                    accessor: 'sale_order_invoice',
                                    title: 'Barcode',
                                    sortable: true,
                                    // render: ({ id }) => (
                                    //     <div className="flex items-center w-max">
                                    //         <img className="w-14 h-14 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                    //         {/* <div>{firstName + ' ' + lastName}</div> */}
                                    //     </div>
                                    // ),
                                },
                                { accessor: 'product.product_name', title: 'Nama', sortable: true },
                                { accessor: 'sale_order_qty', title: 'Qty', sortable: true },
                                {
                                    accessor: 'sale_order_total',
                                    title: 'Harga',
                                    sortable: true,
                                    render: (e) => formatPrice(e.sale_order_total),
                                },
                                {
                                    accessor: 'sale_order_sub_total',
                                    title: 'Sub Total',
                                    sortable: true,
                                    render: (e) => formatPrice(e.sale_order_sub_total),
                                },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    titleClassName: '!text-center',
                                    render: (e) => (
                                        <div className="flex items-center w-max mx-auto gap-2">
                                            {/* <button type="button" style={{ color: 'orange' }}>
                                                <Link to="/menupenjualan/penjualan/laporanpenjualan">
                                                    <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                                </Link>
                                            </button> */}
                                            <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-data-detail-penjualan', e.id)}>
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
                    <form className="space-y-5 panel xl:col-span-1">
                        <h1 className="font-semibold text-xl dark:text-white-light mb-2 justify-center flex">Penjualan</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="gridCustomer">Customer</label>
                                <input value={customer} className="form-input text-black border-zinc-300" disabled />
                            </div>
                            <div>
                                <label htmlFor="gridCabang">Cabang</label>
                                <input value={branch} className="form-input text-black border-zinc-300" disabled />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="gridTotal">Total </label>
                            <input type="text" value={formatPrice(grandTotal)} className="form-input text-black border-zinc-300" disabled />
                        </div>
                        <div>
                            <label htmlFor="Cost">Cash</label>
                            <input type="text" value={formatPrice(cash)} className="form-input text-black border-zinc-300" disabled />
                        </div>
                        <div>
                            <label htmlFor="gridTotal">Kembalian </label>
                            <input type="text" value={formatPrice(debt)} className="form-input text-black border-zinc-300" disabled />
                        </div>
                        {/* <div>
                            <label className="flex items-center mt-1 cursor-pointer">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Check me out</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary !mt-6">
                            Submit
                        </button> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailPenjualan;
