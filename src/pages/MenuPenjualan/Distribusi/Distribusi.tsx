import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import IconSend from '../../../components/Icon/IconSend';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import IconDatabase from '../../../components/Icon/icon-database';

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

const Distribusi = () => {
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
    const [cabangList, setCabangList] = useState<CabangListProps[]>([]);
    const [productList, setProductList] = useState<ProductListProps[]>([]);
    const [unitList, setUnitList] = useState<UnitListProps[]>([]);

    // not Found Data
    const [notFoundData, setNotFoundData] = useState<string>('');

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    // product
    const [filteredProduct, setFilteredProduct] = useState<ProductListProps[]>(productList);
    const [showProduct, setShowProduct] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const ProductRef = useRef<HTMLInputElement>(null);

    const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = productList.filter((item) => item.product_barcode.toLowerCase().includes(inputValue));
        setFilteredProduct(filtered);
        setShowProduct(true);
    };

    const handleProductClick = (option: string) => {
        setSelectedProduct(option);
        setShowProduct(false);
        if (ProductRef.current) {
            ProductRef.current.value = option;
        }
    };

    // unit
    const [filteredUnit, setFilteredUnit] = useState<UnitListProps[]>(unitList);
    const [showUnit, setShowUnit] = useState<boolean>(false);
    const [selectedUnit, setSelectedUnit] = useState<string>('');
    const UnitRef = useRef<HTMLInputElement>(null);

    const handleUnitChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = unitList.filter((item) => item.unit_stock_name.toLowerCase().includes(inputValue));
        setFilteredUnit(filtered);
        setShowUnit(true);
    };

    const handleUnitClick = (option: string) => {
        setSelectedUnit(option);
        setShowUnit(false);
        if (UnitRef.current) {
            UnitRef.current.value = option;
        }
    };

    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/distributions');

    //
    useEffect(() => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if ((response.data.data.resource.data = 'Data not available')) {
                    setNotFoundData(response.data.data.resource.data);
                } else {
                    setInitialRecords(response.data.data.resource.data);
                }

                // page
                setMetaLink(response.data.data.resource.meta);
                setMetaLinksLink(response.data.data.resource.meta.links);
                setLinksLink(response.data.data.resource.links);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });
    }, [url]);

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
                console.log(response.data.data.resource.data);
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

    const [Edit, setEdit] = useState(false);
    return (
        <div>
            <Transition appear show={Edit} as={Fragment}>
                <Dialog as="div" open={Edit} onClose={() => setEdit(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">Edit Qty</h5>
                                        {/* <button type="button" className="text-white-dark hover:text-dark" onClick={() => setEdit(false)}>
                                            <svg>...</svg>
                                        </button> */}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <input type="text" placeholder="Some Text..." className="form-input" required />
                                        </form>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setEdit(false)}>
                                                Kembali
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setEdit(false)}>
                                                Ubah
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
                    <span>Menu Penjualan</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Distribusi </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-lg font-bold">Perkembangan Distribusi</h1>
                <div className="flex mb-4 justify-end">
                    <button type="button" className="btn btn-outline-danger mr-4" onClick={() => {}}>
                        <IconTrashLines className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                        Batal
                    </button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => {}}>
                        <IconSend className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                        Kirim
                    </button>
                </div>
                <form className="space-y-5">
                    <div>
                        <label htmlFor="gridState">Lokasi Tujuan</label>
                        <select id="gridState" className="form-select text-white-dark">
                            <option>Choose...</option>
                            <option>...</option>
                        </select>
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
                            <input id="Qty" type="number" placeholder="Qty..." name={'qty'} className="form-input" />
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
                    <button type="submit" className="btn btn-outline-primary !mt-6 w-full mb-6" onClick={() => {}}>
                        Tambah
                    </button>
                </form>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5"></div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-4 mt-4 flex justify-center">Data Distribusi</h5>
                <div className="datatables">
                    {notFoundData !== 'Data not available' ? (
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
                                    render: () => (
                                        <div className="flex items-center w-max mx-auto gap-2">
                                            {/* <button type="button" style={{ color: 'blue' }}>
                                                    <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                                </button> */}
                                            <button type="button" style={{ color: 'orange' }} onClick={() => setEdit(true)}>
                                                {/* <Link to="/menupenjualan/distribution/editdistribution"> */}
                                                <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                                {/* </Link> */}
                                            </button>
                                            <button type="button" style={{ color: 'red' }} onClick={() => {}}>
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
                    ) : (
                        <div className="w-full h-[200px] flex justify-center flex-col border border-zinc-200 rounded-md items-center font-semibold gap-y-2">
                            <div className="w-16 h-16 rounded-full bg-zinc-300 flex justify-center items-center">
                                <IconDatabase className="w-8 h-8 text-white" />
                            </div>
                            Data Not Found
                        </div>
                    )}
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}
                </div>
            </div>
        </div>
    );
};

export default Distribusi;
