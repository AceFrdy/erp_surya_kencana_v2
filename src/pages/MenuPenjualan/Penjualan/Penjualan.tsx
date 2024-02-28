import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { toast } from 'react-toastify';
import { useModal } from '../../../hooks/use-modal';
import { endpoint, formatPrice } from '../../../utils';
import IconSearch from '../../../components/Icon/IconSearch';

interface SaleOrderListProps {
    id: number;
    sale_order_invoice: string;
    product: {
        product_barcode: string;
        product_name: string;
    };
    sale_order_qty: number;
    sale_order_total: number;
    sale_order_sub_total: number;
    sale_report_id: number;
}

interface MetaLinkProps {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
}

interface MetaLinksLinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface LinksLinkProps {
    first: string;
    last: string;
    next: string;
    prev: string;
}

interface FormState {
    product_category_id: number;
    id: number;
    name: string;
    branch_name: string;
    product_barcode: string;
    sale_order_qty: number;
    sale_order_customer: string;
    unit_stock_name: string;
    unit_stock_id: number;
    sale_order_discount: number;
    branch_id: number;
}

interface UnitListProps {
    id: number;
    unit_stock_name: string;
    number_of_units: number;
}

interface BranchesProductListProps {
    id: number;
    product: {
        id: number;
        product_barcode: string;
        product_name: string;
    };
}

interface CabangListProps {
    id: number;
    branch_name: string;
    branch_address: string;
}

interface CustomerListProps {
    id: number;
    name: string;
    address: string;
}

interface FormPaymentProps {
    sale_report_money: number;
}

