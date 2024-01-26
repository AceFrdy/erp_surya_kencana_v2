import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { FormEvent, Fragment, MouseEvent, useEffect, useState } from 'react';

import IconPlus from '../../components/Icon/IconPlus';
import IconPencil from '../../components/Icon/IconPencil';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { useAuth } from '../../hooks/auth';

interface MenusProps {
    id: number;
    menu_title: string;
}

interface MenuAksesProps {
    has_access: boolean;
    menu_id: number;
    menu_title: string;
    pivot_id: number;
}

interface MenuPrivilageProps {
    id: number;
    menu: MenusProps;
    menu_id: number;
}

interface DataState {
    id: number;
    privilage_name: string;
    menu_privilages: MenuPrivilageProps[];
}

type modalData = 'new-menu' | 'edit-menu' | 'delete-menu' | 'edit-hak-akses';

const HakAkses = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataModal, setDataModal] = useState<modalData | null>(null);
    const [dataFormModal, setDataFormModal] = useState<number>(0);
    const [menuForm, setMenuForm] = useState<string>('');
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Hak Akses'));
    }, []);
    const [initialRecords, setInitialRecords] = useState<DataState[]>([]);
    const [menuRecord, setMenuRecord] = useState<MenusProps[]>([]);
    const [menuRecordSecond, setMenuRecordSecond] = useState<MenusProps[]>([]);
    const [menuHalfLength, setMenuHalfLength] = useState<number>(0);

    const [menuAksesRecord, setMenuAksesRecord] = useState<MenuAksesProps[]>([]);
    const [privilageId, setPrivilageId] = useState<number>(0);

    const handleOpenModal = (data: modalData, event: MouseEvent, form?: number) => {
        event.preventDefault();

        setOpenModal(true);
        setDataModal(data);
        if (form) {
            setDataFormModal(form);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setDataModal(null);
        setDataFormModal(0);
        setMenuForm('');
    };

    const handleAddMenu = (e: FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('menu_title', menuForm);
        data.append('menu_icon', '-');
        data.append('menu_url', '-');
        data.append('user_menu_id', '1');

        axios
            .post('https://erp.digitalindustryagency.com/api/menus', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                navigate(0);
                const notification = {
                    type: 'success',
                    message: 'Menu Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
            })
            .catch((err: any) => {
                console.log('ERROR_ADD_MENU', err.message);
                toast.error('Menu Gagal Ditambahkan');
            });
    };

    const getDataEdit = (id: number, event: MouseEvent) => {
        event.preventDefault();

        axios
            .get(`https://erp.digitalindustryagency.com/api/menus/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setMenuForm(response.data.data.resource.menu_title);
            })
            .catch((err: any) => {
                console.log('ERROR_GET_DATA_EDIT_MENU', err.message);
            });
    };

    const handleEditMenu = (e: FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('menu_title', menuForm);
        data.append('menu_icon', '-');
        data.append('menu_url', '-');
        data.append('user_menu_id', '1');
        data.append('_method', 'put');
        axios
            .post(`https://erp.digitalindustryagency.com/api/menus/${dataFormModal}`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                navigate(0);
                const notification = {
                    type: 'success',
                    message: 'Menu Berhasil Diperbarui',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
            })
            .catch((err: any) => {
                console.log('ERROR_EDIT_MENU', err.message);
                toast.error('Menu Gagal Diperbarui');
            });
    };

    const handleDeleteMenu = (e: FormEvent) => {
        e.preventDefault();

        axios
            .delete(`https://erp.digitalindustryagency.com/api/menus/${dataFormModal}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                navigate(0);
                const notification = {
                    type: 'success',
                    message: 'Menu Berhasil Dihapus',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
            })
            .catch((err: any) => {
                console.log('ERROR_DELETE_MENU', err.message);
                toast.error('Menu Gagal Dihapus');
            });
    };

    const getDataEditAkses = (id: number, event: MouseEvent) => {
        event.preventDefault();

        setPrivilageId(id);
        axios
            .get(`https://erp.digitalindustryagency.com/api/privilages/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setMenuAksesRecord(response.data.data.resource.menu_access);
            })
            .catch((err: any) => {
                console.log('ERROR_GET_DATA_EDIT', err.message);
            });
    };

    const handleAksesChange = async (event: FormEvent, menuId: number, akses: boolean, pivotId: number) => {
        event.preventDefault();

        if (akses === true) {
            await axios
                .delete(`https://erp.digitalindustryagency.com/api/menu-privilage/${pivotId}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    navigate(0);
                    const notification = {
                        type: 'success',
                        message: 'Akses Berhasil Dihapus',
                    };
                    localStorage.setItem('notification', JSON.stringify(notification));
                })
                .catch((err: any) => {
                    console.log('ERROR_DELETE_ACCESS', err.message);
                    toast.error('Akses Gagal Dihapus');
                });
        } else {
            const data = new FormData();
            data.append('menu_id', menuId.toString());
            data.append('privilage_id', privilageId.toString());

            await axios
                .post('https://erp.digitalindustryagency.com/api/menu-privilage', data, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    navigate(0);
                    const notification = {
                        type: 'success',
                        message: 'Akses Berhasil Ditambahkan',
                    };
                    localStorage.setItem('notification', JSON.stringify(notification));
                })
                .catch((err: any) => {
                    console.log('ERROR_DELETE_ACCESS', err.message);
                    toast.error('Akses Gagal Ditambahkan');
                });
        }
    };

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/menus', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const menuLength = response.data.data.resource.length;
                const halfLength = Math.trunc(menuLength / 2);

                setMenuHalfLength(halfLength);
                setMenuRecord(response.data.data.resource.slice(0, halfLength));
                setMenuRecordSecond(response.data.data.resource.slice(halfLength, menuLength));
            })
            .catch((err: any) => {
                console.log('ERROR_GET_MENUS', err.message);
            });
        axios
            .get('https://erp.digitalindustryagency.com/api/privilages', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setInitialRecords(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('ERROR_GET_PRIVILAGES', err.message);
            });
        axios
            .get('https://erp.digitalindustryagency.com/api/user-profile', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('ERROR_GET_PRIVILAGES', err.message);
            });
    }, []);

    useEffect(() => {
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { type, message } = JSON.parse(notificationMessage);
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }
        }
        return localStorage.removeItem('notification');
    }, []);

    return (
        <>
            <Transition appear show={openModal} as={Fragment}>
                <Dialog as="div" open={openModal} onClose={handleCloseModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-xl text-black dark:text-white-dark">
                                    <form>
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">Edit Distribusi Product</div>
                                        </div>
                                        <div className="p-5">
                                            <div className="max-h-[50dvh] overflow-y-scroll snap-y">
                                                {dataModal === 'edit-hak-akses' && (
                                                    <div className="datatables">
                                                        <DataTable
                                                            highlightOnHover
                                                            className="whitespace-nowrap table-hover"
                                                            records={menuAksesRecord}
                                                            columns={[
                                                                { accessor: 'id', title: 'No', width: 60, render: (e) => menuAksesRecord.indexOf(e) + 1 },
                                                                {
                                                                    accessor: 'menu_title',
                                                                    title: 'Nama Menu',
                                                                },
                                                                {
                                                                    accessor: 'action',
                                                                    title: 'Opsi',
                                                                    width: 100,
                                                                    cellsClassName: 'flex justify-center',
                                                                    titleClassName: '!text-center',
                                                                    render: (e) => (
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={e.has_access}
                                                                            onChange={(event) => {
                                                                                handleAksesChange(event, e.menu_id, e.has_access, e.pivot_id);
                                                                            }}
                                                                        />
                                                                    ),
                                                                },
                                                            ]}
                                                            minHeight={200}
                                                        />
                                                    </div>
                                                )}
                                                {(dataModal === 'new-menu' || dataModal === 'edit-menu') && (
                                                    <div className="gap-2">
                                                        <label htmlFor="namaMenu">Nama Menu</label>
                                                        <input
                                                            type="text"
                                                            id="namaMenu"
                                                            className="form-input"
                                                            value={menuForm}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setMenuForm(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                {dataModal === 'delete-menu' && <p>Apakah anda yakin ingin menghapus menu berikut?</p>}
                                            </div>
                                        </div>
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-end px-5 gap-x-2 py-3">
                                            {dataModal === 'new-menu' && (
                                                <button onClick={handleAddMenu} className="btn btn-primary">
                                                    Add
                                                </button>
                                            )}
                                            {dataModal === 'edit-menu' && (
                                                <button onClick={handleEditMenu} className="btn btn-primary">
                                                    Update
                                                </button>
                                            )}
                                            {dataModal === 'delete-menu' && (
                                                <button onClick={handleDeleteMenu} className="btn btn-primary">
                                                    Delete
                                                </button>
                                            )}
                                            <button onClick={handleCloseModal} className="btn btn-primary">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link to="/" className="text-primary hover:underline">
                            Home
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Menu Keuangan</span>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span> Hak Akses </span>
                    </li>
                </ul>

                <div className="grid xl:grid-cols-3 gap-6 grid-cols-1 mt-2">
                    <div className="datatables panel xl:col-span-3">
                        <h5 className="font-semibold text-lg dark:text-white-light mb-2">Hak Akses</h5>
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={initialRecords}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (e) => initialRecords.indexOf(e) + 1 },
                                {
                                    accessor: 'privilage_name',
                                    title: 'Jabatan',
                                    sortable: true,
                                },
                                {
                                    accessor: 'menus',
                                    title: 'Menu Akses',
                                    sortable: true,
                                    render: (e) => (
                                        <div className="flex gap-2 max-w-3xl flex-wrap">
                                            {e.menu_privilages
                                                .sort((a, b) => a.menu_id - b.menu_id)
                                                .map((item) => (
                                                    <span key={item.id} className="px-3 py-0.5 bg-blue-500 rounded-md text-white">
                                                        {item.menu.menu_title}
                                                    </span>
                                                ))}
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    width: '100px',
                                    titleClassName: '!text-center',
                                    render: (e) => (
                                        <div className="flex items-center w-max mx-auto gap-2">
                                            <button
                                                type="button"
                                                style={{ color: 'orange' }}
                                                onClick={(event) => {
                                                    handleOpenModal('edit-hak-akses', event);
                                                    getDataEditAkses(e.id, event);
                                                }}
                                            >
                                                <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            minHeight={200}
                        />
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 gap-6 grid-cols-1 mt-5">
                    <div className="panel xl:col-span-3">
                        <div className="flex justify-between items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">List Menu</h5>
                            <button className="btn btn-primary" onClick={(event) => handleOpenModal('new-menu', event)}>
                                <IconPlus />
                                <span className="ml-2">Add New</span>
                            </button>
                        </div>
                        <div className="flex gap-5 w-full">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover w-full"
                                records={menuRecord}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, width: '100px', render: (e) => menuRecord.indexOf(e) + 1 },
                                    {
                                        accessor: 'menu_title',
                                        title: 'Nama Menu',
                                        sortable: true,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        width: '150px',
                                        titleClassName: '!text-center',
                                        render: (e) => (
                                            <div className="flex items-center w-max mx-auto gap-2">
                                                <button
                                                    type="button"
                                                    style={{ color: 'orange' }}
                                                    onClick={(event) => {
                                                        handleOpenModal('edit-menu', event, e.id);
                                                        getDataEdit(e.id, event);
                                                    }}
                                                >
                                                    <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                                </button>
                                                <button type="button" style={{ color: 'red' }} onClick={(event) => handleOpenModal('delete-menu', event, e.id)}>
                                                    <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                minHeight={200}
                            />
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover w-full"
                                records={menuRecordSecond}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, width: '100px', render: (e) => menuHalfLength + menuRecordSecond.indexOf(e) + 1 },
                                    {
                                        accessor: 'menu_title',
                                        title: 'Nama Menu',
                                        sortable: true,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        width: '150px',
                                        titleClassName: '!text-center',
                                        render: (e) => (
                                            <div className="flex items-center w-max mx-auto gap-2">
                                                <button
                                                    type="button"
                                                    style={{ color: 'orange' }}
                                                    onClick={(event) => {
                                                        handleOpenModal('edit-menu', event, e.id);
                                                        getDataEdit(e.id, event);
                                                    }}
                                                >
                                                    <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                                </button>
                                                <button type="button" style={{ color: 'red' }} onClick={(event) => handleOpenModal('delete-menu', event, e.id)}>
                                                    <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                minHeight={200}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HakAkses;
