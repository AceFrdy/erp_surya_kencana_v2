import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../../../components/Icon/IconBell';
import IconXCircle from '../../../components/Icon/IconXCircle';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import IconPlus from '../../../components/Icon/IconPlus';
import IconNotes from '../../../components/Icon/IconNotes';
import Swal from 'sweetalert2';
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

interface DataInitial {
    id: number;
    distribution_report_code: string;
    suplier_id: number;
    operating_cost: number;
    items_total: number;
    grand_total_price: number;
    status: string;
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

const ListRestock = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Restock'));
    });
    const [initialRecords, setInitialRecords] = useState<DataInitial[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const token = localStorage.getItem('accessToken') ?? '';

    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/distribution-reports');

    // get distribution report
    useEffect(() => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.data);
                console.log('initial', response.data.data);

                // page
                setMetaLink({
                    current_page: response.data.data.resource.current_page,
                    last_page: response.data.data.resource.last_page,
                    from: response.data.data.resource.from,
                    to: response.data.data.resource.to,
                    per_page: response.data.data.resource.per_page,
                    total: response.data.data.resource.total,
                });
                setMetaLinksLink(response.data.data.resource.links);
                setLinksLink({
                    first: response.data.data.resource.first_page_url,
                    last: response.data.data.resource.last_page_url,
                    next: response.data.data.resource.next_page_url,
                    prev: response.data.data.resource.prev_page_url,
                });
            })
            .catch((err: any) => {
                console.log('GET DISTRIBRUTION REPORT', err.message);
            });
    }, [url]);

    useEffect(() => {
        if (!initialRecords) {
            return;
        }
        setRecordsData(() => {
            return initialRecords.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.distribution_report_code.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, initialRecords]);

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
                    <span> List Restock </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Restock</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (e) => recordsData.indexOf(e) + 1 },
                            { accessor: 'distribution_report_code', title: 'Kode Dokumen', sortable: true },
                            {
                                accessor: 'suplier_id',
                                title: 'Supplier',
                                sortable: true,
                            },
                            { accessor: 'operating_cost', title: 'Operasional', sortable: true },
                            { accessor: 'grand_total_price', title: 'Total', sortable: true },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (data) => (
                                    <span
                                        className={`badge whitespace-nowrap ${
                                            data.status === 'completed'
                                                ? 'bg-primary   '
                                                : data.status === 'Pending'
                                                ? 'bg-secondary'
                                                : data.status === 'In Progress'
                                                ? 'bg-success'
                                                : data.status === 'Canceled'
                                                ? 'bg-danger'
                                                : 'bg-primary'
                                        }`}
                                    >
                                        {data.status}
                                    </span>
                                ),
                            },
                            {
                                accessor: 'items_total',
                                title: 'Distribution Qty',
                                sortable: true,
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: () => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <button type="button" style={{ color: 'blue' }}>
                                            <Link to="/menupenjualan/restock/detailrestock">
                                                <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        <button type="button" style={{ color: 'orange' }}>
                                            <Link to="/menupenjualan/restock/editrestock">
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </Link>
                                        </button>
                                        {/* <button type="button" style={{ color: 'red' }} onClick={() => showAlert(11)}>
                                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                        </button> */}
                                    </div>
                                ),
                            },
                        ]}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                    />
                    {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}
                </div>
            </div>
        </div>
    );
};

export default ListRestock;
