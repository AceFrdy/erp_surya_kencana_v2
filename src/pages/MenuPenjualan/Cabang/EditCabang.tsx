import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCabang = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        branch_name: '',
        branch_address: '',
        branch_contact: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/branches/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const branchData = response.data.data.resource;
                setFormData(branchData);
            })
            .catch((error) => {
                console.error('Error fetching branch data:', error);
                toast.error('Error fetching data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, token]);

    const handleInputChange = (label: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [label]: value,
        }));
    };

    const handleEditBranch = () => {
        axios
            .put(`https://erp.digitalindustryagency.com/api/branches/${id}`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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
                    <span>Edit Cabang</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between mb-5"></div>
                        <form className="space-y-5">
                            <h1 className="text-lg font-bold mb-12">Edit Cabang</h1>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nama Cabang..."
                                    className="form-input"
                                    name="branch_name"
                                    value={formData.branch_name}
                                    onChange={(e) => handleInputChange('branch_name', e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Alamat Cabang..."
                                    className="form-input"
                                    name="branch_address"
                                    value={formData.branch_address}
                                    onChange={(e) => handleInputChange('branch_address', e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="No Handphone..."
                                    className="form-input"
                                    name="branch_contact"
                                    value={formData.branch_contact}
                                    onChange={(e) => handleInputChange('branch_contact', e.target.value)}
                                />
                            </div>
                            <div className="flex">
                                <button type="button" className="btn btn-primary !mt-6" onClick={handleEditBranch}>
                                    Ubah
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

export default EditCabang;
