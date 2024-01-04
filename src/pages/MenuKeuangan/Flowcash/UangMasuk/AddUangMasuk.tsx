import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

interface FormState {
    id: number;
    index_id: number;
    detail_account_id: number;
    detail_acc_name: string;
    index_info: string;
    cash_inflow_amount: number;
    cash_inflow_info: string;
    cash_inflow_date: string;
}

interface DetailAccountList {
    id: number;
    detail_acc_code: string;
    detail_acc_name: string;
}

interface IndexList {
    id: number;
    index_info: string;
}

const AddUangMasuk = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Uang Masuk'));
    });
    const [detailAccount, setDetailAccount] = useState<DetailAccountList[]>([]);
    const [index, setIndex] = useState<IndexList[]>([]);
    const [formData, setFormData] = useState<FormState>({
        id: 0,
        detail_acc_name: '',
        index_info: '',
        index_id: 0,
        detail_account_id: 0,
        cash_inflow_amount: 0,
        cash_inflow_info: '',
        cash_inflow_date: '',
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

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/cash-inflow-dropdown', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setIndex(response.data.data.resource.dataIndex);
                setDetailAccount(response.data.data.resource.dataDetailAcc);
            })
            .catch((err: any) => {
                console.log('DETAIL ACCOUNT', err.message);
            });
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            index_id: formData.index_id,
            detail_account_id: formData.detail_account_id,
            cash_inflow_amount: formData.cash_inflow_amount,
            cash_inflow_info: formData.cash_inflow_info,
            cash_inflow_date: formData.cash_inflow_date,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/cash-inflows', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Data Uang Masuk berhasil ditambahkan:', response.data);
                navigate('/menukeuangan/flowcash/uangmasuk');
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
                console.error('Error adding cash inflow data:', error);
                toast.error('Error adding data');
            });
    };

    const handleCancel = () => {
        navigate('/menukeuangan/flowcash/uangmasuk');
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Flow Cash</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Uang Masuk</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Add Uang Masuk</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label>Tanggal</label>
                        <input type="date" className="form-input" name="cash_inflow_date" value={formData.cash_inflow_date} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Detail Akun</label>
                        <select className="form-select text-white-dark" name="detail_account_id" value={formData.detail_account_id} onChange={handleChange}>
                            <option value="">Choose...</option>
                            {detailAccount.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.detail_acc_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Index</label>
                        <select id="gridState" className="form-select text-white-dark" name="index_id" value={formData.index_id} onChange={handleChange}>
                            <option value="">Choose...</option>
                            {index.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.index_info}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Cash</label>
                        <input type="text" placeholder="Rp." className="form-input" name="cash_inflow_amount" value={formData.cash_inflow_amount} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Keterangan</label>
                        <input type="text" placeholder="Keterangan..." className="form-input" name="cash_inflow_info" value={formData.cash_inflow_info} onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Tambah
                        </button>
                        <button type="submit" className="btn btn-primary !mt-6" onClick={handleCancel}>
                            Kembali
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddUangMasuk;
