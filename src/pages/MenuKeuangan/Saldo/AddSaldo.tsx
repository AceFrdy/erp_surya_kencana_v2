import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

interface DataDetailAccountProps {
    id: number;
    detail_acc_code: string;
    detail_acc_name: string;
}

const AddSaldo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [detailAccount, setDetailAccount] = useState<DataDetailAccountProps[]>([]);
    useEffect(() => {
        dispatch(setPageTitle('Tambah Saldo'));
    });
    const [formData, setFormData] = useState({
        saldo_date: '',
        detail_account_id: '',
        saldo_amount: '',
        saldo_info: '',
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
            .get('https://erp.digitalindustryagency.com/api/detail-accounts', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDetailAccount(response.data.data.resource.data);
                console.log("DETAIL ACCOUNT", response.data.data.resource.data)
            })
            .catch((err: any) => {
                console.log('DETAIL ACCOUNT', err.message);
            });
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            saldo_date: formData.saldo_date,
            detail_account_id: formData.detail_account_id,
            saldo_amount: formData.saldo_amount,
            saldo_info: formData.saldo_info,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/saldos', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Data saldo berhasil ditambahkan:', response.data);
                navigate('/menukeuangan/saldo');
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
                console.error('Error adding saldo data:', error);
                toast.error('Error adding data');
            });
    };

    const handleCancel = () => {
        // Instead of using a Link, directly use the navigate function
        navigate('/menukeuangan/saldo');
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
                    <span>Saldo</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Saldo</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Add Saldo</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="date">Tanggal Saldo</label>
                        <input type="date" className="form-input" name="saldo_date" value={formData.saldo_date} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="detail_account">Detail Akun</label>
                        <select className="form-select text-white-dark" name="detail_account_id" value={formData.detail_account_id} onChange={handleChange}>
                            <option value="">Choose...</option>
                            {detailAccount && detailAccount.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.detail_acc_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="saldo_amount">Jumlah Saldo</label>
                        <input type="text" placeholder="Jumlah Saldo..." className="form-input" name="saldo_amount" value={formData.saldo_amount} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="saldo_info">Keterangan Saldo</label>
                        <input type="text" placeholder="Keterangan Saldo..." className="form-input" name="saldo_info" value={formData.saldo_info} onChange={handleChange} />
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
export default AddSaldo;
