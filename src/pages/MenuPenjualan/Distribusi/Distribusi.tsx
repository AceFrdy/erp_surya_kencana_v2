import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import IconSend from '../../../components/Icon/IconSend';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Pagination from '../../../components/Pagination';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        status: 'Completed',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        status: 'Pending',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Tillman',
        lastName: 'Forbes',
        email: 'tillmanforbes@manglo.com',
        dob: '2016-09-05',
        status: 'In Progress',
        address: {
            street: '240 Vandalia Avenue',
            city: 'Thynedale',
            zipcode: 8994,
            geo: {
                lat: -34.949388,
                lng: -82.958111,
            },
        },
        phone: '+1 (969) 496-2892',
        isActive: false,
        age: 26,
        company: 'APPLIDECK',
    },
    {
        id: 4,
        firstName: 'Daisy',
        lastName: 'Whitley',
        email: 'daisywhitley@applideck.com',
        dob: '1987-03-23',
        status: 'Canceled',
        address: {
            street: '350 Pleasant Place',
            city: 'Idledale',
            zipcode: 9369,
            geo: {
                lat: -54.458809,
                lng: -127.476556,
            },
        },
        phone: '+1 (861) 564-2877',
        isActive: true,
        age: 21,
        company: 'VOLAX',
    },
    {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        status: 'Completed',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+1 (962) 466-3483',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    },
    {
        id: 6,
        firstName: 'Buckley',
        lastName: 'Townsend',
        email: 'buckleytownsend@orbaxter.com',
        dob: '2011-05-29',
        status: 'Completed',
        address: {
            street: '131 Guernsey Street',
            city: 'Vallonia',
            zipcode: 6779,
            geo: {
                lat: -2.681655,
                lng: 3.528942,
            },
        },
        phone: '+1 (884) 595-2643',
        isActive: true,
        age: 40,
        company: 'OPPORTECH',
    },
    {
        id: 7,
        firstName: 'Latoya',
        lastName: 'Bradshaw',
        email: 'latoyabradshaw@opportech.com',
        dob: '2010-11-23',
        status: 'Canceled',
        address: {
            street: '668 Lenox Road',
            city: 'Lowgap',
            zipcode: 992,
            geo: {
                lat: 36.026423,
                lng: 130.412198,
            },
        },
        phone: '+1 (906) 474-3155',
        isActive: true,
        age: 24,
        company: 'GORGANIC',
    },
    {
        id: 8,
        firstName: 'Kate',
        lastName: 'Lindsay',
        email: 'katelindsay@gorganic.com',
        dob: '1987-07-02',
        status: 'Pending',
        address: {
            street: '773 Harrison Avenue',
            city: 'Carlton',
            zipcode: 5909,
            geo: {
                lat: 42.464724,
                lng: -12.948403,
            },
        },
        phone: '+1 (930) 546-2952',
        isActive: true,
        age: 24,
        company: 'AVIT',
    },
    {
        id: 9,
        firstName: 'Marva',
        lastName: 'Sandoval',
        email: 'marvasandoval@avit.com',
        dob: '2010-11-02',
        status: 'Completed',
        address: {
            street: '200 Malta Street',
            city: 'Tuskahoma',
            zipcode: 1292,
            geo: {
                lat: -52.206169,
                lng: 74.19452,
            },
        },
        phone: '+1 (927) 566-3600',
        isActive: false,
        age: 28,
        company: 'QUILCH',
    },
    {
        id: 10,
        firstName: 'Decker',
        lastName: 'Russell',
        email: 'deckerrussell@quilch.com',
        dob: '1994-04-21',
        status: 'In Progress',
        address: {
            street: '708 Bath Avenue',
            city: 'Coultervillle',
            zipcode: 1268,
            geo: {
                lat: -41.550295,
                lng: -146.598075,
            },
        },
        phone: '+1 (846) 535-3283',
        isActive: false,
        age: 27,
        company: 'MEMORA',
    },
    {
        id: 11,
        firstName: 'Odom',
        lastName: 'Mills',
        email: 'odommills@memora.com',
        dob: '2010-01-24',
        address: {
            street: '907 Blake Avenue',
            city: 'Churchill',
            zipcode: 4400,
            geo: {
                lat: -56.061694,
                lng: -130.238523,
            },
        },
        phone: '+1 (995) 525-3402',
        isActive: true,
        age: 34,
        company: 'ZORROMOP',
    },
    {
        id: 12,
        firstName: 'Sellers',
        lastName: 'Walters',
        email: 'sellerswalters@zorromop.com',
        dob: '1975-11-12',
        address: {
            street: '978 Oakland Place',
            city: 'Gloucester',
            zipcode: 3802,
            geo: {
                lat: 11.732587,
                lng: 96.118099,
            },
        },
        phone: '+1 (830) 430-3157',
        isActive: true,
        age: 28,
        company: 'ORBOID',
    },
    {
        id: 13,
        firstName: 'Wendi',
        lastName: 'Powers',
        email: 'wendipowers@orboid.com',
        dob: '1979-06-02',
        address: {
            street: '376 Greenpoint Avenue',
            city: 'Elliott',
            zipcode: 9149,
            geo: {
                lat: -78.159578,
                lng: -9.835103,
            },
        },
        phone: '+1 (863) 457-2088',
        isActive: true,
        age: 31,
        company: 'SNORUS',
    },
    {
        id: 14,
        firstName: 'Sophie',
        lastName: 'Horn',
        email: 'sophiehorn@snorus.com',
        dob: '2018-09-20',
        address: {
            street: '343 Doughty Street',
            city: 'Homestead',
            zipcode: 330,
            geo: {
                lat: 65.484087,
                lng: 137.413998,
            },
        },
        phone: '+1 (885) 418-3948',
        isActive: true,
        age: 22,
        company: 'XTH',
    },
    {
        id: 15,
        firstName: 'Levine',
        lastName: 'Rodriquez',
        email: 'levinerodriquez@xth.com',
        dob: '1973-02-08',
        address: {
            street: '643 Allen Avenue',
            city: 'Weedville',
            zipcode: 8931,
            geo: {
                lat: -63.185586,
                lng: 117.327808,
            },
        },
        phone: '+1 (999) 565-3239',
        isActive: true,
        age: 27,
        company: 'COMTRACT',
    },
    {
        id: 16,
        firstName: 'Little',
        lastName: 'Hatfield',
        email: 'littlehatfield@comtract.com',
        dob: '2012-01-03',
        address: {
            street: '194 Anthony Street',
            city: 'Williston',
            zipcode: 7456,
            geo: {
                lat: 47.480837,
                lng: 6.085909,
            },
        },
        phone: '+1 (812) 488-3011',
        isActive: false,
        age: 33,
        company: 'ZIDANT',
    },
    {
        id: 17,
        firstName: 'Larson',
        lastName: 'Kelly',
        email: 'larsonkelly@zidant.com',
        dob: '2010-06-14',
        address: {
            street: '978 Indiana Place',
            city: 'Innsbrook',
            zipcode: 639,
            geo: {
                lat: -71.766732,
                lng: 150.854345,
            },
        },
        phone: '+1 (892) 484-2162',
        isActive: true,
        age: 20,
        company: 'SUREPLEX',
    },
    {
        id: 18,
        firstName: 'Kendra',
        lastName: 'Molina',
        email: 'kendramolina@sureplex.com',
        dob: '2002-07-19',
        address: {
            street: '567 Charles Place',
            city: 'Kimmell',
            zipcode: 1966,
            geo: {
                lat: 50.765816,
                lng: -117.106499,
            },
        },
        phone: '+1 (920) 528-3330',
        isActive: false,
        age: 31,
        company: 'DANJA',
    },
    {
        id: 19,
        firstName: 'Ebony',
        lastName: 'Livingston',
        email: 'ebonylivingston@danja.com',
        dob: '1994-10-18',
        address: {
            street: '284 Cass Place',
            city: 'Navarre',
            zipcode: 948,
            geo: {
                lat: 65.271256,
                lng: -83.064729,
            },
        },
        phone: '+1 (970) 591-3039',
        isActive: false,
        age: 33,
        company: 'EURON',
    },
    {
        id: 20,
        firstName: 'Kaufman',
        lastName: 'Rush',
        email: 'kaufmanrush@euron.com',
        dob: '2011-07-10',
        address: {
            street: '408 Kingsland Avenue',
            city: 'Beaulieu',
            zipcode: 7911,
            geo: {
                lat: 41.513153,
                lng: 54.821641,
            },
        },
        phone: '+1 (924) 463-2934',
        isActive: false,
        age: 39,
        company: 'ILLUMITY',
    },
    {
        id: 21,
        firstName: 'Frank',
        lastName: 'Hays',
        email: 'frankhays@illumity.com',
        dob: '2005-06-15',
        address: {
            street: '973 Caton Place',
            city: 'Dargan',
            zipcode: 4104,
            geo: {
                lat: 63.314988,
                lng: -138.771323,
            },
        },
        phone: '+1 (930) 577-2670',
        isActive: false,
        age: 31,
        company: 'SYBIXTEX',
    },
    {
        id: 22,
        firstName: 'Carmella',
        lastName: 'Mccarty',
        email: 'carmellamccarty@sybixtex.com',
        dob: '1980-03-06',
        address: {
            street: '919 Judge Street',
            city: 'Canby',
            zipcode: 8283,
            geo: {
                lat: 9.198597,
                lng: -138.809971,
            },
        },
        phone: '+1 (876) 456-3218',
        isActive: true,
        age: 21,
        company: 'ZEDALIS',
    },
    {
        id: 23,
        firstName: 'Massey',
        lastName: 'Owen',
        email: 'masseyowen@zedalis.com',
        dob: '2012-03-01',
        address: {
            street: '108 Seaview Avenue',
            city: 'Slovan',
            zipcode: 3599,
            geo: {
                lat: -74.648318,
                lng: 99.620699,
            },
        },
        phone: '+1 (917) 567-3786',
        isActive: false,
        age: 40,
        company: 'DYNO',
    },
    {
        id: 24,
        firstName: 'Lottie',
        lastName: 'Lowery',
        email: 'lottielowery@dyno.com',
        dob: '1982-10-10',
        address: {
            street: '557 Meserole Avenue',
            city: 'Fowlerville',
            zipcode: 4991,
            geo: {
                lat: 54.811546,
                lng: -20.996515,
            },
        },
        phone: '+1 (912) 539-3498',
        isActive: true,
        age: 36,
        company: 'MULTIFLEX',
    },
    {
        id: 25,
        firstName: 'Addie',
        lastName: 'Luna',
        email: 'addieluna@multiflex.com',
        dob: '1988-05-01',
        address: {
            street: '688 Bulwer Place',
            city: 'Harmon',
            zipcode: 7664,
            geo: {
                lat: -12.762766,
                lng: -39.924497,
            },
        },
        phone: '+1 (962) 537-2981',
        isActive: true,
        age: 32,
        company: 'PHARMACON',
    },
];

