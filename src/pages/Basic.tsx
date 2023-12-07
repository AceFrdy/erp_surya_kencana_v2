import { DataTable } from 'mantine-datatable';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import IconBell from '../components/Icon/IconBell';
import IconTrashLines from '../components/Icon/IconTrashLines';
import IconCode from '../components/Icon/IconCode';
import IconPencil from '../components/Icon/IconPencil';
import axios from 'axios';

const tableData = [
    {
        id: 1,
        nama: 'John Doe',
        email: 'johndoe@yahoo.com',
        date: '10/08/2020',
        sale: 120,
        status: 'Complete',
        register: '5 min ago',
        progress: '40%',
        position: 'Developer',
        office: 'London',
    },
    {
        id: 2,
        nama: 'Shaun Park',
        email: 'shaunpark@gmail.com',
        date: '11/08/2020',
        sale: 400,
        status: 'Pending',
        register: '11 min ago',
        progress: '23%',
        position: 'Designer',
        office: 'New York',
    },
    {
        id: 3,
        nama: 'Alma Clarke',
        email: 'alma@gmail.com',
        date: '12/02/2020',
        sale: 310,
        status: 'In Progress',
        register: '1 hour ago',
        progress: '80%',
        position: 'Accountant',
        office: 'Amazon',
    },
    {
        id: 4,
        nama: 'Vincent Carpenter',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,
        status: 'Canceled',
        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
    },
];
const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : console.log('nothing');
const Basic = () => {
    const [categories, setCategories] = useState<{ id: number; product_category_name: string }[]>([]);
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/product-categories', {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer 208|Sd3oTM01ZMSVUXWiSLW4t3yKtMGBgLRbv1MB1Z5W8d47786e',
                },
            })
            .then((response) => {
                const categories = response.data.data.resource.data;
                setCategories(categories);
                console.log("CATEGORIES:", categories);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };


    return (
        <div>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div>
                <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a>
            </div> */}
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Iya Bang</h5>
                <div className="datatables">
                    {/* <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID' },
                            { accessor: 'firstName', title: 'First Name' },
                            { accessor: 'lastName', title: 'Last Name' },
                            { accessor: 'email' },
                            { accessor: 'phone' },
                        ]}
                        totalRecords={rowData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    /> */}
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Kategori Produk</h5>
                        {/* <button type="button" onClick={() => toggleCode('code6')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                            <span className="flex items-center">
                                <IconCode className="me-2" />
                                Code
                            </span>
                        </button> */}
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Kategori</th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => {
                                    return (
                                        <tr key={category.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="whitespace-nowrap">{category.product_category_name}</div>
                                            </td>
                                            <td>
                                                {/* <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div
                                                        className={`h-1.5 rounded-full rounded-bl-full text-center text-white text-xs ${
                                                            data.status === 'completed'
                                                                ? 'bg-success'
                                                                : data.status === 'Pending'
                                                                ? 'bg-secondary'
                                                                : data.status === 'In Progress'
                                                                ? 'bg-info'
                                                                : data.status === 'Canceled'
                                                                ? 'bg-danger'
                                                                : 'bg-success'
                                                        }`}
                                                        style={{ width: `${data.progress}` }}
                                                    ></div>
                                                </div> */}
                                            </td>
                                            <td>
                                                {/* <div
                                                    className={`whitespace-nowrap ${
                                                        data.status === 'completed'
                                                            ? 'text-success'
                                                            : data.status === 'Pending'
                                                            ? 'text-secondary'
                                                            : data.status === 'In Progress'
                                                            ? 'text-info'
                                                            : data.status === 'Canceled'
                                                            ? 'text-danger'
                                                            : 'text-success'
                                                    }`}
                                                >
                                                    {data.progress}
                                                </div> */}
                                            </td>
                                            <td className="p-3 border-b border-[#ebedf2] dark:border-[#191e3a] text-center">
                                                <Tippy content="Edit">
                                                    <button type="button">
                                                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                                    </button>
                                                </Tippy>
                                                <Tippy content="Delete">
                                                    <button type="button">
                                                        <IconTrashLines />
                                                    </button>
                                                </Tippy>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basic;
