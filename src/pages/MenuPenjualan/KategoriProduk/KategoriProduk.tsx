import React, { SetStateAction, useState, Fragment, useEffect, FormEvent, ChangeEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Pagination } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import IconPlus from '../../../components/Icon/IconPlus';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPencil from '../../../components/Icon/IconPencil';
import { FormikState } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

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
};
const KategoriProduk = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Kategori Produk'));
    });
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1); // Menggunakan tipe data number untuk state currentPage
    const itemsPerPage = 5;
    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
    const [addKategori, setAddKategori] = useState(false);
    const [editKategori, setEditKategori] = useState(false);
    const [deleteKategori, setDeleteKategori] = useState(false);
    const token = localStorage.getItem('accessToken') || '';
    const [editedCategoryId, setEditedCategoryId] = useState<number | null>(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Memperbarui state currentPage saat halaman berubah
    };
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState<{ id: number; product_category_name: string }[]>([]);
    const [nextIndex, setNextIndex] = useState(1);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const id = setInterval(() => {
            axios
                .get('https://erp.digitalindustryagency.com/api/product-categories', {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const categories = response.data.data.resource.data;
                    setCategories(categories); 
                    // console.log('CATEGORIES', response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }, 2000);
        return () => clearInterval(id);
    }, [categories]);

    const [formData, setFormData] = useState({
        product_category_name: '',
        errors: {},
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAdd = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            product_category_name: formData.product_category_name,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/product-categories', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Data kategori produk berhasil ditambahkan:', response.data);
                setFormData({
                    product_category_name: '',
                    errors: {},
                });
                setAddKategori(false);
                navigate('/menupenjualan/product/kategoriproduk');
                toast.success('Data berhasil ditambahkan', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const apiErrors = error.response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        errors: apiErrors,
                    }));
                }
                console.error('Error adding kategori produk data:', error);
                toast.error('Error adding data');
            });
    };

    const handleEditButtonClick = (categoryId: number) => {
        const editedCategory = categories.find((category) => category.id === categoryId);
        if (editedCategory) {
            setFormData({
                product_category_name: editedCategory.product_category_name,
                errors: {},
            });
            setEditedCategoryId(categoryId);
            setEditKategori(true);
        }
    };

    const handleEditKategori = () => {
        if (!editedCategoryId) {
            return; 
        }

        const editedData = {
            id: editedCategoryId,
            product_category_name: formData.product_category_name,
        };

        console.log('Edited Data:', editedData);
        axios
            .put(`https://erp.digitalindustryagency.com/api/product-categories/${editedCategoryId}`, editedData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('API Response:', response.data); 
                console.log('kategori data successfully updated:', response.data);
                navigate('/menupenjualan/product/kategoriproduk');
                toast.success('Data berhasil diedit', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setEditKategori(false);
                setEditedCategoryId(null); 
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setFormData((prevData) => ({
                        ...prevData,
                        errors: error.response.data,
                    }));
                    console.log('Validation Errors:', error.response.data);
                }
                console.error('Error updating kategori data:', error);
                toast.error('Error updating data');
            });
    };

    const handleDeleteButtonClick = (categoryId: number | null) => {
        const deleteCategory = categories.find((category) => category.id === categoryId);
        if (deleteCategory) {
            setFormData({
                product_category_name: deleteCategory.product_category_name,
                errors: {},
            });
            setDeleteCategoryId(categoryId);
            setDeleteKategori(true);
        }
    };

    const handleDeleteKategori = () => {
        if (!deleteCategoryId) {
            return;
        }

        const deleteData = {
            id: deleteCategoryId,
            product_category_name: formData.product_category_name,
        };
        console.log('Delete Data:', deleteData);
        axios
            .delete(`https://erp.digitalindustryagency.com/api/product-categories/${deleteCategoryId}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('API Response:', response.data);
                console.log('kategori data successfully deleted:', response.data);
                toast.success('Data berhasil dihapus', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setDeleteKategori(false);
            })
            .catch((error) => {
                console.error('Error deleting kategori data:', error);
                toast.error('Error deleting data');
            });
    };

    return (
        <div>
            <div className="mb-5">
                <Transition appear show={editKategori} as={Fragment}>
                    <Dialog as="div" open={editKategori} onClose={() => setEditKategori(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
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
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">Edit Kategori</div>
                                        </div>
                                        <div className="p-5">
                                            <div>
                                                <form className="space-y-5">
                                                    <div>
                                                        <input
                                                            type="textfield"
                                                            placeholder="Masukan Kategori"
                                                            className="form-input"
                                                            name="product_category_name"
                                                            value={formData.product_category_name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setEditKategori(false)}>
                                                    Discard
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleEditKategori}>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <Transition appear show={addKategori} as={Fragment}>
                    <Dialog as="div" open={addKategori} onClose={() => setAddKategori(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
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
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">Tambah Kategori</div>
                                        </div>
                                        <div className="p-5">
                                            <div>
                                                <form className="space-y-5" onSubmit={handleAdd}>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            placeholder="Masukan Kategori"
                                                            className="form-input"
                                                            name="product_category_name"
                                                            value={formData.product_category_name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleAdd}>
                                                    Save
                                                </button>
                                                <button type="submit" className="btn btn-outline-danger" onClick={() => setAddKategori(false)}>
                                                    Discard
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <Transition appear show={deleteKategori} as={Fragment}>
                    <Dialog as="div" open={deleteKategori} onClose={() => setDeleteKategori(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
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
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">Delete Kategori</div>
                                        </div>
                                        <div className="p-5">
                                            <div>
                                                <form className="space-y-5">
                                                    <div>
                                                        <h1>Apakah Anda yakin ingin menghapus Kategori</h1>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setDeleteKategori(false)}>
                                                    Kembali
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleDeleteKategori}>
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
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
                    <span>Kategori Produk</span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="datatables">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Kategori Produk </h5>
                        {/* <Link to="/menupenjualan/product/kategoriproduk/forminput"> */}
                        <button type="button" className=" px-2 btn btn-outline-info" onClick={() => setAddKategori(true)}>
                            <IconPlus className="flex mx-2" fill={true} /> Add
                        </button>
                        {/* </Link> */}
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Kategori</th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-center">Opsi</th>
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
                                            <td></td>
                                            <td></td>
                                            <td className="p-3 border-b border-[#ebedf2] dark:border-[#191e3a] text-center">
                                                <button type="button" style={{ color: 'orange' }} onClick={() => handleEditButtonClick(category.id)}>
                                                    <IconPencil className="ltr:mr-2 rtl:ml-2 " />
                                                </button>
                                                <button type="button" style={{ color: 'red' }} onClick={() => handleDeleteButtonClick(category.id)}>
                                                    <IconTrashLines />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Integrasikan Pagination di sini */}
                    <Pagination total={totalPages} page={currentPage} onChange={handlePageChange} size="md" />
                </div>
            </div>
        </div>
    );
};

export default KategoriProduk;
