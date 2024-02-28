import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import IconTrash from '../../../components/Icon/IconTrash';
import IconUpload from '../../../components/Icon/icon-upload';
import { setPageTitle } from '../../../store/themeConfigSlice';

import 'react-toastify/dist/ReactToastify.css';
import { endpoint } from '../../../utils';

interface FormState {
    product_category_id: number;
    suplier_id: number;
    product_name: string;
    product_price: number;
    product_modal: number;
    product_responsibility: string;
    product_barcode: string;
    product_ime: string;
    product_weight: number;
}

interface RadioProps {
    product_pos: boolean;
    product_ecommers: boolean;
}

interface CategoriesProductList {
    id: number;
    product_category_name: string;
}

interface SupliersList {
    id: number;
    suplier_name: string;
}

const InputProduk = () => {
    const [categoriesProduct, setCategoriesProduct] = useState<CategoriesProductList[]>([]);
    const [supliers, setSupliers] = useState<SupliersList[]>([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [urlImage, setUrlImage] = useState<string>('');
    const [fileGambar, setFileGambar] = useState<File | null>(null);
    const { id } = useParams();

    const [formData, setFormData] = useState<FormState>({
        product_category_id: 0,
        suplier_id: 0,
        product_name: '',
        product_price: 0,
        product_modal: 0,
        product_responsibility: '',
        product_barcode: '',
        product_ime: '',
        product_weight: 0,
    });

    const [formRadio, setFormRadio] = useState<RadioProps>({
        product_pos: false,
        product_ecommers: false,
    });

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileGambar(e.target.files[0]);
        }
    };

    useEffect(() => {
        axios
            .get(`${endpoint}/api/products/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const data = response.data.data.resource;
                setFormData(data);
                setUrlImage(data.product_image);
                setFormRadio({ product_ecommers: data.product_ecommers === 'yes' ? true : false, product_pos: data.product_pos === 'yes' ? true : false });
            });
        axios
            .get(`${endpoint}/api/product-categories`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
            .then((response) => {
                setCategoriesProduct(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('ERROR_CATEGORIES_PRODUCT', err.message);
            });
        axios
            .get(`${endpoint}/api/supliers`, { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
            .then((response) => {
                setSupliers(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('ERROR_SUPLIER', err.message);
            });
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checkboxValue = (e.target as HTMLInputElement).checked ? 'yes' : '';
            setFormRadio((prevData) => ({
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

        const dataRequest = new FormData();
        dataRequest.append('product_name', formData.product_name);
        dataRequest.append('product_price', formData.product_price.toString());
        dataRequest.append('product_category_id', formData.product_category_id.toString());
        dataRequest.append('product_modal', formData.product_modal.toString());
        dataRequest.append('product_responsibility', formData.product_responsibility);

        if (fileGambar) {
            dataRequest.append('product_image', fileGambar);
        }

        dataRequest.append('product_pos', formRadio.product_pos ? 'yes' : 'no');
        dataRequest.append('product_ecommers', formRadio.product_ecommers ? 'yes' : 'no');
        dataRequest.append('product_barcode', formData.product_barcode);
        dataRequest.append('product_ime', formData.product_ime);
        dataRequest.append('product_weight', formData.product_weight.toString());
        dataRequest.append('suplier_id', formData.suplier_id.toString());
        dataRequest.append('_method', 'put');

        axios
            .post(`${endpoint}/api/products/${id}`, dataRequest, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Produk Berhasil Diperbarui',
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
                    product_pos: formRadio.product_pos,
                    product_ecommers: formRadio.product_ecommers,
                    product_responsibility: formData.product_responsibility,
                    product_barcode: formData.product_barcode,
                    product_ime: formData.product_ime,
                    product_weight: formData.product_weight,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Produk Gagal Diperbarui',
                    log: err.message,
                    title: 'ERROR_EDITING_PRODUCT',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    useEffect(() => {
        dispatch(setPageTitle('Edit Produk'));
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
                    <span>Edit Produk</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <h1 className="text-lg font-bold mb-12">Edit Produk</h1>
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
                                        <input type="checkbox" className="form-checkbox" name="product_pos" checked={formRadio.product_pos} onChange={handleChange} />

                                        <span className="text-white-dark">POS</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center mt-1 cursor-pointer">
                                        <input type="checkbox" className="form-checkbox" name="product_ecommers" checked={formRadio.product_ecommers} onChange={handleChange} />
                                        <span className="text-white-dark">E-Commerce</span>
                                    </label>
                                </div>
                                <div className="relative">
                                    {fileGambar ? (
                                        <>
                                            <div className="group w-60">
                                                <label>Gambar Produk</label>
                                                <div className="h-60 absolute top-[26px] w-60 rounded-md bg-red-100/80 hidden backdrop-blur-sm group-hover:flex justify-center items-center">
                                                    <div className="w-40 h-40  rounded-md flex justify-center items-center border-red-700 border border-dashed">
                                                        <button
                                                            className="w-12 h-12 rounded-full bg-red-700 flex justify-center items-center cursor-default hover:bg-red-700/80"
                                                            onClick={() => {
                                                                setFileGambar(null);
                                                            }}
                                                        >
                                                            <IconTrash className="w-6 h-6 text-red-100" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-60 h-60 top-0 overflow-hidden rounded-md">
                                                    <img className="object-cover" src={URL.createObjectURL(fileGambar)} />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {urlImage ? (
                                                <div className="group w-60">
                                                    <label>Gambar Produk</label>
                                                    <label
                                                        htmlFor="input-gambar"
                                                        className="h-60 absolute top-[26px] group w-60 rounded-md border group-hover:flex hidden items-center justify-center bg-blue-100/50 backdrop-blur-sm transition-all"
                                                    >
                                                        <span className="w-40 h-40 group-hover:flex hidden transition-all justify-center items-center rounded-md border border-dashed border-black">
                                                            <div className="w-12 h-12 rounded-full bg-black transition-all hover:bg-black/80 group-hover:flex hidden justify-center items-center">
                                                                <IconUpload className="text-white w-6 h-6" />
                                                            </div>
                                                        </span>
                                                    </label>
                                                    <input className="hidden" onChange={onChangeImage} id="input-gambar" type="file" accept="image/*" />
                                                    <div className="w-60 h-60 top-0 overflow-hidden rounded-md">
                                                        <img className="object-cover" src={urlImage} alt="" />
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
                                        </>
                                    )}
                                </div>
                                <div></div>
                                <div className="flex">
                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Update
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