const Penjualan = () => {
    const { onOpen } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Penjualan'));
    });
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // sale
    const [initialRecords, setInitialRecords] = useState<SaleOrderListProps[]>([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [saleReportId, setSaleReportId] = useState<number>(0);
    const [changeAmount, setChangeAmount] = useState<number>(0);

    // unit
    const [unitList, setUnitList] = useState<UnitListProps[]>([]);
    const [unit, setUnit] = useState<string>('-');

    // product
    const [productList, setProductList] = useState<BranchesProductListProps[]>([]);
    const [productBarcode, setProductBarcode] = useState<string>('');

    // branch
    const [cabangList, setCabangList] = useState<CabangListProps[]>([]);
    const [cabang, setCabang] = useState<string>('-');
    const [cabangDisabled, setCabangDisabled] = useState<boolean>(false);

    // customer
    const [customerList, setCustomerList] = useState<CustomerListProps[]>([]);

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>(`${endpoint}/api/sale-orders`);

    const [formData, setFormData] = useState<FormState>({
        product_category_id: 0,
        id: 0,
        name: '',
        branch_name: '',
        product_barcode: '',
        sale_order_qty: 0,
        sale_order_customer: '',
        unit_stock_id: 0,
        unit_stock_name: '',
        sale_order_discount: 0,
        branch_id: 0,
    });

    const handleGetSaleOrder = () => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const dataOrder: SaleOrderListProps[] = response.data.data.resource.data_order.data;
                if (dataOrder && dataOrder.length > 0) {
                    const saleReportId = dataOrder[0].sale_report_id;
                    setSaleReportId(saleReportId);
                }
                setInitialRecords(response.data.data.resource.data_order.data);
                setGrandTotal(response.data.data.resource.grand_total);
                // page
                setMetaLink({
                    current_page: response.data.data.resource.data_order.meta.current_page,
                    last_page: response.data.data.resource.data_order.meta.last_page,
                    from: response.data.data.resource.data_order.meta.from,
                    to: response.data.data.resource.data_order.meta.to,
                    per_page: response.data.data.resource.data_order.meta.per_page,
                    total: response.data.data.resource.data_order.meta.total,
                });
                setMetaLinksLink(response.data.data.resource.data_order.meta.links);
                setLinksLink({
                    first: response.data.data.resource.data_order.links.first_page_url,
                    last: response.data.data.resource.data_order.links.last_page_url,
                    next: response.data.data.resource.data_order.links.next_page_url,
                    prev: response.data.data.resource.data_order.links.prev_page_url,
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        axios
            .get(`${endpoint}/api/branches`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCabangList(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('BRANCH_ERROR', err.message);
            });

        axios
            .get(`${endpoint}/api/unit-stock`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUnitList(response.data.data.resource.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        axios
            .get(`${endpoint}/api/customers-offline`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCustomerList(response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('BRANCH_ERROR', err.message);
            });
    }, [url, setCabang, setCabangList, token]);

    const handleGetBarcodeProduct = () => {
        if (cabang === '-') {
            return;
        }

        const selectedBranch = cabangList.find((item) => item.branch_name === cabang);
        const branch_id = selectedBranch ? selectedBranch.id : null;

        axios
            .get(`${endpoint}/api/branch-products/${branch_id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setProductList(response.data.data.resource);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        handleGetSaleOrder();
        handleGetBarcodeProduct();
    }, [url, cabang, token]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            product_barcode: productBarcode,
            sale_order_qty: formData.sale_order_qty,
            sale_order_customer: formData.sale_order_customer,
            unit_stock_id: unitList.find((item) => item.unit_stock_name === unit)?.id,
            sale_order_discount: formData.sale_order_discount,
            branch_id: cabangList.find((item) => item.branch_name === cabang)?.id,
        };

        console.log('DATA SENT:', data);

        axios
            .post(`${endpoint}/api/sale-orders`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Penjualan Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            })
            .catch((err: any) => {
                console.log('ERROR PENJUALAN', err.message);
                const notification = {
                    type: 'error',
                    message: 'Data Penjualan Gagal Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checkboxValue = (e.target as HTMLInputElement).checked ? 'yes' : '';
            setFormData((prevData) => ({
                ...prevData,
                [name]: checkboxValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const [formPayment, setFormPayment] = useState<FormPaymentProps>({
        sale_report_money: 0,
    });

    const handleChangeCash = (e: ChangeEvent<HTMLInputElement>) => {
        const cashInput = parseFloat(e.target.value);
        const calculatedChangeAmount = cashInput - grandTotal;

        setFormPayment((prev) => ({
            ...prev,
            sale_report_money: cashInput,
        }));

        if (calculatedChangeAmount >= 0) {
            setChangeAmount(calculatedChangeAmount);
        } else {
            setChangeAmount(0);
        }
    };

    const handleSubmitPayment = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            sale_report_money: formPayment.sale_report_money,
        };

        axios
            .put(`${endpoint}/api/sale-report-pay/${saleReportId}`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                navigate(0);
                const notification = {
                    type: 'success',
                    message: 'Data Penjualan Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
            })
            .catch((err: any) => {
                navigate(0);
                const notification = {
                    type: 'error',
                    message: 'Data Penjualan Gagal Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
            });
    };

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
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center mb-4">Data Penjualan</h1>
                <form className="space-y-5 " onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <label htmlFor="gridCabang">Cabang</label>
                            <button
                                className="h-10 border rounded-md w-full justify-between px-4 flex items-center"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onOpen('search-cabang', undefined, undefined, undefined, [], cabangList, [], setCabang);
                                    setCabang(cabang);
                                }}
                                disabled={cabangDisabled}
                            >
                                <span>{cabang}</span>
                                <IconSearch />
                            </button>
                        </div>
                        <div>
                            <label>Customer</label>
                            {/* <input type="text" placeholder="Customer" className="form-input" name="sale_order_customer" value={formData.sale_order_customer} onChange={handleChange} /> */}
                            <select id="gridState" className="form-select text-black" name="sale_order_customer" value={formData.sale_order_customer} onChange={handleChange}>
                                <option value="">Choose...</option>
                                {customerList.map((item) => (
                                    <option value={item.name} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative">
                            <label htmlFor="barcode">Product Barcode</label>
                            <input
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault();
                                    setProductBarcode(e.target.value);
                                }}
                                className="form-input"
                                placeholder="Barcode..."
                                value={productBarcode}
                                autoFocus
                            />
                            <button
                                className="h-7 w-7 border rounded-md absolute justify-center flex right-1.5 top-[31px] items-center border-green-500"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // onOpen('search-product-barcode', undefined, productList, undefined, [], [], [], setProductBarcode);
                                    onOpen('search-product-barcode', undefined, productList, undefined, [], [], [], setProductBarcode);
                                }}
                            >
                                <IconSearch className="w-4 h-4" />
                            </button>
                        </div>
                        <div>
                            <label htmlFor="gridTotal">Qty</label>
                            <input id="gridTotal" type="text" placeholder="Jumlah penjualan" className="form-input" name="sale_order_qty" value={formData.sale_order_qty} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="gridUnit">Unit Stock</label>
                            <button
                                className="h-10 border rounded-md w-full justify-between px-4 flex items-center"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onOpen('search-unit', undefined, undefined, undefined, [], [], unitList, setUnit);
                                }}
                            >
                                <span>{unit}</span>
                                <IconSearch />
                            </button>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-outline-primary !mt-6 w-full">
                            Tambah
                        </button>
                    </div>
                </form>

                <div className="grid xl:grid-cols-3 gap-6 grid-cols-1 mt-8">
                    <div className="datatables panel xl:col-span-2">
                        <div>
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover"
                                records={initialRecords}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                                    {
                                        accessor: 'sale_order_invoice',
                                        title: 'Barcode',
                                        sortable: true,
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
                                                <button type="button" style={{ color: 'orange' }}>
                                                    <Link to={`/menupenjualan/penjualan/editpenjualan/${e.id}`}>
                                                        <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                                    </Link>
                                                </button>
                                                <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-data-penjualan', e.id)}>
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
                            <div className="flex w-full mt-8">
                                <div className="w-full flex">
                                    <p className="w-full flex">{metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="space-y-5 panel xl:col-span-1" onSubmit={handleSubmitPayment}>
                        <h1 className="font-semibold text-xl dark:text-white-light mb-2 justify-center flex">Penjualan</h1>
                        <div>
                            <label htmlFor="gridTotal">Total :</label>
                            <input id="gridTotal" type="text" placeholder="Enter Address" value={formatPrice(grandTotal)} className="form-input" disabled />
                        </div>
                        <div className="relative">
                            <label htmlFor="Cost">Cash</label>
                            <input id="Cost" type="number" value={formPayment.sale_report_money} onChange={handleChangeCash} placeholder="Cash" className="form-input pl-10" />
                            <p className="absolute top-9 left-3">Rp.</p>
                        </div>
                        <div>
                            <label htmlFor="gridTotal">Kembalian :</label>
                            <input id="gridTotal" type="text" value={formatPrice(changeAmount)} placeholder="Change" className="form-input" disabled />{' '}
                        </div>
                        <div>
                            <button type="submit" className="btn btn-outline-primary !mt-6 w-full" onClick={() => {}}>
                                Process
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Penjualan;
