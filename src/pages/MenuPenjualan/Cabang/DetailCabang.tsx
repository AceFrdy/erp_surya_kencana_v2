import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import Dropdown from '../../../components/Dropdown';
import { IRootState } from '../../../store';
import IconCaretDown from '../../../components/Icon/IconCaretDown';
import axios from 'axios';
import { formatPrice } from '../../../utils';

interface BranchDataProps {
    id: number;
    branch_name: string;
}

interface StockDataProps {
    branch_id: number;
    stock_qty: number;
    stock_qty_unit: number;
    filteredStockData: string;
}

interface PenjualanDataProps {
    id: number;
    sale_report_invoice: string;
    branch: {
        id: number;
    };
    user: {
        id: number;
        name: string;
    };
    sale_report_grand_total: number;
    filteredPenjualan: string;
    sale_report_status: string;
}

const DetailCabang = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('DetailCabang'));
    });
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // branch
    const [branchList, setBranchList] = useState<BranchDataProps[]>([]);
    const [branch, setBranch] = useState<string>('-');
    const [selectedBranch, setSelectedBranch] = useState<BranchDataProps | null>(null);
    
    // Sale &stock
    const [penjualan, setPenjualan] = useState<PenjualanDataProps[]>([]);
    const [stock, setStock] = useState<StockDataProps[]>([]);
    
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/branches', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setBranchList(response.data.data.resource.data);
                console.log('BRANCH', branch);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios
            .get('https://erp.digitalindustryagency.com/api/stocks', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setStock(response.data.data.resource.data);
                console.log('STOCK', response.data.data.resource.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [setBranchList, token]);

    const handleBranchSelect = (selectedBranch: BranchDataProps) => {
        setSelectedBranch(selectedBranch);
        setBranch(selectedBranch.branch_name);
    };
    const handleGetSalesDetailBranch = () => {
        if (!selectedBranch) {
            return;
        }
        const branch_id = selectedBranch.id;
        axios
            .get(`https://erp.digitalindustryagency.com/api/branch-sales-details/${branch_id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPenjualan(response.data.data.resource);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleGetStockBranch = () => {
        if (!selectedBranch) {
            return;
        }
        const branch_id = selectedBranch.id;

        axios
            .get(`https://erp.digitalindustryagency.com/api/branch-products/${branch_id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setStock(response.data.data.resource);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        handleGetSalesDetailBranch();
        handleGetStockBranch();
    }, [selectedBranch, token]);

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
                    <span> Detail Cabang </span>
                </li>
            </ul>
            <div className="flex items-center justify-end">
                <div className="mb-5">
                    <div className="flex flex-wrap w-full gap-7 justify-around">
                        <div className="flex items-center justify-center">
                            {branch && (
                                <div className="dropdown">
                                    <Dropdown
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="btn btn-outline-primary dropdown-toggle"
                                        button={
                                            <>
                                                {selectedBranch ? (
                                                    <>
                                                        {selectedBranch.branch_name}
                                                        <span>
                                                            <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        Select a Branch
                                                        <span>
                                                            <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                                        </span>
                                                    </>
                                                )}
                                            </>
                                        }
                                    >
                                        <ul className="!min-w-[170px]">
                                            {branchList.map((recordsData) => (
                                                <li key={recordsData.id}>
                                                    <button type="button" onClick={() => handleBranchSelect(recordsData)}>
                                                        {recordsData.branch_name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </Dropdown>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-lg dark:text-white-light mb-5 font-semibold">Detail Cabang</h1>
            <div className="mx-5">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap justify-center border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? '!border-white-light !border-b-white text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''
                                    } ' -mb-[1px] block border border-transparent p-3.5 py-2 hover:border-white-light hover:border-b-white dark:hover:border-[#191e3a] dark:hover:border-b-black`}
                                >
                                    Penjualan
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? '!border-white-light !border-b-white text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''
                                    } dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:border-white-light hover:border-b-white dark:hover:border-[#191e3a]`}
                                >
                                    Stock
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="active pt-5 panel">
                                <DataTable
                                    highlightOnHover
                                    className="whitespace-nowrap table-hover"
                                    records={penjualan}
                                    columns={[
                                        { accessor: 'id', title: 'No', render: (e) => penjualan.indexOf(e) + 1 },
                                        {
                                            accessor: 'sale_report_invoice',
                                            title: 'No Dokumen',
                                            sortable: true,
                                        },
                                        {
                                            accessor: 'sale_report_customer',
                                            title: 'Pelanggan',
                                            sortable: true,
                                        },
                                        { accessor: 'sale_report_grand_total', title: 'Total', sortable: true,render: (e) => formatPrice(e.sale_report_grand_total),
                                    },
                                        {
                                            accessor: 'sale_report_status',
                                            title: 'Status',
                                            sortable: true,
                                            render: (data) => (
                                                <span className={`badge whitespace-nowrap ${data.sale_report_status === 'lunas' ? 'bg-primary' : data.sale_report_status === 'hutang' ? 'bg-danger' : 'bg-success'}`}>
                                                    {data.sale_report_status}
                                                </span>
                                            ),
                                        },
                                    ]}
                                    sortStatus={sortStatus}
                                    onSortStatusChange={setSortStatus}
                                    minHeight={200}
                                />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid xl:grid-cols-1 gap-6 grid-cols-1">
                                <div className="datatables panel xl:col-span-2">
                                    <DataTable
                                        highlightOnHover
                                        className="whitespace-nowrap table-hover"
                                        records={stock}
                                        columns={[
                                            { accessor: 'id', title: 'No', sortable: true, render: (e) => stock.indexOf(e) + 1 },
                                            {
                                                accessor: 'product.product_barcode',
                                                title: 'Barcode',
                                                sortable: true,
                                            },
                                            {
                                                accessor: 'product.product_name',
                                                title: 'Nama Barang',
                                                sortable: true,
                                            },
                                            { accessor: 'stock_category', title: 'Kategori', sortable: true },
                                            { accessor: 'stock_qty', title: 'Qty', sortable: true },
                                        ]}
                                        sortStatus={sortStatus}
                                        onSortStatusChange={setSortStatus}
                                        minHeight={200}
                                    />
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="pt-5">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>Disabled</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};
export default DetailCabang;
