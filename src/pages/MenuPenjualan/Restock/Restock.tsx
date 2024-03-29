import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useModal } from '../../../hooks/use-modal';
import Pagination from '../../../components/Pagination';
import IconSend from '../../../components/Icon/IconSend';
import IconPencil from '../../../components/Icon/IconPencil';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, endpoint, formatPrice } from '../../../utils';

import 'react-toastify/dist/ReactToastify.css';

interface RestockProps {
    id: number;
    distribution_code: string;
    distribution_qty: number;
    product_name: string;
    product_price: number;
    total_price: number;
}
interface SuplierListProps {
    id: number;
    suplier_name: string;
}
interface ProductListProps {
    id: number;
    product_barcode: string;
    product_name: string;
}
interface FormDataProps {
    product_name: string;
    product_qty: number;
    product_price: number;
}
interface FormRestockProps {
    suplier_id: number;
    operating_cost: number;
}
const Restock = () => {
    const navigate = useNavigate();
    const { onOpen } = useModal();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Restock'));
    });
    const [initialRecords, setInitialRecords] = useState<RestockProps[]>([]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';

    const [formData, setFormData] = useState<FormDataProps>({
        product_name: '',
        product_qty: 0,
        product_price: 0,
    });
    const [formRestock, setFormRestock] = useState<FormRestockProps>({
        suplier_id: 0,
        operating_cost: 0,
    });

    const handleSubmitDataRestock = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            product_name: formData.product_name,
            distribution_qty: formData.product_qty,
            product_price: formData.product_price,
        };

        axios
            .post(`${endpoint}/api/distribution-restok`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                handleProductClick('');
                setFormData((prev) => ({ ...prev, product_price: 0, product_qty: 0 }));
                const notification = {
                    type: 'success',
                    message: 'Restock Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            })
            .catch((err: any) => {
                // set_old_value
                const oldFormData = {
                    product_price: formData.product_price,
                    product_qty: formData.product_qty,
                    product_name: formData.product_name,
                };
                const oldFormRestock = {
                    suplier_id: formRestock.suplier_id,
                    operating_cost: formRestock.operating_cost,
                };
                const oldValueBefore = {
                    oldFormData: oldFormData,
                    oldFormRestock: oldFormRestock,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Restock Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_ADDING_RESTOCK',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    const handleSubmitRestock = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            suplier_id: formRestock.suplier_id,
            operating_cost: formRestock.operating_cost,
        };

        axios
            .post(`${endpoint}/api/distribution-restok-request`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                navigate(0);
                const notification = {
                    type: 'success',
                    message: 'Data Restock Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
            })
            .catch((err: any) => {
                // set_old_value
                const oldFormData = {
                    product_price: formData.product_price,
                    product_qty: formData.product_qty,
                    product_name: formData.product_name,
                };
                const oldFormRestock = {
                    suplier_id: formRestock.suplier_id,
                    operating_cost: formRestock.operating_cost,
                };
                const oldValueBefore = {
                    oldFormData: oldFormData,
                    oldFormRestock: oldFormRestock,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Data Restock Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_ADDING_DATA_RESTOCK',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    // product
    const [productList, setProductList] = useState<ProductListProps[]>([]);
    const [filteredProduct, setFilteredProduct] = useState<ProductListProps[]>(productList);
    const [showProduct, setShowProduct] = useState<boolean>(false);
    const ProductRef = useRef<HTMLInputElement>(null);

    const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = productList.filter((item) => item.product_name.toLowerCase().includes(inputValue));
        setFilteredProduct(filtered);
        setShowProduct(true);
    };

    const handleProductClick = (option: string) => {
        setShowProduct(false);
        if (ProductRef.current) {
            ProductRef.current.value = option;
        }
    };

    // suplier
    const [suplierList, setSuplierList] = useState<SuplierListProps[]>([]);
    const [filteredSuplier, setFilteredSuplier] = useState<SuplierListProps[]>(suplierList);
    const [showSuplier, setShowSuplier] = useState<boolean>(false);
    const SuplierRef = useRef<HTMLInputElement>(null);

    const handleSuplierChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = suplierList.filter((item) => item.suplier_name.toLowerCase().includes(inputValue));
        setFilteredSuplier(filtered);
        setShowSuplier(true);
    };

    const handleSuplierClick = (option: string) => {
        setShowSuplier(false);
        if (SuplierRef.current) {
            SuplierRef.current.value = option;
        }
    };

    // get product & suplier
    useEffect(() => {
        axios
            .get(`${endpoint}/api/products`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setProductList(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });
        axios
            .get(`${endpoint}/api/supliers`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setSuplierList(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });
    }, []);

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>(`${endpoint}/api/distribution-restok`);

    //get data
    useEffect(() => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.data);
                if (response.data.data.resource.data.length !== 0) {
                    setMetaLink(response.data.data.resource.meta);
                    setMetaLinksLink(response.data.data.resource.meta.links);
                    setLinksLink(response.data.data.resource.links);
                }
            });
    }, []);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    useEffect(() => {
        const isOldValue = sessionStorage.getItem('old_value');
        if (isOldValue) {
            const oldValue: any = JSON.parse(isOldValue);
            setFormData(oldValue.oldFormData);
            setFormRestock(oldValue.oldFormRestock);

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
                    <span> Restock </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <h1 className="text-lg font-bold mb-16">Data Restock</h1>

                <form className="space-y-5" onSubmit={handleSubmitDataRestock}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative">
                            <label htmlFor="nama">Nama Produk</label>
                            <input id="nama" ref={ProductRef} type="text" className="form-input" placeholder="Nama Produk" onChange={handleProductChange} autoComplete="off" />
                            {showProduct && (
                                <div className="w-full flex absolute top-[70px] p-1 bg-white z-20 border border-zinc-100 rounded-md">
                                    <div className="h-40 overflow-y-scroll w-full">
                                        <div className="h-auto flex flex-col w-full pb-[120px]">
                                            {filteredProduct.map((item) => (
                                                <button
                                                    className="h-10 w-full hover:bg-green-100 text-start flex px-5 items-center rounded-md"
                                                    key={item.id}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleProductClick(item.product_name);
                                                        setFormData((prev) => ({ ...prev, product_name: item.product_name }));
                                                    }}
                                                >
                                                    {item.product_name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="product_qty">Qty</label>
                            <input
                                id="product_qty"
                                type="number"
                                placeholder=""
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault();
                                    setFormData((prev) => ({ ...prev, product_qty: parseFloat(e.target.value) }));
                                }}
                                value={formData.product_qty}
                                className="form-input"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="product_price">Harga</label>
                            <input
                                id="product_price"
                                type="number"
                                value={formData.product_price}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault();
                                    setFormData((prev) => ({ ...prev, product_price: parseFloat(e.target.value) }));
                                }}
                                placeholder="Harga"
                                className="form-input pl-10"
                            />
                            <p className="absolute top-9 left-3">Rp.</p>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline-primary !mt-6 w-full" onClick={() => {}}>
                        Tambah
                    </button>
                </form>

                <h5 className="font-semibold text-lg dark:text-white-light mb-2 mt-8">Restock</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover rounded-md"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            { accessor: 'product_name', title: 'Nama Produk', sortable: true },
                            { accessor: 'product_price', title: 'Harga', sortable: true, render: (e) => formatPrice(e.product_price) },
                            { accessor: 'distribution_qty', title: 'Qty', sortable: true },
                            { accessor: 'total_price', title: 'Total', sortable: true, render: (e) => formatPrice(e.total_price) },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'orange' }}>
                                            <Link to={`/menupenjualan/restock/editrestock/${e.id}`}>
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-restock', e.id)}>
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
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}
                </div>
                <div>
                    <form className="pt-5 my-10 border-t" onSubmit={handleSubmitRestock}>
                        <div className="flex gap-x-8 w-full">
                            <div className="w-full relative">
                                <label htmlFor="suplier">Suplier</label>
                                <input id="suplier" ref={SuplierRef} type="text" className="form-input" placeholder="Nama Suplier" onChange={handleSuplierChange} autoComplete="off" />
                                {showSuplier && (
                                    <div className="w-full flex absolute top-[70px] p-1 bg-white z-20 border border-zinc-100 rounded-md">
                                        <div className="h-40 overflow-y-scroll w-full">
                                            <div className="h-auto flex flex-col w-full pb-[120px]">
                                                {filteredSuplier.map((item) => (
                                                    <button
                                                        className="h-10 w-full hover:bg-green-100 text-start flex px-5 items-center rounded-md"
                                                        key={item.id}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSuplierClick(item.suplier_name);
                                                            setFormRestock((prev) => ({ ...prev, suplier_id: item.id }));
                                                        }}
                                                    >
                                                        {item.suplier_name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-full relative">
                                <label htmlFor="biaya_operatioanal">Biaya Operasional</label>
                                <input
                                    id="biaya_operatioanal"
                                    type="number"
                                    value={formRestock.operating_cost}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setFormRestock((prev) => ({ ...prev, operating_cost: parseFloat(e.target.value) }));
                                    }}
                                    placeholder="Biaya Operasional"
                                    className="form-input pl-10"
                                />
                                <p className="absolute top-9 left-3">Rp.</p>
                            </div>
                        </div>
                        <div className="flex mt-8 justify-end">
                            <button type="button" className="btn btn-outline-danger mr-4" onClick={() => onOpen('delete-seluruh-restock', 0)}>
                                <IconTrashLines className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                                Batal
                            </button>
                            <button type="submit" className="btn btn-outline-primary">
                                <IconSend className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                                Kirim
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Restock;
