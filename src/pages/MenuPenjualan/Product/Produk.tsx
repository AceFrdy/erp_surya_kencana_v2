import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState, Fragment } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, formatPrice } from '../../../utils';
import { useModal } from '../../../hooks/use-modal';
import IconPlus from '../../../components/Icon/IconPlus';
import IconPencil from '../../../components/Icon/IconPencil';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';

import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../../../components/Pagination';

interface StockProps {
    branch_id: number;
    stock_qty: number;
}

interface ProductList {
    id: number;
    product_image: string;
    product_barcode: string;
    product_name: string;
    product_stock: StockProps[];
    product_price: number;
}

const Produk = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Produk'));
    });
    const [initialRecords, setInitialRecords] = useState<ProductList[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const { onOpen } = useModal();

    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return item.product_name.toLowerCase().includes(search.toLowerCase()) || item.product_barcode.toLowerCase().includes(search.toLowerCase());
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, recordsData]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/products');

    // get produk
    useEffect(() => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const product = response.data.data.resource.data;
                setInitialRecords(product);
                setMetaLink(response.data.data.resource.meta);
                setMetaLinksLink(response.data.data.resource.meta.links);
                setLinksLink(response.data.data.resource.links);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url]);

    useEffect(() => {
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
                    <span> Produk</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <Link to="/menupenjualan/product/produk/addproduk">
                        <button type="button" className=" px-2 btn btn-outline-info">
                            <IconPlus className="flex mx-2" fill={true} /> Add
                        </button>
                    </Link>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">Data Produk</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => recordsData.indexOf(e) + 1 },
                            {
                                accessor: 'product_image',
                                title: 'Foto',
                                sortable: true,
                                render: (e) => (
                                    <div className="flex items-center w-max ">
                                        <img className="w-16 h-16 ltr:mr-2 rtl:ml-2 object-cover rounded-md overflow-hidden" src={e.product_image} alt="" />
                                    </div>
                                ),
                            },
                            {
                                accessor: 'product_barcode',
                                title: 'Barcode',
                                sortable: true,
                            },
                            {
                                accessor: 'product_name',
                                title: 'Nama',
                                sortable: true,
                            },
                            {
                                accessor: 'product_stock',
                                title: 'Stok',
                                sortable: true,
                                render: (e) => (e.product_stock.find((item) => item.branch_id === 1)?.stock_qty ? e.product_stock.find((item) => item.branch_id === 1)?.stock_qty : '-'),
                            },
                            {
                                accessor: 'product_price',
                                title: 'Harga',
                                sortable: true,
                                render: (e) => formatPrice(e.product_price),
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (e) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'orange' }}>
                                            <Link to={`/menupenjualan/product/produk/editproduk/${e.id}`}>
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>

                                        <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-product', e.id)}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
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

export default Produk;
