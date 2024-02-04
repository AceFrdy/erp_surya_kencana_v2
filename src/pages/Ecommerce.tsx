import ReactApexChart from 'react-apexcharts';
import Dropdown from '../components/Dropdown';
import IconCreditCard from '../components/Icon/IconCreditCard';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconPlus from '../components/Icon/IconPlus';
import IconTrendingUp from '../components/Icon/IconTrendingUp';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
// import IconMultipleForwardRight from '../components/Icon/IconMultipleForwardRight';
import { setPageTitle } from '../store/themeConfigSlice';
import { RecentOrderProps, TopSellingProps, formatPrice, CashFlowProps, TotalSales, } from '../utils'; 
import axios from 'axios';
import clsx from 'clsx';
import { DataTable } from 'mantine-datatable';

const Ecommerce = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [recent, setRecent] = useState<RecentOrderProps[]>([]);
    const [topSelling, setTopSelling] = useState<TopSellingProps[]>([]);
    const token = localStorage.getItem('accessToken') ?? '';
    const [error, setError] = useState('');
    const [cashFlow, setCashFlow] = useState<CashFlowProps[]>([]);
    const [anualSelling, setAnualSelling] = useState<[]>([]);
    const [total, setTotal] = useState<TotalSales>({
        total_sales: 0,
        revenue: 0,
        total_customers: 0,
        total_employers: 0,
    });
    const totalVisit: any = {
        series: [
            {
                name: 'sales',
                data: cashFlow,
            },
        ],
        options: {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#009688',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#009688'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    // paidVisitOptions
    const paidVisit: any = {
        series: [{ data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69] }],
        options: {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#e2a03f',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#e2a03f'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    const revenueChart: any = {
        series: [
            {
                name: 'Income',
                data: cashFlow.slice(0, 5).map(item => item.amount),
            },
            {
                name: 'Expenses',
                data: [16500, 175000, 162000, 17300, 160000,],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 4,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 4,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/dashboard', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // setCard(response.data.data.resource);
                setRecent(response.data.data.resource.recent_orders);
                setCashFlow(response.data.data.resource.cash_flows);
                setTopSelling(response.data.data.resource.top_selling_product);
                setTotal(response.data.data.resource);
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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('E-Commerce'));
    });
    if (error === '503') {
        return <Navigate to="/pages/error/error503" />;
    } else if (error === '500') {
        return <Navigate to="/pages/error/error500" />;
    }
    const [loading] = useState(false);
    return (
        <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full sm:col-span-2 lg:col-span-1">
                    {/* statistics */}
                    <div className="flex justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg ">Statistics</h5>
                        {/* <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="hover:text-primary"
                                button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                            >
                                <ul>
                                    <li>
                                        <button type="button">This Week</button>
                                    </li>
                                    <li>
                                        <button type="button">Last Week</button>
                                    </li>
                                    <li>
                                        <button type="button">This Month</button>
                                    </li>
                                    <li>
                                        <button type="button">Last Month</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div> */}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold">
                        <div>
                            <div>
                                <div>Total Visits</div>
                                <div className="text-[#f8538d] text-lg">{total.total_customers}</div>
                            </div>

                            {/* <ReactApexChart series={totalVisit.series} options={totalVisit.options} type="line" height={58} className="overflow-hidden" /> */}
                        </div>

                        <div>
                            <div>
                                <div>Paid Visits</div>
                                <div className="text-[#f8538d] text-lg">{total.total_employers}</div>
                            </div>

                            {/* <ReactApexChart series={paidVisit.series} options={paidVisit.options} type="line" height={58} className="overflow-hidden" /> */}
                        </div>
                    </div>
                </div>

                <div className="panel h-full">
                    <div className="flex justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg ">Expenses</h5>

                        {/* <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="hover:text-primary"
                                button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                            >
                                <ul>
                                    <li>
                                        <button type="button">This Week</button>
                                    </li>
                                    <li>
                                        <button type="button">Last Week</button>
                                    </li>
                                    <li>
                                        <button type="button">This Month</button>
                                    </li>
                                    <li>
                                        <button type="button">Last Month</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div> */}
                    </div>
                    <div className=" text-[#e95f2b] text-3xl font-bold my-10">
                        <span>{formatPrice(total.total_sales)} </span>
                        <span className="text-black text-sm dark:text-white-light ltr:mr-2 rtl:ml-2">this week</span>
                        <IconTrendingUp className="text-success inline" />
                    </div>
                    {/* <div className="flex items-center justify-between">
                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                            <div
                                className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                style={{ width: '65%' }}
                            ></div>
                        </div>
                        <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                    </div> */}
                </div>

                <div
                    className="panel h-full overflow-hidden before:bg-[#304D30] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                    style={{ background: 'linear-gradient(0deg,#304D30 -227%,#B6C4B6)' }}
                >
                    <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                        <h5 className="font-semibold text-lg text-dark dark:text-white">Login E-commerce</h5>

                        {/* <div className="relative text-xl whitespace-nowrap">
                            $ 41,741.42
                            <span className="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto">+ 2453</span>
                        </div> */}
                    </div>
                    <div className="flex items-center justify-between z-10">
                        {/* <div className="flex items-center justify-between">
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                <IconPlus />
                            </button>
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                <IconCreditCard />
                            </button>
                        </div> */}
                        <a href='https://dashboard-ecommers.digitalindustryagency.com/'>
                        <button type="button" className="btn btn-gradient !mt-6 border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                            E-commerce
                        </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="panel h-full xl:col-span-2">
                <div className="flex items-center justify-between dark:text-white-light mb-5">
                    <h5 className="font-semibold text-lg">Revenue</h5>
                    {/* <div className="dropdown">
                        <Dropdown
                            offset={[0, 1]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                        >
                            <ul>
                                <li>
                                    <button type="button">Weekly</button>
                                </li>
                                <li>
                                    <button type="button">Monthly</button>
                                </li>
                                <li>
                                    <button type="button">Yearly</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div> */}
                </div>
                <p className="text-lg dark:text-white-light/90">
                    Total Profit <span className="text-primary ml-2">{formatPrice(total.revenue)}</span>
                </p>
                <div className="relative">
                    <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                        {loading ? (
                            <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                            </div>
                        ) : (
                            <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />
                        )}
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
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

export default Ecommerce;
