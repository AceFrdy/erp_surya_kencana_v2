import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrash from '../../../components/Icon/IconTrash';
import IconUpload from '../../../components/Icon/icon-upload';

import 'react-toastify/dist/ReactToastify.css';
import { endpoint } from '../../../utils';

interface CategoriesProps {
    id: number;
    product_category_name: string;
}

interface SuplierProps {
    id: number;
    suplier_name: string;
}

interface DataProps {
    product_category_id: number;
    suplier_id: number;
    product_name: string;
    product_price: number;
    product_modal: number;
    product_pos: boolean;
    product_ecommers: boolean;
    product_responsibility: string;
    product_barcode: string;
    product_ime: string;
    product_weight: number;
}

const InputProduk = () => {
    const [categoriesProduct, setCategoriesProduct] = useState<CategoriesProps[]>([]);
    const [supliers, setSupliers] = useState<SuplierProps[]>([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Produk'));
    });

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [file, setFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<DataProps>({
        product_category_id: 0,
        suplier_id: 0,
        product_name: '',
        product_price: 0,
        product_modal: 0,
        product_pos: false,
        product_ecommers: false,
        product_responsibility: '',
        product_barcode: '',
        product_ime: '',
        product_weight: 0,
    });

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checkboxValue = (e.target as HTMLInputElement).checked ? 'yes' : '';
            setFormData((prevData) => ({
                ...prevData,
                [name]: checkboxValue,
            }));
        } else if (type === 'number') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: parseFloat(value),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleCancel = () => {
        navigate('/menupenjualan/product/produk');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('product_name', formData.product_name);
        data.append('product_price', formData.product_price.toString());
        data.append('product_category_id', formData.product_category_id.toString());
        data.append('product_modal', formData.product_modal.toString());
        data.append('product_responsibility', formData.product_responsibility);

        if (file) {
            data.append('product_image', file);
        }

        data.append('product_pos', formData.product_pos ? 'yes' : 'no');
        data.append('product_ecommers', formData.product_ecommers ? 'yes' : 'no');
        data.append('product_barcode', formData.product_barcode);
        data.append('product_ime', formData.product_ime);
        data.append('product_weight', formData.product_weight.toString());
        data.append('suplier_id', formData.suplier_id.toString());

        axios
            .post(`${endpoint}/api/products`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Produk Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                handleCancel();
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    product_category_id: formData.product_category_id,
                    suplier_id: formData.suplier_id,
                    product_name: formData.product_name,
                    product_price: formData.product_price,
                    product_modal: formData.product_modal,
                    product_pos: formData.product_pos,
                    product_ecommers: formData.product_ecommers,
                    product_responsibility: formData.product_responsibility,
                    product_barcode: formData.product_barcode,
                    product_ime: formData.product_ime,
                    product_weight: formData.product_weight,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Produk Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_ADDING_PRODUCT',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    useEffect(() => {
        axios
            .get(`${endpoint}/api/product-categories`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
            .then((response) => {
                setCategoriesProduct(response.data.data.resource.data);
            })
            .catch((err) => {
                console.log('CATEGORIES PRODUCT', err.message);
            });
        axios
            .get(`${endpoint}/api/supliers`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
            .then((response) => {
                setSupliers(response.data.data.resource.data);
            })
            .catch((err) => {
                console.log('SUPLIER', err.message);
            });
    }, []);

    useEffect(() => {
        const isOldValue = sessionStorage.getItem('old_value');
        if (isOldValue) {
            const oldValue = JSON.parse(isOldValue);
            setFormData(oldValue);

            return sessionStorage.removeItem('old_value');
        }
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { title, log, type, message } = JSON.parse(notificationMessage);
            if (type === 'error') {
                toast.error(message);
                console.log(title, log);

                return localStorage.removeItem('notification');
            }
        }
    }, []);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Produk</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <h1 className="text-lg font-bold mb-12">Tambah Produk</h1>
                        <div className="flex items-center justify-between mb-5">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="gridEmail">Nama Produk</label>
                                        <input
                                            id="gridEmail"
                                            type="text"
                                            placeholder="Nama Produk..."
                                            name="product_name"
                                            className="form-input"
                                            value={formData.product_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="gridPassword">Harga</label>
                                        <input
                                            id="gridPassword"
                                            type="number"
                                            placeholder="Masukan Harga..."
                                            className="form-input relative pl-8"
                                            name="product_price"
                                            value={formData.product_price}
                                            onChange={handleChange}
                                        />
                                        <p className="absolute top-9 left-2">Rp.</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="gridState">Kategori Produk</label>
                                        <select id="gridState" className="form-select text-black" name="product_category_id" value={formData.product_category_id} onChange={handleChange}>
                                            <option value="">Choose...</option>
                                            {categoriesProduct.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.product_category_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="gridState">Suplier</label>
                                    <select id="gridState" className="form-select text-black" name="suplier_id" value={formData.suplier_id} onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        {supliers.map((item) => (
                                            <option value={item.id} key={item.id}>
                                                {item.suplier_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    <div className="md:col-span-2 relative">
                                        <label htmlFor="gridCity">Modal</label>
                                        <input
                                            id="gridCity"
                                            type="number"
                                            placeholder="Masukan Modal..."
                                            className="form-input pl-10"
                                            name="product_modal"
                                            value={formData.product_modal}
                                            onChange={handleChange}
                                        />
                                        <p className="absolute top-9 left-3">Rp.</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="gridCity">Penanggung Jawab</label>
                                        <input
                                            id="gridCity"
                                            type="text"
                                            placeholder="Penanggung Jawab..."
                                            className="form-input"
                                            name="product_responsibility"
                                            value={formData.product_responsibility}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="gridZip">Barcode</label>
                                        <input
                                            id="gridZip"
                                            type="text"
                                            placeholder="Masukan Barcode..."
                                            name="product_barcode"
                                            className="form-input"
                                            value={formData.product_barcode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label htmlFor="gridZip">Imei</label>
                                        <input id="gridZip" type="text" placeholder="Masukan Ime..." name="product_ime" className="form-input" value={formData.product_ime} onChange={handleChange} />
                                    </div>
                                    <div className="md:col-span-1 relative">
                                        <label htmlFor="gridZip">Product Weight</label>
                                        <input
                                            id="gridZip"
                                            type="number"
                                            placeholder="Masukan Berat..."
                                            name="product_weight"
                                            className="form-input pr-10"
                                            value={formData.product_weight}
                                            onChange={handleChange}
                                        />
                                        <p className="absolute top-9 right-3">Kg</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center mt-1 cursor-pointer">
                                        <input type="checkbox" className="form-checkbox" name="product_pos" checked={formData.product_pos} onChange={handleChange} />

                                        <span className="text-white-dark">POS</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center mt-1 cursor-pointer">
                                        <input type="checkbox" className="form-checkbox" name="product_ecommers" checked={formData.product_ecommers} onChange={handleChange} />
                                        <span className="text-white-dark">E-Commerce</span>
                                    </label>
                                </div>
                                <div className="relative">
                                    {file ? (
                                        <div className="group w-60">
                                            <label>Gambar Produk</label>
                                            <div className="h-60 absolute top-[26px] w-60 rounded-md bg-red-100/80 hidden backdrop-blur-sm group-hover:flex justify-center items-center">
                                                <div className="w-40 h-40  rounded-md flex justify-center items-center border-red-700 border border-dashed">
                                                    <button
                                                        className="w-12 h-12 rounded-full bg-red-700 flex justify-center items-center cursor-default hover:bg-red-700/80"
                                                        onClick={() => {
                                                            setFile(null);
                                                        }}
                                                    >
                                                        <IconTrash className="w-6 h-6 text-red-100" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-60 h-60 top-0 overflow-hidden rounded-md">
                                                <img className="object-cover" src={URL.createObjectURL(file)} />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <label htmlFor="input-gambar">Gambar Produk</label>
                                            <label htmlFor="input-gambar" className="h-60 absolute top-[26px] w-60 rounded-md border flex items-center justify-center hover:bg-blue-50">
                                                <span className="w-40 h-40 flex justify-center items-center rounded-md border border-dashed border-black">
                                                    <div className="w-12 h-12 rounded-full bg-black hover:bg-black/80 flex justify-center items-center">
                                                        <IconUpload className="text-white w-6 h-6" />
                                                    </div>
                                                </span>
                                            </label>
                                            <div className="w-60 h-60" />
                                            <input className="hidden" onChange={onChangeImage} id="input-gambar" type="file" accept="image/*" />
                                        </>
                                    )}
                                </div>
                                <div></div>
                                <div className="flex">
                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Tambah
                                    </button>
                                    <button className="btn btn-primary !mt-6 ml-6" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputProduk;
