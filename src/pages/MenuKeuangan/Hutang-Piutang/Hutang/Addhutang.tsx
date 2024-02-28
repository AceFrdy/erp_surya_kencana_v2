import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { setPageTitle } from '../../../../store/themeConfigSlice';

import 'react-toastify/dist/ReactToastify.css';
import { endpoint } from '../../../../utils';

interface FormState {
    // id: number;
    location_acc: number;
    direction_acc: number;
    debt_date: string;
    debt_balance: number;
    creditur_name: string;
}

interface DataDetailAccLocationProps {
    id: number;
    detail_acc_code: string;
    detail_acc_name: string;
}

interface DataDetailAcc {
    id: number;
    detail_acc_code: string;
    detail_acc_name: string;
}

const AddHutang = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Hutang'));
    });
    const [detailAccLocation, setDetailAccLocation] = useState<DataDetailAccLocationProps[]>([]);
    const [detailAcc, setDetailAcc] = useState<DataDetailAcc[]>([]);
    const [formData, setFormData] = useState<FormState>({
        // id: 0,
        debt_balance: 0,
        location_acc: 0,
        direction_acc: 0,
        debt_date: '',
        creditur_name: '',
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
            .get(`${endpoint}/api/debt-dropdown`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDetailAccLocation(response.data.data.resource.dataDetailAccLocation);
                setDetailAcc(response.data.data.resource.dataDetailAccDirection);
            })
            .catch((err: any) => {
                console.log('DETAIL ACCOUNT', err.message);
            });
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            location_acc: formData.location_acc,
            direction_acc: formData.direction_acc,
            debt_date: formData.debt_date,
            debt_balance: formData.debt_balance,
            creditur_name: formData.creditur_name,
        };

        axios
            .post(`${endpoint}/api/debts`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Hutang Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                handleCancel();
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    location_acc: formData.location_acc,
                    direction_acc: formData.direction_acc,
                    debt_date: formData.debt_date,
                    debt_balance: formData.debt_balance,
                    creditur_name: formData.creditur_name,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Hutang Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_ADDING_DEBT',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    const handleCancel = () => {
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
                    <span>Hutang - Piutang</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Hutang</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Add Hutang</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="detailAccLocation">Akun Asal</label>
                        <select id="detailAccLocation" className="form-select text-white-dark" name="location_acc" value={formData.location_acc} onChange={handleChange}>
                            <option value="">Choose...</option>
                            {detailAccLocation?.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.detail_acc_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="detailAcc">Akun Tujuan</label>
                        <select id="detailAcc" className="form-select text-white-dark" name="direction_acc" value={formData.direction_acc} onChange={handleChange}>
                            <option value="">Choose...</option>
                            {detailAcc?.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.detail_acc_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="debt_balance">Total Nominal</label>
                        <input id="debt_balance" type="text" placeholder="Rp." className="form-input" name="debt_balance" value={formData.debt_balance} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="creditur_name">Kreditur</label>
                        <input id="creditur_name" type="text" placeholder="Nama Kreditur..." className="form-input" name="creditur_name" value={formData.creditur_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="debt_date">Tanggal</label>
                        <input id="debt_date" type="date" placeholder="Tanggal..." className="form-input" name="debt_date" value={formData.debt_date} onChange={handleChange} />
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
export default AddHutang;
