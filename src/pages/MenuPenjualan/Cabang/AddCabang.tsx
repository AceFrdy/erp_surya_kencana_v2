import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { setPageTitle } from '../../../store/themeConfigSlice';

const AddCabang = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Cabang'));
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        branch_name: '',
        branch_address: '',
        branch_contact: '',
        errors: {},
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            branch_name: formData.branch_name,
            branch_address: formData.branch_address,
            branch_contact: formData.branch_contact,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/branches', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Cabang Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                handleCancel();
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    branch_name: formData.branch_name,
                    branch_address: formData.branch_address,
                    branch_contact: formData.branch_contact,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Cabang Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_ADDING_CABANG',
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
                    <Link to="/menupenjualan/cabang/listcabang" className="text-primary hover:underline">
                        Cabang
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Cabang</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between mb-5"></div>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <h1 className="text-lg font-bold mb-12">Tambah Cabang</h1>
                            <div>
                                <input type="text" placeholder="Nama Cabang..." className="form-input" name="branch_name" value={formData.branch_name} onChange={handleChange} />
                            </div>
                            <div>
                                <input type="text" placeholder="Alamat Cabang..." className="form-input" name="branch_address" value={formData.branch_address} onChange={handleChange} />
                            </div>
                            <div>
                                <input type="text" placeholder="No Handphone..." className="form-input" name="branch_contact" value={formData.branch_contact} onChange={handleChange} />
                            </div>
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            <div className="flex">
                                <button type="submit" className="btn btn-primary !mt-6">
                                    Submit
                                </button>
                                <button type="button" className="btn btn-primary !mt-6 ml-6" onClick={handleCancel}>
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCabang;
