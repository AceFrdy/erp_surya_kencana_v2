import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { setPageTitle } from '../../../../store/themeConfigSlice';

import 'react-toastify/dist/ReactToastify.css';

interface AccProps {
    id: number;
    detail_acc_name: string;
}

interface DataProps {
    location_acc: number;
    direction_acc: number;
    debitur_name: string;
    receivable_date: string;
    receivable_balance: number;
}

const AddPiutang = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [locationAcc, setLocationAcc] = useState<AccProps[]>([]);
    const [directionAcc, setDirectionAcc] = useState<AccProps[]>([]);

    const [formData, setFormData] = useState<DataProps>({
        location_acc: 0,
        direction_acc: 0,
        debitur_name: '',
        receivable_date: '',
        receivable_balance: 0,
    });

    // handle_change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, type, value } = e.target;
        if (type === 'number') {
            setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // handle_cancel
    const handleCancel = () => {
        navigate('/menukeuangan/hutang-piutang/piutang');
    };

    // handle_submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            location_acc: formData.location_acc,
            direction_acc: formData.direction_acc,
            debitur_name: formData.debitur_name,
            receivable_date: formData.receivable_date,
            receivable_balance: formData.receivable_balance,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/receivables', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Piutang Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate('/menukeuangan/hutang-piutang/piutang');
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    location_acc: formData.location_acc,
                    direction_acc: formData.direction_acc,
                    debitur_name: formData.debitur_name,
                    receivable_date: formData.receivable_date,
                    receivable_balance: formData.receivable_balance,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Piutang Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_ADDING_PIUTANG',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    // get_dropdown
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/receivable-dropdown', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setLocationAcc(response.data.data.resource.dataDetailAccLocation);
                setDirectionAcc(response.data.data.resource.dataDetailAccDirection);
            })
            .catch((err: any) => {
                console.log('ERROR_GET_OPTION', err.message);
            });
    }, []);

    // handle_title_page
    useEffect(() => {
        dispatch(setPageTitle('Tambah Piutang'));
    }, []);

    // handle_notif
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
                    <span>Add Piutang</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Add Piutang</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="location_acc">Akun Asal</label>
                        <select id="location_acc" name="location_acc" className="form-select" onChange={handleChange} value={formData.location_acc}>
                            <option>Pilih Akun Asal...</option>
                            {locationAcc.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.detail_acc_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="direction_acc">Akun Tujuan</label>
                        <select id="direction_acc" name="direction_acc" className="form-select" onChange={handleChange} value={formData.direction_acc}>
                            <option>Pilih Akun Tujuan...</option>
                            {directionAcc.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.detail_acc_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="debitur_name">Nama Debitur</label>
                        <input id="debitur_name" name="debitur_name" type="text" placeholder="Nama Debitur..." className="form-input" onChange={handleChange} value={formData.debitur_name} />
                    </div>
                    <div className="relative">
                        <label htmlFor="receivable_balance">Total Nominal</label>
                        <input
                            id="receivable_balance"
                            name="receivable_balance"
                            type="text"
                            placeholder="Rp."
                            className="form-input pl-10"
                            onChange={handleChange}
                            value={formData.receivable_balance}
                        />
                        <p className="absolute top-9 left-3">Rp.</p>
                    </div>
                    <div>
                        <label htmlFor="receivable_date">Tanggal</label>
                        <input type="date" id="receivable_date" name="receivable_date" className="form-input" onChange={handleChange} value={formData.receivable_date} />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Tambah
                        </button>
                        <button className="btn btn-primary !mt-6" onClick={handleCancel}>
                            Kembali
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddPiutang;
