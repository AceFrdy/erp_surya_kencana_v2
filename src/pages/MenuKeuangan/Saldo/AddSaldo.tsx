import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { setPageTitle } from '../../../store/themeConfigSlice';

import 'react-toastify/dist/ReactToastify.css';
import { endpoint } from '../../../utils';

interface DataDetailAccountProps {
    id: number;
    detail_acc_code: string;
    detail_acc_name: string;
}

interface DataProps {
    saldo_date: string;
    detail_account_id: number;
    saldo_amount: string;
    saldo_info: string;
}

const AddSaldo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [detailAccount, setDetailAccount] = useState<DataDetailAccountProps[]>([]);
    useEffect(() => {
        dispatch(setPageTitle('Tambah Saldo'));
    });
    const [formData, setFormData] = useState<DataProps>({
        saldo_date: '',
        detail_account_id: 0,
        saldo_amount: '',
        saldo_info: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        axios
            .get(`${endpoint}/api/saldo-dropdown`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDetailAccount(response.data.data.resource.dataDetailAcc);
            })
            .catch((err: any) => {
                console.log('DETAIL ACCOUNT', err.message);
            });
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('saldo_date', formData.saldo_date);
        data.append('detail_account_id', formData.detail_account_id.toString());
        data.append('saldo_amount', formData.saldo_amount);
        data.append('saldo_info', formData.saldo_info);

        const config = {
            method: 'post',
            url: `${endpoint}/api/saldos`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        await axios
            .request(config)
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Saldo Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                handleCancel();
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    saldo_date: formData.saldo_date,
                    detail_account_id: formData.detail_account_id,
                    saldo_amount: formData.saldo_amount,
                    saldo_info: formData.saldo_info,
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

    const handleCancel = () => {
        // Instead of using a Link, directly use the navigate function
        navigate(-1);
    };

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
                            {detailAccount?.map((item) => (
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
                        <input type="text" placeholder="Keterangan Saldo..." minLength={11} className="form-input" name="saldo_info" value={formData.saldo_info} onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Tambah
                        </button>
                        <button type="button" className="btn btn-primary !mt-6" onClick={handleCancel}>
                            Kembali
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddSaldo;
