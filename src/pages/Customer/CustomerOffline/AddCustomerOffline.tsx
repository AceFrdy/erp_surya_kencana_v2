import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { setPageTitle } from '../../../store/themeConfigSlice';

import 'react-toastify/dist/ReactToastify.css';
import { endpoint } from '../../../utils';

interface FormState {
    name: string;
    contact: string;
    address: string;
}

const AddCustomerOffline = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Customer Offline'));
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';

    const [formData, setFormData] = useState<FormState>({
        name: '',
        contact: '',
        address: '',
    });

    const handleAddData = (e: FormEvent) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            contact: formData.contact,
            address: formData.address,
        };

        axios
            .post(`${endpoint}/api/customers`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Customer Offline Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                handleCancel();
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    name: formData.name,
                    contact: formData.contact,
                    address: formData.address,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Customer Offline Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_ADDING_CUSTOMER_OFFLINE',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
            <ul className="flex space-x-2 rtl:space-x-reverse mb-4">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Tambah Customer Offline</span>
                </li>
            </ul>
            <div className="panel " id="single_file">
                <form onSubmit={handleAddData} className="space-y-5">
                    <h1 className="text-lg font-bold mb-12">Tambah Customer</h1>
                    <div>
                        <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Nama Customer" className="form-input" />
                    </div>
                    <div>
                        <input type="text" name="contact" onChange={handleChange} value={formData.contact} placeholder="No. Hp" className="form-input" />
                    </div>
                    <div>
                        <input type="text" name="address" onChange={handleChange} value={formData.address} placeholder="Alamat" className="form-input" />
                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleCancel} type="button" className="btn btn-primary !mt-6 mr-8">
                            Back
                        </button>
                        <button type="submit" className="btn btn-primary !mt-6 ">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerOffline;
