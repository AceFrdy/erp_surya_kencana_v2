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
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps } from '../../../utils';

import 'react-toastify/dist/ReactToastify.css';

interface DistributionListProps {
    id: number;
    product: {
        product_barcode: string;
        product_name: string;
    };
    distribution_qty: number;
}

interface ProductListProps {
    id: number;
    product_barcode: string;
    product_name: string;
}

interface UnitListProps {
    id: number;
    unit_stock_name: string;
    number_of_units: number;
}

interface CabangListProps {
    id: number;
    branch_name: string;
}

interface FormDataProps {
    product_barcode: string;
    distribution_qty: number;
    branch_id: number;
    unit_stock_id: number;
}

const Distribusi = () => {
    const { onOpen } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Distribusi'));
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [initialRecords, setInitialRecords] = useState<DistributionListProps[]>([]);

    const [formData, setFormData] = useState<FormDataProps>({
        product_barcode: '',
        distribution_qty: 0,
        branch_id: 0,
        unit_stock_id: 0,
    });

    // product
    const [productList, setProductList] = useState<ProductListProps[]>([]);
    const [filteredProduct, setFilteredProduct] = useState<ProductListProps[]>(productList);
    const [showProduct, setShowProduct] = useState<boolean>(false);
    const ProductRef = useRef<HTMLInputElement>(null);

    const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = productList.filter((item) => item.product_barcode.toLowerCase().includes(inputValue));
        setFilteredProduct(filtered);
        setShowProduct(true);
    };

    const handleProductClick = (option: string) => {
        setShowProduct(false);
        if (ProductRef.current) {
            ProductRef.current.value = option;
        }
    };

    // unit
    const [unitList, setUnitList] = useState<UnitListProps[]>([]);
    const [filteredUnit, setFilteredUnit] = useState<UnitListProps[]>(unitList);
    const [showUnit, setShowUnit] = useState<boolean>(false);
    const UnitRef = useRef<HTMLInputElement>(null);

    const handleUnitChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = unitList.filter((item) => item.unit_stock_name.toLowerCase().includes(inputValue));
        setFilteredUnit(filtered);
        setShowUnit(true);
    };

    const handleUnitClick = (option: string) => {
        setShowUnit(false);
        if (UnitRef.current) {
            UnitRef.current.value = option;
        }
    };

    // branch
    const [cabangList, setCabangList] = useState<CabangListProps[]>([]);
    const [filteredCabang, setFilteredCabang] = useState<CabangListProps[]>(cabangList);
    const [showCabang, setShowCabang] = useState<boolean>(false);
    const CabangRef = useRef<HTMLInputElement>(null);

    const handleCabangChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = cabangList.filter((item) => item.branch_name.toLowerCase().includes(inputValue));
        setFilteredCabang(filtered);
        setShowCabang(true);
    };

    const handleCabangClick = (option: string) => {
        setShowCabang(false);
        if (CabangRef.current) {
            CabangRef.current.value = option;
        }
    };

    const handleSubmitProduct = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            product_barcode: formData.product_barcode,
            distribution_qty: formData.distribution_qty,
            branch_id: formData.branch_id,
            unit_stock_id: formData.unit_stock_id,
        };

        console.log(data);

        axios
            .post('https://erp.digitalindustryagency.com/api/distributions', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                const notification = {
                    type: 'success',
                    message: 'Distribusi Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            })
            .catch((err: any) => {
                console.log('error', err);
                const notification = {
                    type: 'error',
                    message: 'Distribusi Gagal Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    const handleSubmitDistribution = (e: FormEvent) => {
        e.preventDefault();

        axios
            .post(
                'https://erp.digitalindustryagency.com/api/distribution-request',
                {},
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Data Distribusi Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            })
            .catch((err: any) => {
                console.log('ERROR DISTRIBUSI', err.message);
                const notification = {
                    type: 'error',
                    message: 'Data Distribusi Gagal Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/distributions');

    // get distribution
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
                if (response.data.data.resource.data.length >= 1) {
                    // page
                    setMetaLink(response.data.data.resource.meta);
                    setMetaLinksLink(response.data.data.resource.meta.links);
                    setLinksLink(response.data.data.resource.links);
                    setFormData((prev) => ({ ...prev, branch_id: response.data.data.resource.data[0].branch.id }));
                }
                console.log('data', response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });
    }, []);

    // get product, unit, branch
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/branches', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCabangList(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });

        axios
            .get('https://erp.digitalindustryagency.com/api/unit-stock', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUnitList(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });

        axios
            .get('https://erp.digitalindustryagency.com/api/products', {
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
    }, []);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

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
        <div
            onClick={() => {
                setShowCabang(false);
                setShowProduct(false);
                setShowUnit(false);
            }}
        >
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
                    <span> Distribusi </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-lg font-bold">Perkembangan Distribusi</h1>
                <div className="flex mb-4 justify-end">
                    <button className="btn btn-outline-danger mr-4" onClick={() => onOpen('delete-seluruh-distribusi', 0)}>
                        <IconTrashLines className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                        Batal
                    </button>
                    <form onSubmit={handleSubmitDistribution}>
                        <button type="submit" className="btn btn-outline-primary">
                            <IconSend className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                            Kirim
                        </button>
                    </form>
                </div>
                <form className="space-y-5" onSubmit={handleSubmitProduct}>
                    <div className="relative">
                        <label htmlFor="cabang">Tujuan Cabang</label>
                        {initialRecords.length === 0 ? (
                            <>
                                <input id="cabang" ref={CabangRef} type="text" className="form-input" placeholder="Tujuan Cabang" onChange={handleCabangChange} autoComplete="off" />
                                {showCabang && (
                                    <div className="w-full flex absolute top-[70px] p-1 bg-white z-20 border border-zinc-100 rounded-md">
                                        <div className="h-40 overflow-y-scroll w-full">
                                            <div className="h-auto flex flex-col w-full pb-[120px]">
                                                {filteredCabang.map((item) => (
                                                    <button
                                                        className="h-10 w-full hover:bg-green-100 text-start flex px-5 items-center rounded-md"
                                                        key={item.id}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleCabangClick(item.branch_name);
                                                            setFormData((prev) => ({ ...prev, branch_id: item.id }));
                                                        }}
                                                    >
                                                        {item.branch_name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <input
                                id="cabang"
                                ref={CabangRef}
                                type="text"
                                className="form-input"
                                placeholder="Tujuan Cabang"
                                value={cabangList.find((item) => item.id === formData.branch_id)?.branch_name ? cabangList.find((item) => item.id === formData.branch_id)?.branch_name : ''}
                                autoComplete="off"
                                disabled
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative">
                            <label htmlFor="barcode">Barcode Produk</label>
                            <input id="barcode" ref={ProductRef} type="text" className="form-input" placeholder="Produk Barcode" onChange={handleProductChange} autoComplete="off" />
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
                                                        handleProductClick(item.product_barcode);
                                                        setFormData((prev) => ({ ...prev, product_barcode: item.product_barcode }));
                                                    }}
                                                >
                                                    {item.product_barcode}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="Qty">Qty</label>
                            <input
                                id="Qty"
                                type="number"
                                placeholder="Qty..."
                                name={'qty'}
                                value={formData.distribution_qty}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault();
                                    setFormData((prev) => ({ ...prev, distribution_qty: parseFloat(e.target.value) }));
                                }}
                                className="form-input"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="satuan">Satuan</label>
                            <input id="satuan" ref={UnitRef} type="text" className="form-input" placeholder="Satuan Qty" onChange={handleUnitChange} autoComplete="off" />
                            {showUnit && (
                                <div className="w-full flex absolute top-[70px] p-1 bg-white z-20 border border-zinc-100 rounded-md">
                                    <div className="h-40 overflow-y-scroll w-full">
                                        <div className="h-auto flex flex-col w-full pb-[120px]">
                                            {filteredUnit.map((item) => (
                                                <button
                                                    className="h-10 w-full hover:bg-green-100 text-start px-5 rounded-md"
                                                    key={item.id}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleUnitClick(item.unit_stock_name);
                                                        setFormData((prev) => ({ ...prev, unit_stock_id: item.id }));
                                                    }}
                                                >
                                                    {item.unit_stock_name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline-primary !mt-6 w-full mb-6">
                        Tambah
                    </button>
                </form>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5"></div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-4 mt-4 flex justify-center">Data Distribusi</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            {
                                accessor: 'product.product_barcode',
                                title: 'Barcode',
                                sortable: true,
                            },
                            {
                                accessor: 'product.product_name',
                                title: 'Nama',
                                sortable: true,
                            },
                            { accessor: 'distribution_qty', title: 'Qty', sortable: true },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'orange' }} onClick={() => onOpen('edit-distribusi', e.id)}>
                                            <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                        </button>
                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-data-distribusi', e.id)}>
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
            </div>
        </div>
    );
};

export default Distribusi;
