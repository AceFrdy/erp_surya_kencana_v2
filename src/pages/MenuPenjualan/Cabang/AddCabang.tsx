import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';

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

        console.log('DATA SENT:', data);

        axios
            .post('https://erp.digitalindustryagency.com/api/branches', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Data cabang berhasil ditambahkan:', response.data);
                navigate('/menupenjualan/cabang/listcabang');
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
                console.error('Error adding cabang data:', error);
                toast.error('Error adding data');
            });
    };

    const handleCancel = () => {
        navigate('/menupenjualan/cabang/listcabang');
    };

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
