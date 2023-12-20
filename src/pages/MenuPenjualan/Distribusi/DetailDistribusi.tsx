import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { formatPrice } from '../../../utils';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

interface DetailDistribution {
    product: {
        distribution_code: string;
        product_barcode: string;
        product_name: string;
        product_price: number;
    };
    distribution_qty: number;
    total_price: number;
}

const DetailDistribusi = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Distribusi'));
    });
    const token = localStorage.getItem('accessToken') ?? '';

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const { id } = useParams();
    const [initialRecords, setInitialRecords] = useState<DetailDistribution[]>([]);
    const [branchName, setBranchName] = useState<string>('');

    // get distribution report by id
    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/distribution-reports/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.distributions);
                setBranchName(response.data.data.resource.branch.branch_name);
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
                    <span> Distribusi </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-lg font-bold">Perkembangan Distribusi</h1>
                <div className="flex mb-4 justify-end">
                    <Link to="/menupenjualan/distribution/laporandistribution">
                        <button type="button" className="btn btn-outline-primary">
                            <IconArrowBackward className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                            Kembali
                        </button>
                    </Link>
                </div>
                <form className="space-y-5">
                    <div>
                        <p>Lokasi Tujuan</p>
                        <input value={branchName} className="form-input text-black border-zinc-300 mt-2" disabled />
                    </div>
                </form>

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
                            {
                                accessor: 'product.product_price',
                                title: 'Harga',
                                sortable: true,
                                render: (e) => formatPrice(e.product.product_price),
                            },
                            { accessor: 'distribution_qty', title: 'Qty', sortable: true },
                            { accessor: 'total_price', title: 'Harga Total', sortable: true, render: (e) => formatPrice(e.total_price) },
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

export default DetailDistribusi;
