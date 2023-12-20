import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

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
        try {
            e.preventDefault();
            const data = {
                name: formData.name,
                contact: formData.contact,
                address: formData.address,
            };

            axios
                .post('https://erp.digitalindustryagency.com/api/customers', data, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const notification = {
                        type: 'success',
                        message: 'Customer Berhasil Ditambahkan',
                    };
                    localStorage.setItem('notification', JSON.stringify(notification));
                    navigate('/customer/offline');
                });
        } catch (error: any) {
            const notification = {
                type: 'error',
                message: 'Customer Gagal Ditambahkan',
            };
            localStorage.setItem('notification', JSON.stringify(notification));
            navigate(0);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        navigate('/customer/offline');
    };

    useEffect(() => {
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { type, message } = JSON.parse(notificationMessage);
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }
        }
        return localStorage.removeItem('notification');
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
                        <button onClick={handleCancel} className="btn btn-primary !mt-6 mr-8">
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
