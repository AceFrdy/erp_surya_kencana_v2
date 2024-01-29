import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconBox from '../Icon/IconBox';
import IconShoppingCart from '../Icon/IconShoppingCart';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconShare from '../Icon/IconShare';
import IconUsers from '../Icon/IconUsers';
import IconShoppingBag from '../Icon/IconShoppingBag';
import IconSend from '../Icon/IconSend';
import IconUser from '../Icon/IconUser';
import IconLock from '../Icon/IconLock';
import IconDollarSignCircle from '../Icon/IconDollarSignCircle';
import IconCashBanknotes from '../Icon/IconCashBanknotes';
import IconUsersGroup from '../Icon/IconUsersGroup';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';

const Sidebar = ({ akses }: { akses: boolean[] }) => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-2 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            {/* <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" /> */}
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hover:text-primary lg:inline dark:text-white-light">{t('ERP Sinar Kencana')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 ml-2 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 m-auto">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                {akses[0] && (
                                    <NavLink to="/">
                                        <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                            <div className="flex items-center">
                                                <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                            </div>
                                        </button>
                                    </NavLink>
                                )}
                                {akses[1] && (
                                    <NavLink to="/ecommerce">
                                        <button type="button" className={`${currentMenu === 'E-Commerce' ? 'active' : ''} nav-link group w-full`}>
                                            <div className="flex items-center">
                                                <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <IconShoppingCart className="group-hover:!text-primary shrink-0" />
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('E-Commerce')}</span>
                                            </div>
                                        </button>
                                    </NavLink>
                                )}
                            </li>
                            {(akses[2] || akses[3] || akses[4] || akses[5] || akses[6] || akses[7] || akses[8]) && (
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                    <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    <span>{t('Menu Penjualan')}</span>
                                </h2>
                            )}
                            <li className="nav-item">
                                <ul>
                                    {akses[2] && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'product' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('product')}>
                                                <div className="flex items-center">
                                                    <IconBox fill={true} className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Product')}</span>
                                                </div>

                                                <div className={currentMenu === 'product' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenu === 'product' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/menupenjualan/product/produk">{t('Produk')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/menupenjualan/product/kategoriproduk">{t('Kategori Produk')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/menupenjualan/product/unit">{t('Unit')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {akses[3] && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'restock' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('restock')}>
                                                <div className="flex items-center">
                                                    <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <IconBox className="group-hover:!text-primary shrink-0" />
                                                    </svg>
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Restock')}</span>
                                                </div>
                                                <div className={currentMenu === 'restock' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenu === 'restock' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/menupenjualan/restock/restock">{'Restock'}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/menupenjualan/restock/listrestock">{'List Restock'}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {akses[4] && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'cabang' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('cabang')}>
                                                <div className="flex items-center">
                                                    <IconShare className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Cabang')}</span>
                                                </div>
                                                <div className={currentMenu === 'cabang' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenu === 'cabang' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/menupenjualan/cabang/listcabang">{'List Cabang'}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/menupenjualan/cabang/detailcabang">{'Detail Cabang'}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {akses[5] && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'customer' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('customer')}>
                                                <div className="flex items-center">
                                                    <IconUsersGroup className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Customer')}</span>
                                                </div>

                                                <div className={currentMenu === 'customer' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'customer' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/customer/offline">{'Offline'}</NavLink>
                                                        {/* <NavLink to="/menupenjualan/customer/offline">{'Offline'}</NavLink> */}
                                                    </li>
                                                    <li>
                                                        <NavLink to="/customer/online">{'Online'}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {akses[6] && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'penjualan' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('penjualan')}>
                                                <div className="flex items-center">
                                                    <IconShoppingBag className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Penjualan')}</span>
                                                </div>

                                                <div className={currentMenu === 'penjualan' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'penjualan' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/menupenjualan/penjualan/penjualan">{'Penjualan'}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/menupenjualan/penjualan/laporanpenjualan">{'Laporan Penjualan'}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}
                                    {akses[7] && (
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'distribusi' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('distribusi')}>
                                                <div className="flex items-center">
                                                    <IconSend fill={true} className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Distribusi')}</span>
                                                </div>

                                                <div className={currentMenu === 'penjualan' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenu === 'distribusi' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/menupenjualan/distribution/distribution">{'Distribusi'}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/menupenjualan/distribution/laporandistribution">{'Laporan Distribusi'}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    )}

                                    {akses[8] && (
                                        <li className="nav-item">
                                            <NavLink to="/menupenjualan/supplier" className="group">
                                                <div className="flex items-center">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:!text-primary shrink-0">
                                                        <path
                                                            opacity="0.5"
                                                            d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                                            fill="currentColor"
                                                        ></path>
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z"
                                                            fill="currentColor"
                                                        ></path>
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8Z"
                                                            fill="currentColor"
                                                        ></path>
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M7.25 16C7.25 15.5858 7.58579 15.25 8 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H8C7.58579 16.75 7.25 16.4142 7.25 16Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M7.25 16C7.25 15.5858 7.58579 15.25 8 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H8C7.58579 16.75 7.25 16.4142 7.25 16Z"
                                                        fill="currentColor"
                                                    ></path>

                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Supplier')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {(akses[9] || akses[10] || akses[11] || akses[12] || akses[13] || akses[14]) && (
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                    <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    <span>{t('Menu Keuangan')}</span>
                                </h2>
                            )}

                            {akses[9] && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'akun' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('akun')}>
                                        <div className="flex items-center">
                                            <IconUser className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Akun')}</span>
                                        </div>

                                        <div className={currentMenu === 'akun' ? 'rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'akun' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/menukeuangan/akun/akun">{t('Akun')}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/menukeuangan/akun/detailakun">{t('Akun Detail')}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {akses[10] && (
                                <li className="menu nav-item">
                                    <NavLink to="/menukeuangan/controlpanel" className="group">
                                        <div className="flex items-center ">
                                            <IconLock className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Contol Panel')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )}

                            {akses[11] && (
                                <li className="menu nav-item">
                                    <NavLink to="/menukeuangan/saldo" className="group">
                                        <div className="flex items-center">
                                            <IconDollarSignCircle fill={true} className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Saldo')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )}

                            {akses[12] && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'flowcash' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('flowcash')}>
                                        <div className="flex items-center">
                                            <IconDollarSignCircle className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Flow Cash')}</span>
                                        </div>

                                        <div className={currentMenu === 'flowcash' ? 'rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'flowcash' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/menukeuangan/flowcash/uangmasuk">{t('Uang Masuk')}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/menukeuangan/flowcash/uangkeluar">{t('Uang Keluar')}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}
                            {akses[13] && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'hutang-piutang' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('hutang-piutang')}>
                                        <div className="flex items-center">
                                            <IconCashBanknotes fill={true} className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Hutang / Piutang')}</span>
                                        </div>

                                        <div className={currentMenu === 'detailakun' ? 'rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'hutang-piutang' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/menukeuangan/hutang-piutang/hutang">{t('Hutang')}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/menukeuangan/hutang-piutang/piutang">{t('Piutang')}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}
                            {akses[14] && (
                                <li className="menu nav-item">
                                    <NavLink to="/menukeuangan/laporan/laporan" className="group">
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M16.5189 16.5013C16.6939 16.3648 16.8526 16.2061 17.1701 15.8886L21.1275 11.9312C21.2231 11.8356 21.1793 11.6708 21.0515 11.6264C20.5844 11.4644 19.9767 11.1601 19.4083 10.5917C18.8399 10.0233 18.5356 9.41561 18.3736 8.94849C18.3292 8.82066 18.1644 8.77687 18.0688 8.87254L14.1114 12.8299C13.7939 13.1474 13.6352 13.3061 13.4987 13.4811C13.3377 13.6876 13.1996 13.9109 13.087 14.1473C12.9915 14.3476 12.9205 14.5606 12.7786 14.9865L12.5951 15.5368L12.3034 16.4118L12.0299 17.2323C11.9601 17.4419 12.0146 17.6729 12.1708 17.8292C12.3271 17.9854 12.5581 18.0399 12.7677 17.9701L13.5882 17.6966L14.4632 17.4049L15.0135 17.2214L15.0136 17.2214C15.4394 17.0795 15.6524 17.0085 15.8527 16.913C16.0891 16.8004 16.3124 16.6623 16.5189 16.5013Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M22.3665 10.6922C23.2112 9.84754 23.2112 8.47812 22.3665 7.63348C21.5219 6.78884 20.1525 6.78884 19.3078 7.63348L19.1806 7.76071C19.0578 7.88348 19.0022 8.05496 19.0329 8.22586C19.0522 8.33336 19.0879 8.49053 19.153 8.67807C19.2831 9.05314 19.5288 9.54549 19.9917 10.0083C20.4545 10.4712 20.9469 10.7169 21.3219 10.847C21.5095 10.9121 21.6666 10.9478 21.7741 10.9671C21.945 10.9978 22.1165 10.9422 22.2393 10.8194L22.3665 10.6922Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9C15.25 9.41421 14.9142 9.75 14.5 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H11C11.4142 12.25 11.75 12.5858 11.75 13C11.75 13.4142 11.4142 13.75 11 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13ZM7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H9.5C9.91421 16.25 10.25 16.5858 10.25 17C10.25 17.4142 9.91421 17.75 9.5 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Laporan')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )}
                            {(akses[15] || akses[16]) && (
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                    <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    <span>{t('Menu Human Resource')}</span>
                                </h2>
                            )}
                            {akses[15] && (
                                <li className="menu nav-item">
                                    <NavLink to="/menuhumanresource/karyawan" className="group">
                                        <div className="flex items-center">
                                            <IconUsers className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Karyawan')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )}
                            {akses[16] && (
                                <li className="menu nav-item">
                                    <NavLink to="/menuhumanresource/jabatan" className="group">
                                        <div className="flex items-center">
                                            <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Jabatan')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )}

                            {akses[17] && (
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                    <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    <span>{t('Menu Pengguna')}</span>
                                </h2>
                            )}
                            {akses[17] && (
                                <li className="menu nav-item">
                                    <NavLink to="/menupengguna/hakakses" className="group">
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                                                    fill="currentColor"
                                                />
                                                <path d="M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z" fill="currentColor" />
                                                <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor" />
                                                <path d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="currentColor" />
                                                <path
                                                    d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C17.8174 10.0089 18.3135 10.022 18.75 10.0546V8C18.75 4.27208 15.7279 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C5.68651 10.022 6.18264 10.0089 6.75 10.0036V8Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Hak Akses')}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            )}

                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle opacity="0.5" cx="15" cy="6" r="3" fill="currentColor" />
                                            <ellipse opacity="0.5" cx="16" cy="17" rx="5" ry="3" fill="currentColor" />
                                            <circle cx="9.00098" cy="6" r="4" fill="currentColor" />
                                            <ellipse cx="9.00098" cy="17.001" rx="7" ry="4" fill="currentColor" />
                                        </svg>
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('users')}</span>
                                    </div>

                                    <div className={currentMenu === 'users' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/menupengguna/akun">{t('Akun')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/menupengguna/akun/akundetail">{t('Akun Detail')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
