import ReactApexChart from 'react-apexcharts';
import Dropdown from '../components/Dropdown';
import IconCreditCard from '../components/Icon/IconCreditCard';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconPlus from '../components/Icon/IconPlus';
import IconTrendingUp from '../components/Icon/IconTrendingUp';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconMultipleForwardRight from '../components/Icon/IconMultipleForwardRight';
import { setPageTitle } from '../store/themeConfigSlice';

const Ecommerce = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const totalVisit: any = {
        series: [{ data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25] }],
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
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Expenses',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
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
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('E-Commerce'));
    });
    const [loading] = useState(false);
    return (
        <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full sm:col-span-2 lg:col-span-1">
                    {/* statistics */}
                    <div className="flex justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg ">Statistics</h5>
                        <div className="dropdown">
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
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold">
                        <div>
                            <div>
                                <div>Total Visits</div>
                                <div className="text-[#f8538d] text-lg">423,964</div>
                            </div>

                            <ReactApexChart series={totalVisit.series} options={totalVisit.options} type="line" height={58} className="overflow-hidden" />
                        </div>

                        <div>
                            <div>
                                <div>Paid Visits</div>
                                <div className="text-[#f8538d] text-lg">7,929</div>
                            </div>

                            <ReactApexChart series={paidVisit.series} options={paidVisit.options} type="line" height={58} className="overflow-hidden" />
                        </div>
                    </div>
                </div>

                <div className="panel h-full">
                    <div className="flex justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg ">Expenses</h5>

                        <div className="dropdown">
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
                        </div>
                    </div>
                    <div className=" text-[#e95f2b] text-3xl font-bold my-10">
                        <span>$ 45,141 </span>
                        <span className="text-black text-sm dark:text-white-light ltr:mr-2 rtl:ml-2">this week</span>
                        <IconTrendingUp className="text-success inline" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                            <div
                                className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                style={{ width: '65%' }}
                            ></div>
                        </div>
                        <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                    </div>
                </div>

                <div
                    className="panel h-full overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                    style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                >
                    <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                        <h5 className="font-semibold text-lg">Total Balance</h5>

                        <div className="relative text-xl whitespace-nowrap">
                            $ 41,741.42
                            <span className="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto">+ 2453</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between z-10">
                        <div className="flex items-center justify-between">
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                <IconPlus />
                            </button>
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                <IconCreditCard />
                            </button>
                        </div>
                        <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#4361ee] z-10">
                            Upgrade
                        </button>
                    </div>
                </div>
            </div>
            <div className="panel h-full xl:col-span-2">
                <div className="flex items-center justify-between dark:text-white-light mb-5">
                    <h5 className="font-semibold text-lg">Revenue</h5>
                    <div className="dropdown">
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
                    </div>
                </div>
                <p className="text-lg dark:text-white-light/90">
                    Total Profit <span className="text-primary ml-2">$10,840</span>
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
                        <table>
                            <thead>
                                <tr>
                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">Customer</th>
                                    <th>Product</th>
                                    <th>Invoice</th>
                                    <th>Price</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="min-w-[150px] text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-6.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Luke Ivory</span>
                                        </div>
                                    </td>
                                    <td className="text-primary">Headphone</td>
                                    <td>
                                        <Link to="/apps/invoice/preview">#46894</Link>
                                    </td>
                                    <td>$56.07</td>
                                    <td>
                                        <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                    </td>
                                </tr>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-7.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Andy King</span>
                                        </div>
                                    </td>
                                    <td className="text-info">Nike Sport</td>
                                    <td>
                                        <Link to="/apps/invoice/preview">#76894</Link>
                                    </td>
                                    <td>$126.04</td>
                                    <td>
                                        <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                    </td>
                                </tr>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-8.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Laurie Fox</span>
                                        </div>
                                    </td>
                                    <td className="text-warning">Sunglasses</td>
                                    <td>
                                        <Link to="/apps/invoice/preview">#66894</Link>
                                    </td>
                                    <td>$56.07</td>
                                    <td>
                                        <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                    </td>
                                </tr>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-9.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Ryan Collins</span>
                                        </div>
                                    </td>
                                    <td className="text-danger">Sport</td>
                                    <td>
                                        <Link to="/apps/invoice/preview">#75844</Link>
                                    </td>
                                    <td>$110.00</td>
                                    <td>
                                        <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                    </td>
                                </tr>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-10.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Irene Collins</span>
                                        </div>
                                    </td>
                                    <td className="text-secondary">Speakers</td>
                                    <td>
                                        <Link to="/apps/invoice/preview">#46894</Link>
                                    </td>
                                    <td>$56.07</td>
                                    <td>
                                        <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="panel h-full w-full">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Top Selling Product</h5>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr className="border-b-0">
                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">Product</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Sold</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="min-w-[150px] text-black dark:text-white">
                                        <div className="flex">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-headphones.jpg" alt="avatar" />
                                            <p className="whitespace-nowrap">
                                                Headphone
                                                <span className="text-primary block text-xs">Digital</span>
                                            </p>
                                        </div>
                                    </td>
                                    <td>$168.09</td>
                                    <td>$60.09</td>
                                    <td>170</td>
                                    <td>
                                        <Link className="text-danger flex items-center" to="/">
                                            <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                            Direct
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="text-black dark:text-white">
                                        <div className="flex">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-shoes.jpg" alt="avatar" />
                                            <p className="whitespace-nowrap">
                                                Shoes <span className="text-warning block text-xs">Faishon</span>
                                            </p>
                                        </div>
                                    </td>
                                    <td>$126.04</td>
                                    <td>$47.09</td>
                                    <td>130</td>
                                    <td>
                                        <Link className="text-success flex items-center" to="/">
                                            <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                            Google
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="text-black dark:text-white">
                                        <div className="flex">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-watch.jpg" alt="avatar" />
                                            <p className="whitespace-nowrap">
                                                Watch <span className="text-danger block text-xs">Accessories</span>
                                            </p>
                                        </div>
                                    </td>
                                    <td>$56.07</td>
                                    <td>$20.00</td>
                                    <td>66</td>
                                    <td>
                                        <Link className="text-warning flex items-center" to="/">
                                            <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                            Ads
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="text-black dark:text-white">
                                        <div className="flex">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-laptop.jpg" alt="avatar" />
                                            <p className="whitespace-nowrap">
                                                Laptop <span className="text-primary block text-xs">Digital</span>
                                            </p>
                                        </div>
                                    </td>
                                    <td>$110.00</td>
                                    <td>$33.00</td>
                                    <td>35</td>
                                    <td>
                                        <Link className="text-secondary flex items-center" to="/">
                                            <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                            Email
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                    <td className="text-black dark:text-white">
                                        <div className="flex">
                                            <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-camera.jpg" alt="avatar" />
                                            <p className="whitespace-nowrap">
                                                Camera <span className="text-primary block text-xs">Digital</span>
                                            </p>
                                        </div>
                                    </td>
                                    <td>$56.07</td>
                                    <td>$26.04</td>
                                    <td>30</td>
                                    <td>
                                        <Link className="text-primary flex items-center" to="/">
                                            <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                            Referral
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ecommerce;
