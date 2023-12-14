import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { setPageTitle } from '../../../../store/themeConfigSlice';
// import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IRootState } from '../../../../store';
import Swal from 'sweetalert2';
import 'flatpickr/dist/flatpickr.css';
import Flatpickr from 'react-flatpickr';

const DetailUangKeluar = () => {
    const options = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Uang Keluar'));
    });
    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [images, setImages] = useState<any>([]);
    const [images2, setImages2] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');
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
    const [cost, setCost] = useState('');

    const handleCostChange = (e: { target: { value: any } }) => {
        const inputValue = e.target.value;
        let formatValue = '';

        // Remove non-numeric characters
        const numValue = inputValue.replace(/\D/g, '');

        // Format the number with 'Rp.' prefix
        if (numValue !== '') {
            formatValue = `Rp. ${parseInt(numValue, 10).toLocaleString('id-ID')}`;
        }

        setCost(formatValue);
    };

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        category_id: '',
        supplier_id: '',
        product_name: '',
        product_price: '',
        product_modal: '',
        product_pos: '',
        ecommers: '',
        responsibility: '',
        product_image: '',
        product_barcode: '',
        product_ime: '',
        product_weight: '',
        errors: {},
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            product_category_id: formData.category_id,
            product_supplier_id: formData.supplier_id,
            product_name: formData.product_name,
            product_price: formData.product_price,
            product_modal: formData.product_modal,
            product_pos: formData.product_pos,
            product_ecommers: formData.ecommers,
            product_responsibility: formData.responsibility,
            product_image: formData.product_image,
            product_barcode: formData.product_barcode,
            product_ime: formData.product_ime,
            product_weight: formData.product_weight,
        };

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
                    <span>Detail Uang Keluar</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel" id="single_file">
                        <h1 className="text-lg font-bold mb-12">Detail Uang Keluar</h1>
                        <div className=" mb-5">
                            <form className="space-y-5">
                                <div>
                                    <div>
                                        <label htmlFor="gridState">Pilih Akun</label>
                                        <select id="gridState" disabled className="form-select text-white-dark w-full mb-4">
                                            <option>Modal</option>
                                            <option>Choose...</option>
                                            <option>Asset/Harta</option>
                                            <option>Kewajiban/Hutang</option>
                                            <option>Pendapatan</option>
                                            <option>Biaya</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="Cost">Index</label>
                                        <input id="Cost" type="text" defaultValue="Awalan" disabled placeholder="Index..." className="form-input mb-4" />
                                    </div>
                                    <div>
                                        <label htmlFor="Cost">Cash</label>
                                        <input id="Cost" type="text" defaultValue={1248746} disabled placeholder="Rp." className="form-input mb-4" />
                                    </div>
                                    <div>
                                        <label htmlFor="Cost">Keterangan</label>
                                        <input id="Cost" type="text" defaultValue="ga tau cuy" disabled placeholder="Keterangan..." className="form-input mb-4" />
                                    </div>
                                    <label htmlFor="Tanggal">Tanggal</label>
                                    <Flatpickr
                                        id="Tanggal"
                                        value={date1}
                                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                        className="form-input mb-4"
                                        disabled
                                        onChange={(date) => setDate1(date)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="myFirstImage">
                                <div className="label-container">
                                    <label>Upload Foto</label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        disabled
                                        onClick={() => {
                                            setImages([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <label className="custom-file-container__custom-file"></label>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
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
                                    <Link to="/menukeuangan/flowcash/uangkeluar">
                                        <button type="submit" className="btn btn-primary !mt-6 ml-6" onClick={handleCancel}>
                                            Kembali
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

export default DetailUangKeluar;
