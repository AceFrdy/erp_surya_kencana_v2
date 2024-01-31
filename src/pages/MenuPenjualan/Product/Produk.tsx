import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { useModal } from '../../../hooks/use-modal';
import Pagination from '../../../components/Pagination';
import IconPlus from '../../../components/Icon/IconPlus';
import IconPencil from '../../../components/Icon/IconPencil';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, ProductList, formatPrice } from '../../../utils';

import 'react-toastify/dist/ReactToastify.css';

const Produk = () => {
    const { onOpen } = useModal();
    const dispatch = useDispatch();

    const token = localStorage.getItem('accessToken') ?? '';

    const [initialRecords, setInitialRecords] = useState<ProductList[]>([]);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    // get produk
    useEffect(() => {
        const url = `https://erp.digitalindustryagency.com/api/products${search && page ? '?q=' + search + '&&page=' + page : search ? '?q=' + search : page && '?page=' + page}`;
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
            .catch((err: any) => {
                if (err.response && err.response.status === 500) {
                    localStorage.setItem('error', '500');
                } else if (err.response && err.response.status === 503) {
                    localStorage.setItem('error', '503');
                } else {
                    console.log('ERROR_GETTING_DATA:', err.message);
                }
            });
    }, [page, search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

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

    // page-title
    useEffect(() => {
        dispatch(setPageTitle('Produk'));
    });

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
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">Data Produk</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
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
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setPage} />}
                </div>
            </div>
        </div>
    );
};

export default Produk;
