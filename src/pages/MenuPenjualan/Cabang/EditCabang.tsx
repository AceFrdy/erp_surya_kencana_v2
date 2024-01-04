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
                console.log('API Response:', response.data);
                const branchData = response.data.data.resource;
                setFormData({
                    branch_name: branchData.branch_name,
                    branch_address: branchData.branch_address,
                    branch_contact: branchData.branch_contact,
                });
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
                console.log('Branch data successfully updated:', response.data);
                navigate('/menupenjualan/cabang/listcabang');
                toast.success('Data berhasil diedit', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                    console.log('Validation Errors:', error.response.data);
                }
                console.error('Error updating branch data:', error);
                toast.error('Error updating data');
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
