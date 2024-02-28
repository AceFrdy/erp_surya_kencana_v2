import CountUp from 'react-countup';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconUsersGroup from '../../../components/Icon/IconUsersGroup';
import axios from 'axios';
import { LinksLinkProps, MetaLinkProps, MetaLinksLinkProps, endpoint } from '../../../utils';
import { useParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination';

interface DataInitial {
    id: number;
    name: string;
}

const DetailJabatan = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Uang Masuk'));
    });
    const [initialRecords, setInitialRecords] = useState<DataInitial[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [privilagesName, setPrivilagesName] = useState<string>('');
    const [privilagesTotal, setPrivilagesTotal] = useState<number>(0);
    // pagination
    const [metaLink, setMetaLink] = useState<MetaLinkProps>();
    const [metaLinksLink, setMetaLinksLink] = useState<MetaLinksLinkProps[]>([]);
    const [linksLink, setLinksLink] = useState<LinksLinkProps>();
    const [url, setUrl] = useState<string>(`${endpoint}/api/detail-privilage/${id}`);

    const fetchData = () => {
        axios
            .get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPrivilagesName(response.data.data.resource[0].privilage_name);
                setPrivilagesTotal(response.data.data.resource[1].total);
                setInitialRecords(response.data.data.resource[1].data);
                setRecordsData(response.data.data.resource[1].data);
                // page
                setMetaLink({
                    current_page: response.data.data.resource[1].current_page,
                    last_page: response.data.data.resource[1].last_page,
                    from: response.data.data.resource[1].from,
                    to: response.data.data.resource[1].to,
                    per_page: response.data.data.resource[1].per_page,
                    total: response.data.data.resource[1].total,
                });
                setMetaLinksLink(response.data.data.resource[1].links);
                setLinksLink({
                    first: response.data.data.resource[1].first_page_url,
                    last: response.data.data.resource[1].last_page_url,
                    next: response.data.data.resource[1].next_page_url,
                    prev: response.data.data.resource[1].prev_page_url,
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [url, token]);

    return (
        <div>
            <div className="flex flex-wrap w-full justify-start mb-5">
                <div className="border border-gray-500/20 w-[50%] panel rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                    <div className="bg-primary absolute text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                        <IconUsersGroup fill className="w-12 h-12" />
                    </div>
                    <div className="flex items-center w-full justify-start mb-2 gap-4">
                        <div className="dark:text-white text-2xl">Name :</div>
                        <input className="whitespace-nowrap dark:text-white text-2xl" value={privilagesName}></input>
                    </div>
                    <div className="flex items-center w-full justify-start mb-2 gap-4">
                        <div className=" dark:text-white text-2xl">Jumlah Karyawan :</div>
                        <CountUp start={0} end={privilagesTotal} duration={1.5} className="dark:text-white text-xl sm:text-3xl text-center" />
                    </div>
                </div>
            </div>
            <div className="datatables panel xl:col-span-2">
                <DataTable
                    highlightOnHover
                    className="whitespace-nowrap table-hover"
                    records={recordsData}
                    columns={[
                        { accessor: 'id', title: 'No', render: (e) => recordsData.indexOf(e) + 1 },
                        { accessor: 'name', title: 'Nama Karyawan', sortable: true },
                        { accessor: 'branch.branch_name', title: 'Cabang', sortable: true },
                    ]}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    minHeight={200}
                />
                {metaLink && linksLink && <Pagination metaLink={metaLink} linksMeta={metaLinksLink} links={linksLink} setUrl={setUrl} />}
            </div>
        </div>
    );
};

export default DetailJabatan;