interface DistributionListProps {
    id: number;
    product: {
        product_barcode: string;
        product_name: string;
    };
    distribution_qty: number;
}

interface ProductListProps {
    id: number;
    product_barcode: string;
    product_name: string;
}

interface UnitListProps {
    id: number;
    unit_stock_name: string;
    number_of_units: number;
}

interface CabangListProps {
    id: number;
    branch_name: string;
}

interface MetaLinkProps {
    current_page: number;
    last_page: number;
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

const Distribusi = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Distribusi'));
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(1);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [initialRecords, setInitialRecords] = useState<DistributionListProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [cabangList, setCabangList] = useState<CabangListProps[]>([]);
    const [productList, setProductList] = useState<ProductListProps[]>([]);
    const [unitList, setUnitList] = useState<UnitListProps[]>([]);
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/distributions');

    console.log('alert', metaLink, metaLinksLink, linksLink);

    //
    useEffect(() => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('data', response.data.data.resource);
                setInitialRecords(response.data.data.resource.data);
                // page
                setMetaLink(response.data.data.resource.meta);
                setMetaLinksLink(response.data.data.resource.meta.links);
                setLinksLink(response.data.data.resource.links);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });
    }, [url]);

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/branches', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('branches', response.data.data.resource);
                setCabangList(response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });

        axios
            .get('https://erp.digitalindustryagency.com/api/unit-stock', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('unit', response.data.data.resource);
                setUnitList(response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });

        axios
            .get('https://erp.digitalindustryagency.com/api/products', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('product', response.data.data.resource);
                setProductList(response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        // setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    const [Edit, setEdit] = useState(false);
    return (
        <div>
            <Transition appear show={Edit} as={Fragment}>
                <Dialog as="div" open={Edit} onClose={() => setEdit(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">Edit Qty</h5>
                                        {/* <button type="button" className="text-white-dark hover:text-dark" onClick={() => setEdit(false)}>
                                            <svg>...</svg>
                                        </button> */}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <input type="text" placeholder="Some Text..." className="form-input" required />
                                        </form>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setEdit(false)}>
                                                Kembali
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setEdit(false)}>
                                                Ubah
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
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
                    <button type="button" className="btn btn-outline-danger mr-4" onClick={() => {}}>
                        <IconTrashLines className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                        Batal
                    </button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => {}}>
                        <IconSend className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                        Kirim
                    </button>
                </div>
                <form className="space-y-5">
                    <div>
                        <label htmlFor="gridState">Lokasi Tujuan</label>
                        <select id="gridState" className="form-select text-white-dark">
                            <option>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    {/* <div>
                        <label htmlFor="Opcost">Operasional Cost</label>
                        <input id="Opcost" type="text" value={operasionalCost} onChange={handleOperasioanalCostChange} placeholder="Rp." className="form-input" />
                    </div> */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="Search">Search Produk</label>
                            <input id="Search" type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="Qty">Qty</label>
                            <input id="Qty" type="Text" placeholder="" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="gridState">Satuan</label>
                            <select id="gridState" className="form-select text-white-dark">
                                <option>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                    {/* <div>
                        <label className="flex items-center mt-1 cursor-pointer">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="text-white-dark">Check me out</span>
                        </label>
                    </div> */}
                    <button type="submit" className="btn btn-outline-primary !mt-6 w-full mb-6" onClick={() => {}}>
                        Tambah
                    </button>
                </form>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5"></div>
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
                            { accessor: 'distribution_qty', title: 'Qty', sortable: true },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: () => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        {/* <button type="button" style={{ color: 'blue' }}>
                                                    <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                                </button> */}
                                        <button type="button" style={{ color: 'orange' }} onClick={() => setEdit(true)}>
                                            {/* <Link to="/menupenjualan/distribution/editdistribution"> */}
                                            <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                            {/* </Link> */}
                                        </button>
                                        <button type="button" style={{ color: 'red' }} onClick={() => {}}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                    />
                    <div className="flex w-full mt-8">
                        <div className="w-full flex">
                            <p>
                                Showing <span>1</span> to <span>10</span> of <span>10</span> entries
                            </p>
                        </div>
                        {metaLink && linksLink && <Pagination currentPage={metaLink.current_page} linksMeta={metaLinksLink} lastPage={metaLink.last_page} links={linksLink} setUrl={setUrl} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Distribusi;
