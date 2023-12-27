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
import IconTrash from '../../../../components/Icon/IconTrash';
import IconUpload from '../../../../components/Icon/icon-upload';

interface DataFormProps {
    cash_outflow_date: string;
    index_id: number;
    detail_account_id: number;
    cash_outflow_name: string;
    cash_outflow_total: number;
    cash_outflow_info: string;
}

interface DetailAccountProps {
    id: number;
    detail_acc_name: string;
}
interface IndexListProps {
    id: number;
    index_info: string;
}

const AddUangKeluar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Uang Keluar'));
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [file, setFile] = useState<File | null>(null);
    const [detailAccount, setDetailAccount] = useState<DetailAccountProps[]>([]);
    const [indexList, setIndexList] = useState<IndexListProps[]>([]);

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const [formData, setFormData] = useState<DataFormProps>({
        cash_outflow_date: '',
        index_id: 0,
        detail_account_id: 0,
        cash_outflow_name: '',
        cash_outflow_total: 0,
        cash_outflow_info: '',
    });

    console.log('formData', formData);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { value, name, type } = e.target;
        if (type === 'number') {
            setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCancel = () => {
        // Instead of using a Link, directly use the navigate function
        navigate('/menupenjualan/product/produk');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('cash_outflow_date', formData.cash_outflow_date);
        data.append('index_id', formData.index_id.toString());
        data.append('detail_account_id', formData.detail_account_id.toString());
        data.append('cash_outflow_name', formData.cash_outflow_name);
        data.append('cash_outflow_total', formData.cash_outflow_total.toString());
        data.append('cash_outflow_info', formData.cash_outflow_info);
        if (file) {
            data.append('photo_struk', file);
        }
        axios
            .post('https://erp.digitalindustryagency.com/api/cash-outflows', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('SUCCESS_SUBMIT_FORM', response);
            })
            .catch((err: any) => {
                console.log('ERROR_SUBMIT_FORM', err.message);
            });
    };

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/cash-outflow-dropdown', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDetailAccount(response.data.data.resource.dataDetailAcc);
                setIndexList(response.data.data.resource.dataIndex);
            })
            .catch((err: any) => {
                console.log('DETAIL_ACCOUNT_ERROR', err.message);
            });
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
                    <span>Add Uang Keluar</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel" id="single_file">
                        <h1 className="text-lg font-bold mb-12">Add Uang Keluar</h1>
                        <div className=" mb-5">
                            <form className="space-y-5 flex flex-col w-full" onSubmit={handleSubmit}>
                                <div className="flex w-full space-x-5">
                                    <div className="flex flex-col space-y-5 w-full">
                                        <div>
                                            <label htmlFor="cash_outflow_name">Nama</label>
                                            <input
                                                id="cash_outflow_name"
                                                name="cash_outflow_name"
                                                type="text"
                                                placeholder="Nama..."
                                                className="form-input"
                                                value={formData.cash_outflow_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="detail_account_id">Pilih Akun</label>
                                            <select id="detail_account_id" name="detail_account_id" className="form-select w-full" value={formData.detail_account_id} onChange={handleChange}>
                                                <option>Pilih Akun...</option>
                                                {detailAccount.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.detail_acc_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="cash_outflow_date">Tanggal</label>
                                            <input id="cash_outflow_date" name="cash_outflow_date" className="form-input" type="date" value={formData.cash_outflow_date} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full space-y-5">
                                        <div>
                                            <label htmlFor="cash_outflow_total">Cash</label>
                                            <input
                                                id="cash_outflow_total"
                                                name="cash_outflow_total"
                                                type="number"
                                                placeholder="Cash..."
                                                className="form-input"
                                                onChange={handleChange}
                                                value={formData.cash_outflow_total}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="index_id">Pilih Index</label>
                                            <select id="index_id" name="index_id" className="form-select" value={formData.index_id} onChange={handleChange}>
                                                <option>Pilih Index...</option>
                                                {indexList.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.index_info}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="cash_outflow_info">Keterangan</label>
                                            <input
                                                id="cash_outflow_info"
                                                name="cash_outflow_info"
                                                type="text"
                                                placeholder="Keterangan..."
                                                value={formData.cash_outflow_info}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    {file ? (
                                        <div className="group w-60">
                                            <label htmlFor="input-gambar">Gambar Struk</label>
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
                                                <img className="object-cover" src={URL.createObjectURL(file)} alt="" />
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
                                <div className="mb-5 flex">
                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Submit
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

export default AddUangKeluar;
