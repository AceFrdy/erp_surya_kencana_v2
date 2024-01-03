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
import IconSearch from '../../../components/Icon/IconSearch';
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
    branch_address: string;
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

    // product
    const [productList, setProductList] = useState<ProductListProps[]>([]);
    const [productBarcode, setProductBarcode] = useState<string>('');

    // unit
    const [unitList, setUnitList] = useState<UnitListProps[]>([]);
    const [unit, setUnit] = useState<string>('-');

    // branch
    const [cabangList, setCabangList] = useState<CabangListProps[]>([]);
    const [cabang, setCabang] = useState<string>('-');
    const [cabangDisabled, setCabangDisabled] = useState<boolean>(false);

    // distributionQty
    const [distributionQty, setDistributionQty] = useState<number>(0);

    const handleSubmitProduct = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            product_barcode: productBarcode,
            distribution_qty: distributionQty,
            branch_id: cabangList.find((item) => item.branch_name === cabang)?.id,
            unit_stock_id: unitList.find((item) => item.unit_stock_name === unit)?.id,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/distribution', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
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
                // navigate(0);
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
    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/distribution');

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
                    setCabangDisabled(true);
                    // page
                    setMetaLink(response.data.data.resource.meta);
                    setMetaLinksLink(response.data.data.resource.meta.links);
                    setLinksLink(response.data.data.resource.links);
                    setCabang(response.data.data.resource.data[0].branch.branch_name);
                }
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
                console.log('BRANCH_ERROR', err.message);
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
                console.log('UNIT_ERROR', err.message);
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
                console.log('PRODUCT_ERROR', err.message);
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
                    <span> Distribusi </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-lg font-bold">Perkembangan Distribusi</h1>
                <div className="flex mb-4 justify-end">
                    <button className="btn btn-outline-danger mr-4" onClick={() => onOpen('delete-seluruh-distribusi')}>
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
                        <button
                            className="h-10 border rounded-md w-full justify-between px-4 flex items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                onOpen('search-cabang', undefined, undefined, [], cabangList, [], setCabang);
                            }}
                            disabled={cabangDisabled}
                        >
                            <span>{cabang}</span>
                            <IconSearch />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative">
                            <label htmlFor="barcode">Barcode Produk</label>
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
                                    onOpen('search-product', undefined, undefined, productList, [], [], setProductBarcode);
                                }}
                            >
                                <IconSearch className="w-4 h-4" />
                            </button>
                        </div>
                        <div>
                            <label htmlFor="Qty">Qty</label>
                            <input
                                id="Qty"
                                type="number"
                                placeholder="Qty..."
                                name={'qty'}
                                value={distributionQty}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault();
                                    setDistributionQty(parseFloat(e.target.value));
                                }}
                                className="form-input"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="satuan">Satuan</label>
                            <button
                                className="h-10 border rounded-md w-full justify-between px-4 flex items-center"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onOpen('search-unit', undefined, undefined, [], [], unitList, setUnit);
                                }}
                            >
                                <span>{unit}</span>
                                <IconSearch />
                            </button>
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
                                        <button type="button" style={{ color: 'orange' }} onClick={() => {}}>
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