import clsx from 'clsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DataTable } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../store';
import { formatPrice } from '../utils';
import { setPageTitle } from '../store/themeConfigSlice';
import { CashFlowProps, DashboardCard, RecentOrderProps, TopSellingProps, iconClassFlow } from '../lib/utils';
import { Navigate } from 'react-router-dom';

const Index = () => {
    // sistem
    const dispatch = useDispatch();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    // state management
    const [error, setError] = useState('');
    const [recent, setRecent] = useState<RecentOrderProps[]>([]);
    const [cashFlow, setCashFlow] = useState<CashFlowProps[]>([]);
    const [topSelling, setTopSelling] = useState<TopSellingProps[]>([]);
    const [anualSelling, setAnualSelling] = useState<[]>([]);
    const [card, setCard] = useState<DashboardCard>({
        total_sales: 0,
        revenue: 0,
        total_customers: 0,
        total_employers: 0,
    });

    const token = localStorage.getItem('accessToken') ?? '';
    const uniqueVisitorSeries: any = {
        series: [
            {
                name: 'sales',
                data: anualSelling,
            },
        ],
        options: {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                colors: ['transparent'],
            },
            colors: ['#5c1ac3', '#ffbb44'],
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: true,
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: !!isRtl,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
            },
        },
    };

    // function
    const getFirstWord = (data: string) => {
        return data
            .split(' ')
            .slice(0, 2)
            .map((item) => item.charAt(0));
    };
    const getClassIconCashFlow = (data: number): string => iconClassFlow[data] || '';

    // get_data
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/dashboard', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCard(response.data.data.resource);
                setRecent(response.data.data.resource.recent_orders);
                setCashFlow(response.data.data.resource.cash_flows);
                setTopSelling(response.data.data.resource.top_selling_product);
                setAnualSelling(response.data.data.resource.anual_sales.map((item: any) => item.total_sales));
            })
            .catch((err: any) => {
                if (err.response && err.response.status === 500) {
                    setError('500');
                } else if (err.response && err.response.status === 503) {
                    setError('503');
                } else {
                    console.log('ERROR_GETTING_Data:', err.message);
                }
            });
    }, []);

    // page-title
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
    }, []);

    if (error === '503') {
        return <Navigate to="/pages/error/error503" />;
    } else if (error === '500') {
        return <Navigate to="/pages/error/error500" />;
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Penjualan</div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {formatPrice(card.total_sales)} </div>
                    </div>
                </div>

                {/* Sessions */}
                <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Revenue</div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {formatPrice(card.revenue)} </div>
                    </div>
                </div>

                {/*  Time On-Site */}
                <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Customer</div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                            {' '}
                            {card.total_customers} <span className="text-base">Customers</span>
                        </div>
                    </div>
                </div>

                {/* Bounce Rate */}
                <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Karyawan</div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                            {' '}
                            {card.total_employers} <span className="text-base">Karyawan</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full p-0 lg:col-span-2">
                    <div className="flex items-start justify-between dark:text-white-light mb-5 p-5 border-b  border-white-light dark:border-[#1b2e4b]">
                        <h5 className="font-semibold text-lg ">Penjualan</h5>
                    </div>

                    <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} className="overflow-hidden" />
                </div>
                <div className="panel h-full">
                    <div className="flex items-center justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg">Cash Flow</h5>
                    </div>
                    <div>
                        <div className="space-y-6">
                            {cashFlow.slice(0, 6).map((item) => (
                                <div className="flex" key={cashFlow.indexOf(item) + 1}>
                                    <span
                                        className={clsx(
                                            `shrink-0 grid place-content-center w-9 h-9 rounded-md text-xs font-bold uppercase tracking-wide`,
                                            getClassIconCashFlow(cashFlow.indexOf(item) + 1)
                                        )}
                                    >
                                        {getFirstWord(item.index.index_info)}
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>{item.index.index_info}</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">{item.date}</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">{formatPrice(item.amount)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div className="panel h-full w-full">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Recent Orders</h5>
                    </div>
                    <div className="table-responsive">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={recent}
                            idAccessor="sale_report_invoice"
                            columns={[
                                { accessor: 'id', title: 'No', render: (e) => recent.indexOf(e) + 1 },
                                {
                                    accessor: 'sale_report_invoice',
                                    title: 'Invoice',
                                },
                                {
                                    accessor: 'sale_report_customer',
                                    title: 'Customer',
                                },
                                {
                                    accessor: 'sale_report_grand_total',
                                    title: 'Price',
                                    render: (e) => formatPrice(e.sale_report_grand_total),
                                },
                                {
                                    accessor: 'sale_report_status',
                                    title: 'Status',
                                    render: (e) => (
                                        <span
                                            className={clsx(
                                                'px-3 py-1 rounded font-semibold text-sm',
                                                e.sale_report_status === 'lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            )}
                                        >
                                            {e.sale_report_status}
                                        </span>
                                    ),
                                },
                            ]}
                            minHeight={200}
                        />
                    </div>
                </div>

                <div className="panel h-full w-full">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Top Selling Product</h5>
                    </div>
                    <div className="table-responsive">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={topSelling}
                            idAccessor="product_name"
                            columns={[
                                { accessor: 'id', title: 'No', render: (e) => topSelling.indexOf(e) + 1 },
                                {
                                    accessor: 'product_name',
                                    title: 'Produk',
                                },
                                {
                                    accessor: 'total_sold',
                                    title: 'Qty',
                                },
                                {
                                    accessor: 'product_price',
                                    title: 'Price',
                                    render: (e) => formatPrice(e.product_price),
                                },
                                {
                                    accessor: 'branch_name',
                                    title: 'Cabang',
                                },
                            ]}
                            minHeight={200}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
