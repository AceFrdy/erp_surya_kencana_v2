import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { endpoint, formatPrice } from '../../../utils';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

interface InitialProps {
    id: number;
    product_name: string;
    distribution_qty: number;
    product_price: number;
    total_price: number;
    distribution_code: string;
}

const DetailRestock = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Restock'));
    });
    const [initialRecords, setInitialRecords] = useState<InitialProps[]>([]);
    const [statusKode, setStatusKode] = useState<string>('');
    const [distribusiCode, setDistribusiCode] = useState<string>('');

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const { id } = useParams();
    const navigate = useNavigate();

    // get data
    useEffect(() => {
        axios
            .get(`${endpoint}/api/distribution-reports/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.distributions);
                setStatusKode(response.data.data.resource.status);
                setDistribusiCode(response.data.data.resource.distributions[0].distribution_code);
            })
            .catch((err: any) => {
                console.log('GET DISTRIBRUTION REPORT', err.message);
            });
    }, []);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

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
                    <span> Detail Restock </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <button type="button" className=" px-2 btn btn-outline-info" onClick={() => navigate(-1)}>
                        <IconArrowBackward className="flex mx-2" fill={true} /> Kembali
                    </button>
                </div>

                <h1 className="text-lg font-bold mb-4 flex items-center">
                    Kode: {distribusiCode}{' '}
                    <span className={`badge whitespace-nowrap ml-2 ${statusKode === 'selesai' ? 'bg-primary' : statusKode === 'pending' ? 'bg-secondary' : 'bg-success'}`}>{statusKode}</span>
                </h1>
                <div className="flex gap-x-8 items-center w-full mb-8">
                    <div className="w-full">
                        <label htmlFor="gridState">Supplier</label>
                        <input id="gridState" type="text" value={'udin'} disabled className="form-input" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="Opcost">Operasional Cost</label>
                        <input id="Opcost" type="text" value={formatPrice(29103239)} disabled className="form-input" />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">Detail Restock</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                            { accessor: 'product_name', title: 'Nama Produk', sortable: true },
                            {
                                accessor: 'product_price',
                                title: 'Harga',
                                sortable: true,
                                render: (e) => formatPrice(e.product_price),
                            },
                            { accessor: 'distribution_qty', title: 'Qty', sortable: true },
                            { accessor: 'total_price', title: 'Total Harga', sortable: true, render: (e) => formatPrice(e.total_price) },
                        ]}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailRestock;
