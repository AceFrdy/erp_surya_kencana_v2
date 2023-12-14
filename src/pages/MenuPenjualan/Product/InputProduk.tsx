import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import IconTrash from '../../../components/Icon/IconTrash';
import IconUpload from '../../../components/Icon/icon-upload';
import fs from 'fs';

interface FormState {
    product_category_id: number;
    supplier_id: number;
    product_name: string;
    product_price: number;
    product_modal: number;
    product_pos: string;
    product_ecommers: string;
    product_responsibility: string;
    product_image: File | null;
    product_barcode: string;
    product_ime: string;
    product_weight: number;
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
    useEffect(() => {
        dispatch(setPageTitle('Tambah Produk'));
    });

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [file, setFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<FormState>({
        product_category_id: 0,
        supplier_id: 0,
        product_name: '',
        product_price: 0,
        product_modal: 0,
        product_pos: '',
        product_ecommers: '',
        product_responsibility: '',
        product_image: null,
        product_barcode: '',
        product_ime: '',
        product_weight: 0,
    });

    const onChangeImage = (e: any) => {
        if (e.target.files) {
            console.log(e.target.value, e.target.files);
            setFile(e.target.files[0]);
            setFormData({ ...formData, product_image: e.target.files[0] });
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
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (file) {
            const data = {
                product_category_id: formData.product_category_id,
                suplier_id: formData.supplier_id,
                product_name: formData.product_name,
                product_price: formData.product_price,
                product_modal: formData.product_modal,
                product_pos: formData.product_pos,
                product_ecommers: formData.product_ecommers,
                product_responsibility: formData.product_responsibility,
                product_image: file,
                product_barcode: formData.product_barcode,
                product_ime: formData.product_ime,
                product_weight: formData.product_weight,
            };
            console.log('Data to be sent:', data);

            await axios
                .post('https://erp.digitalindustryagency.com/api/products', data, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log('Customer data successfully added:', response.data);
                    navigate('/menupenjualan/product/produk');
                    toast.success('Data berhasil ditambahkan', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        console.error('Server Response Data:', error.response.data);
                        // ... your existing error handling code
                    }
                    console.error('Error adding customer data:', error);
                    toast.error('Error adding data');
                });
        }
    };

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/product-categories', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
            .then((response) => {
                setCategoriesProduct(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('CATEGORIES PRODUCT', err.message);
            });
        axios
            .get('https://erp.digitalindustryagency.com/api/supliers', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
            .then((response) => {
                setSupliers(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('SUPLIER', err.message);
            });
    }, []);

    // const [productData, setProductData] = useState<any>({});
    const handleCancel = () => {
        // Instead of using a Link, directly use the navigate function
        navigate('/menupenjualan/product/produk');
    };

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
                                    <select id="gridState" className="form-select text-black" name="supplier_id" value={formData.supplier_id} onChange={handleChange}>
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
                                        <input type="checkbox" className="form-checkbox" name="product_pos" checked={formData.product_pos === 'yes'} onChange={handleChange} />

                                        <span className="text-white-dark">POS</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center mt-1 cursor-pointer">
                                        <input type="checkbox" className="form-checkbox" name="product_ecommers" checked={formData.product_ecommers === 'yes'} onChange={handleChange} />
                                        <span className="text-white-dark">E-Commerce</span>
                                    </label>
                                </div>
                                <div className="relative">
                                    {formData.product_image ? (
                                        <div className="group w-60">
                                            <label>Gambar Produk</label>
                                            <div className="h-60 absolute top-[26px] w-60 rounded-md bg-red-100/80 hidden backdrop-blur-sm group-hover:flex justify-center items-center">
                                                <div className="w-40 h-40  rounded-md flex justify-center items-center border-red-700 border border-dashed">
                                                    <button
                                                        className="w-12 h-12 rounded-full bg-red-700 flex justify-center items-center cursor-default hover:bg-red-700/80"
                                                        onClick={() => {
                                                            setFormData({ ...formData, product_image: null });
                                                        }}
                                                    >
                                                        <IconTrash className="w-6 h-6 text-red-100" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-60 h-60 top-0 overflow-hidden rounded-md">
                                                <img className="object-cover" src={URL.createObjectURL(formData.product_image)} />
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
