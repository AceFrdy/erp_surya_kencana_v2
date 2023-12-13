import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const InputProduk = () => {
    const options = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('File Upload Preview'));
    });

    const showAlert = async (type: number) => {
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

    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };
    interface FormState {
        product_category_id: string;
        supplier_id: string;
        product_name: string;
        product_price: string;
        product_modal: string;
        product_pos: string;
        ecommers: '';
        product_responsibility: string;
        product_image: File | null;
        product_barcode: string;
        product_ime: string;
        product_weight: string;
        errors: {};
    }

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState<FormState>({
        product_category_id: '',
        supplier_id: '',
        product_name: '',
        product_price: '',
        product_modal: '',
        product_pos: '',
        ecommers: '',
        product_responsibility: '',
        product_image: null,
        product_barcode: '',
        product_ime: '',
        product_weight: '',
        errors: {},
    });

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]; // Mengambil file dari event onChange
        setFormData((prevData) => ({
            ...prevData,
            product_image: file, // Menyimpan file ke state formData
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            product_category_id: formData.product_category_id,
            product_supplier_id: formData.supplier_id,
            product_name: formData.product_name,
            product_price: formData.product_price,
            product_modal: formData.product_modal,
            product_pos: formData.product_pos,
            product_ecommers: formData.ecommers,
            product_responsibility: formData.product_responsibility,
            product_image: formData.product_image,
            product_barcode: formData.product_barcode,
            product_ime: formData.product_ime,
            product_weight: formData.product_weight,
        };
        console.log('Data to be sent:', data);

        axios
            .post('https://erp.digitalindustryagency.com/api/products', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Data product berhasil ditambahkan:', response.data);
                navigate('/menupenjualan/product/produk');
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
                console.error('Error adding product data:', error);
                toast.error('Error adding data');
            });
    };

    const [productData, setProductData] = useState<any>({});
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
                                    <div>
                                        <label htmlFor="gridPassword">Harga</label>
                                        <input
                                            id="gridPassword"
                                            type="text"
                                            placeholder="Masukan Harga..."
                                            className="form-input"
                                            name="product_price"
                                            value={formData.product_price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="gridState">Kategori Produk</label>
                                        <select id="gridState" className="form-select text-white-dark" name='product_category_id' value={formData.product_category_id} onChange={handleChange}>
                                            <option value="">Choose...</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="gridState">Suplier</label>
                                    <select id="gridState" className="form-select text-white-dark" name="supplier_id" value={formData.supplier_id} onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <label htmlFor="gridCity">Modal</label>
                                        <input
                                            id="gridCity"
                                            type="text"
                                            placeholder="Masukan Modal..."
                                            className="form-input"
                                            name="product_modal"
                                            value={formData.product_modal}
                                            onChange={handleChange}
                                        />
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
                                    <div className="md:col-span-1">
                                        <label htmlFor="gridZip">Product Weight</label>
                                        <input
                                            id="gridZip"
                                            type="text"
                                            placeholder="Masukan Berat..."
                                            name="product_weight"
                                            className="form-input"
                                            value={formData.product_weight}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center mt-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            name="product_pos"
                                            checked={formData.product_pos === 'yes'}
                                            onChange={(e) => {
                                                const newValue = e.target.checked ? 'yes' : '';
                                                setFormData((prevData) => {
                                                    const updatedData = {
                                                        ...prevData,
                                                        product_pos: newValue,
                                                    };
                                                    console.log('Updated product_pos:', updatedData.product_pos); // Log nilai terbaru ke console
                                                    return updatedData;
                                                });
                                            }}
                                        />

                                        <span className="text-white-dark">POS</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center mt-1 cursor-pointer">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="text-white-dark">E-Commerce</span>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="myFirstImage">
                                <div className="label-container">
                                    <label>Upload Foto </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setImages([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <label className="custom-file-container__custom-file"></label>
                                <input type="file" onChange={handleFileChange} name="product_image" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </button>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                                <div key={index} className="custom-file-container__image-preview relative">
                                                    <img src={image.dataURL} alt="img" className="m-auto" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                                {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" /> : ''}
                                <div className="flex">
                                    <Link to="/menupenjualan/product/produk">
                                        <button type="submit" className="btn btn-primary !mt-6" onClick={handleSubmit}>
                                            Tambah
                                        </button>
                                    </Link>
                                    <Link to="/menupenjualan/product/produk">
                                        <button type="submit" className="btn btn-primary !mt-6 ml-6" onClick={handleCancel}>
                                            Cancel
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputProduk;
