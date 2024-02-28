import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { endpoint } from '../../../utils';

interface AkunDataProps {
    acc_type: string;
    acc_group_name: string;
    acc_info: string;
}

const EditAkun = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';

    const [formData, setFormData] = useState<AkunDataProps>({
        acc_type: '',
        acc_group_name: '',
        acc_info: '',
    });

    // handle_change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // handle_submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            acc_type: formData.acc_type,
            acc_group_name: formData.acc_group_name,
            acc_info: formData.acc_info,
        };

        axios
            .put(`${endpoint}/api/accounts/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Akun Berhasil Diperbarui',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate('/menukeuangan/akun/akun');
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    acc_type: formData.acc_type,
                    acc_group_name: formData.acc_group_name,
                    acc_info: formData.acc_info,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Akun Gagal Diperbarui',
                    log: err.message,
                    title: 'ERROR_EDITING_ACCOUNT',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    // get_data
    useEffect(() => {
        axios
            .get(`${endpoint}/api/accounts/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const accountData = response.data.data.resource;
                setFormData(accountData);
            })
            .catch((err: any) => {
                console.log('ERROR_GETTING_DETAIL:', err.message);
            });
    }, []);

    // get_notif
    useEffect(() => {
        const isOldValue = sessionStorage.getItem('old_value');
        if (isOldValue) {
            const oldValue = JSON.parse(isOldValue);
            setFormData(oldValue);
        }
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { title, log, type, message } = JSON.parse(notificationMessage);
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
                console.log(title, log);
            }
        }
        return () => {
            localStorage.removeItem('notification');
            sessionStorage.removeItem('old_value');
        };
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
                    <span>Akun</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit Akun</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Edit Akun</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="gridState">Jenis Akun</label>
                        <select id="gridState" name="acc_type" value={formData.acc_type} onChange={handleInputChange} className="form-select">
                            <option>Modal</option>
                            <option>Choose...</option>
                            <option>Asset/Harta</option>
                            <option>Kewajiban/Hutang</option>
                            <option>Pendapatan</option>
                            <option>Biaya</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="actionWeb">Group:</label>
                        <div className="flex flex-1">
                            <input
                                id="actionWeb"
                                name="acc_group_name"
                                value={formData.acc_group_name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Group..."
                                className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="actionWeb">Keterangan</label>
                        <input id="actionWeb" name="acc_info" value={formData.acc_info} onChange={handleInputChange} type="text" placeholder="Keterangan..." className="form-input" />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Update
                        </button>
                        <Link to="/menukeuangan/akun/akun">
                            <button type="button" className="btn btn-primary !mt-6">
                                Kembali
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditAkun;
