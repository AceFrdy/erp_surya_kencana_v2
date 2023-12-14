import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
// import IconBell from '../../../components/Icon/IconBell';
// import IconXCircle from '../../../components/Icon/IconXCircle';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
// import { Dialog, Transition } from '@headlessui/react';
import IconPlus from '../../../components/Icon/IconPlus';
import axios from 'axios';
import { formatPrice } from '../../../utils';
import { useModal } from '../../../hooks/use-modal';

interface ProductList {
    id: number;
    product_image: string;
    product_pos: string;
    product_name: string;
    product_stock: number;
    product_price: number;
}

const Produk = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Produk'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ProductList[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const { onOpen } = useModal();

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return item.product_name.toLowerCase().includes(search.toLowerCase());
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    // get produk
    useEffect(() => {
        const id = setInterval(() => {
            axios
                .get('https://erp.digitalindustryagency.com/api/products', {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const product = response.data.data.resource.data;
                    setInitialRecords(product);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }, 2000);
        return () => clearInterval(id);
    }, [initialRecords]);

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
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            {
                                accessor: 'product_image',
                                title: 'Foto',
                                sortable: true,
                                render: (e) => (
                                    <div className="flex items-center w-max">
                                        <img className="w-16 h-16 ltr:mr-2 rtl:ml-2 object-cover" src={e.product_image} alt="" />
                                    </div>
                                ),
                            },
                            {
                                accessor: 'product_pos',
                                title: 'Code',
                                sortable: true,
                            },
                            {
                                accessor: 'product_name',
                                title: 'Nama',
                                sortable: true,
                            },
                            {
                                accessor: 'product_stock',
                                title: 'Qty',
                                sortable: true,
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
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Produk;
