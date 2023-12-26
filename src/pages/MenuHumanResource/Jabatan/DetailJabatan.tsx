import React from 'react';
import IconPaperclip from '../../../components/Icon/IconPaperclip';
import IconSend from '../../../components/Icon/IconSend';
import IconServer from '../../../components/Icon/IconServer';
import CountUp from 'react-countup';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconUsersGroup from '../../../components/Icon/IconUsersGroup';

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
];
const DetailJabatan = () => {
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Uang Masuk'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'firstName'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    
    return (
        <div>
            <div className="flex flex-wrap w-full justify-start mb-5">
                <div className="border border-gray-500/20 w-[50%] panel rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                    <div className="bg-primary absolute text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                        <IconUsersGroup fill className="w-12 h-12" />
                    </div>
                    <div className="flex items-center w-full justify-start mb-2 gap-4">
                        <div className="dark:text-white text-2xl">Name :</div>
                        <div className="whitespace-nowrap dark:text-white text-2xl">Trickster</div>
                    </div>
                    <div className="flex items-center w-full justify-start mb-2 gap-4">
                        <div className=" dark:text-white text-2xl">Jumlah Karyawan :</div>
                        <CountUp start={0} end={500} duration={1.5} className="dark:text-white text-xl sm:text-3xl text-center" />
                    </div>
                </div>
            </div>
            <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true },
                            { accessor: 'firstName', title: 'Nama Karyawan', sortable: true },
                              { accessor: 'lastName', title: 'Cabang', sortable: true },
                            //   { accessor: 'phone', title: 'Contact', sortable: true },
                            //   {
                            //       accessor: 'dob',
                            //       title: 'Tanggal',
                            //       sortable: true,
                            //       render: ({ dob }) => <div>{formatDate(dob)}</div>,
                            //   },
                            //   {
                            //     accessor: 'address.street',
                            //     title: 'Address',
                            //     sortable: true,
                            // },
                            // {
                            //     accessor: 'action',
                            //     title: 'Opsi',
                            //     titleClassName: '!text-center',
                            //     render: () => (
                            //         <div className="flex items-center w-max mx-auto gap-2">
                            //             <button type="button" style={{ color: 'blue' }}>
                            //                 <Link to="/menuhumanresource/jabatan/detailjabatan">
                            //                     <IconNotes className="ltr:mr-2 rtl:ml-2 " />
                            //                 </Link>
                            //             </button>
                            //             <button onClick={() => setEditJabatan(true)} type="button"  style={{ color: 'orange' }}>
                            //                 {/* <Link to="/menuhumanresource/karyawan/editkaryawan"> */}
                            //                     <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                            //                 {/* </Link> */}
                            //             </button>
                            //             <button type="button" style={{ color: 'red' }} onClick={() => showAlert(11)}>
                            //                 <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                            //             </button>
                            //         </div>
                            //     ),
                            // },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
        </div>
    );
};

export default DetailJabatan;
