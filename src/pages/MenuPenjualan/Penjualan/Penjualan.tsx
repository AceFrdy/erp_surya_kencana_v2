import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import IconSend from '../../../components/Icon/IconSend';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { toast } from 'react-toastify';
import { useModal } from '../../../hooks/use-modal';
import { formatPrice } from '../../../utils';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
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

interface SaleOrderListProps {
    id: number;
    sale_order_invoice: string;
    product: {
        product_barcode: string;
        product_name: string;
    };
    sale_order_qty: number;
    sale_order_total: number;
    sale_order_sub_total: number;
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

interface FormState {
    product_category_id: number;
    id: number;
    name: string;
    branch_name: string;
    product_barcode: string;
    sale_order_qty: number;
    unit_stock_name: string;
    unit_stock_id: number;
    sale_order_discount: number;
    branch_id: number;
}

interface CustomersList {
    id: number;
    name: string;
}

interface BarcodeDataProps {
    id: number;
    product_barcode: string;
}

interface UnitDataProps {
    id: number;
    unit_stock_name: string;
}

interface BranchDataProps {
    id: number;
    branch_name: string;
}

const showAlert = async (type: number) => {
    if (type === 11) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                popup: 'sweet-alerts',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
                padding: '2em',
            })
            .then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                }
            });
    }
    if (type === 15) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Berhasil Dikirim',
            padding: '10px 20px',
        });
    }
    if (type == 20) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Data Berhasil Ditambah',
            padding: '10px 20px',
        });
    }
};
const Penjualan = () => {
    const { onOpen } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Penjualan'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SaleOrderListProps[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [barcodeProduk, setBarcodeProduk] = useState<BarcodeDataProps[]>([]);
    const [unit, setUnit] = useState<UnitDataProps[]>([]);
    const [branch, setBranch] = useState<BranchDataProps[]>([]);
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [formData, setFormData] = useState<FormState>({
        product_category_id: 0,
        id: 0,
        name: '',
        branch_name: '',
        product_barcode: '',
        sale_order_qty: 0,
        unit_stock_id: 0,
        unit_stock_name: '',
        sale_order_discount: 0,
        branch_id: 0,
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (!initialRecords) {
            return;
        }

        setInitialRecords(() => {
            return initialRecords.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.sale_order_invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.product.product_name.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/products', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const barcodeProduk = response.data.data.resource.data;
                setInitialRecords(barcodeProduk);
                setBarcodeProduk(barcodeProduk);
                setRecordsData(barcodeProduk);
                // console.log('BARCODE', barcodeProduk);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios
            .get('https://erp.digitalindustryagency.com/api/unit-stock', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const unit = response.data.data.resource.data;
                setInitialRecords(unit);
                setUnit(unit);
                setRecordsData(unit);
                // console.log('UNIT', unit);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios
            .get('https://erp.digitalindustryagency.com/api/branches', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const branch = response.data.data.resource.data;
                setInitialRecords(branch);
                setBranch(branch);
                setRecordsData(branch);
                // console.log('BRANCH', branch);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checkboxValue = (e.target as HTMLInputElement).checked ? 'yes' : '';
            setFormData((prevData) => ({
                ...prevData,
                [name]: checkboxValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const [url, setUrl] = useState<string>('https://erp.digitalindustryagency.com/api/sale-orders');

    useEffect(() => {
        const id = setInterval(() => {
            axios
                .get(url, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const penjualan = response.data.data.resource.data_order.data;
                    setInitialRecords(penjualan);
                    // console.log('PENJUALAN', penjualan);
                    // page
                    setMetaLink(response.data.data.resource.meta);
                    setMetaLinksLink(response.data.data.resource.meta.links);
                    setLinksLink(response.data.data.resource.links);
                })
                .catch((err: any) => {
                    console.log('PENJUALAN', err.message);
                });
        }, 2000);
        return () => clearInterval(id);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            product_barcode: formData.product_barcode,
            sale_order_qty: formData.sale_order_qty,
            unit_stock_id: formData.unit_stock_id,
            sale_order_discount: formData.sale_order_discount,
            branch_id: formData.branch_id,
        };

        console.log('DATA SENT:', data);

        axios
            .post('https://erp.digitalindustryagency.com/api/sale-orders', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                navigate(0);
                console.log('Data penjualan berhasil ditambahkan:', response.data);
                toast.success('Seluruh Data Penjualan Berhasil Ditambahkan');
            })
            .catch((error) => {
                navigate(0);
                if (error.response && error.response.data) {
                    const apiErrors = error.response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        errors: apiErrors,
                    }));
                }
                console.error('Error adding penjualan data:', error);
                toast.error('Error adding data');
            });
    };

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
                    <span> Penjualan </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <h1 className="text-lg font-bold flex justify-center mb-4">Data Penjualan</h1>

                {/* <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:mr-auto rtl:ml-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div> */}

                <form className="space-y-5 " onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="gridCustomer">Product Barcode</label>
                            <select id="gridCustomer" className="form-select text-white-dark" name="product_barcode" value={formData.product_barcode} onChange={handleChange}>
                                <option>Choose...</option>
                                {barcodeProduk.map((item) => (
                                    <option key={item.id} value={item.product_barcode}>
                                        {item.product_barcode}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gridTotal">Qty</label>
                            <input id="gridTotal" type="text" placeholder="Jumlah penjualan" className="form-input" name="sale_order_qty" value={formData.sale_order_qty} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="gridUnit">Unit Stock</label>
                            <select id="gridUnit" className="form-select text-white-dark" name="unit_stock_id" value={formData.unit_stock_id} onChange={handleChange}>
                                <option>Choose...</option>
                                {unit.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.unit_stock_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-outline-primary !mt-6 w-full" onClick={() => {}}>
                            Tambah
                        </button>
                    </div>
                </form>

                <div className="grid xl:grid-cols-3 gap-6 grid-cols-1 mt-8">
                    <div className="datatables panel xl:col-span-2">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={initialRecords}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                                {
                                    accessor: 'sale_order_invoice',
                                    title: 'barcode',
                                    sortable: true,
                                },
                                { accessor: 'product.product_name', title: 'Nama', sortable: true },
                                { accessor: 'sale_order_qty', title: 'Qty', sortable: true },
                                {
                                    accessor: 'sale_order_total',
                                    title: 'Harga',
                                    sortable: true,
                                    render: (e) => formatPrice(e.sale_order_total),
                                },
                                {
                                    accessor: 'sale_order_sub_total',
                                    title: 'Sub Total',
                                    sortable: true,
                                    render: (e) => formatPrice(e.sale_order_sub_total),
                                },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    titleClassName: '!text-center',
                                    render: (e) => (
                                        <div className="flex items-center w-max mx-auto gap-2">
                                            <button type="button" style={{ color: 'orange' }}>
                                                <Link to={`/menupenjualan/penjualan/editpenjualan/${e.id}`}>
                                                    <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                                </Link>
                                            </button>
                                            <button type="button" style={{ color: 'red' }} onClick={() => onOpen('delete-data-penjualan', e.id)}>
                                                <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            // totalRecords={initialRecords.length}
                            // recordsPerPage={pageSize}
                            // page={page}
                            // onPageChange={(p) => setPage(p)}
                            // recordsPerPageOptions={PAGE_SIZES}
                            // onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            minHeight={200}
                            // paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                        <div className="flex w-full mt-8">
                            <div className="w-full flex">
                                <p>
                                    Showing <span>1</span> to <span>10</span> of <span>10</span> entries
                                </p>
                            </div>
                            {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}
                        </div>
                    </div>
                    <form className="space-y-5 panel xl:col-span-1" onSubmit={handleSubmit}>
                        <h1 className="font-semibold text-xl dark:text-white-light mb-2 justify-center flex">Penjualan</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="gridCustomer">Product Barcode</label>
                                <select id="gridCustomer" className="form-select text-white-dark" name="product_barcode" value={formData.product_barcode} onChange={handleChange}>
                                    <option>Choose...</option>
                                    {barcodeProduk.map((item) => (
                                        <option key={item.id} value={item.product_barcode}>
                                            {item.product_barcode}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="gridTotal">Jumlah Penjualan</label>
                                <input id="gridTotal" type="text" placeholder="Jumlah penjualan" className="form-input" name="sale_order_qty" value={formData.sale_order_qty} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="gridUnit">Unit</label>
                                <select id="gridUnit" className="form-select text-white-dark" name="unit_stock_id" value={formData.unit_stock_id} onChange={handleChange}>
                                    <option>Choose...</option>
                                    {unit.map((item) => (
                                        <option value={item.id} key={item.id}>
                                            {item.unit_stock_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="gridDiskon">Diskon Penjualan</label>
                                <input
                                    id="gridDiskon"
                                    type="text"
                                    placeholder="Diskon penjualan"
                                    className="form-input"
                                    name="sale_order_discount"
                                    value={formData.sale_order_discount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="gridCabang">Cabang</label>
                                <select id="gridCabang" className="form-select text-white-dark" name="branch_id" value={formData.branch_id} onChange={handleChange}>
                                    <option>Choose...</option>
                                    {branch.map((item) => (
                                        <option value={item.id} key={item.id}>
                                            {item.branch_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary !mt-6 w-full">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Penjualan;
