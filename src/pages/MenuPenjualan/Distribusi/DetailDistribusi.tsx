import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import IconSend from '../../../components/Icon/IconSend';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import axios from 'axios';
import { formatPrice } from '../../../utils';
import Pagination from '../../../components/Pagination';

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

const DetailDistribusi = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Distribusi'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const token = localStorage.getItem('accessToken') ?? '';

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const { id } = useParams();
    const [initialRecords, setInitialRecords] = useState<DetailDistribution[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [branchName, setBranchName] = useState<string>('');

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>(`https://erp.digitalindustryagency.com/api/distribution-reports/${id}`);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // get distribution report by id
    useEffect(() => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.distributions);
                setBranchName(response.data.data.resource.branch.branch_name);

                // page
                setMetaLink(response.data.data.resource.meta);
                setMetaLinksLink(response.data.data.resource.meta.links);
                setLinksLink(response.data.data.resource.links);
            })
            .catch((err: any) => {
                console.log('GET DISTRIBRUTION REPORT', err.message);
            });
    }, []);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
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
                    {/* <button type="button" className="btn btn-outline-danger mr-4" onClick={() => showAlert(11)}>
                        <IconTrashLines className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                        Batal
                    </button> */}
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
                        <input value={branchName} className="form-input text-black border-zinc-300" disabled />
                    </div>
                </form>

                <h5 className="font-semibold text-lg dark:text-white-light mb-4 mt-4 flex justify-center">Data Distribusi</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => recordsData.indexOf(e) + 1 },
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
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}
                </div>
            </div>
        </div>
    );
};

export default DetailDistribusi;
