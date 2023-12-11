import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailCustomerOnline = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
        errors: {},
    });

    const handleAddData = () => {
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
                console.log('Customer data successfully added:', response.data);
                navigate('/customer/online');
                toast.success('Data berhasil ditambahkan', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    console.error('Server Response Data:', error.response.data);
                    // ... your existing error handling code
                }
                console.error('Error adding customer data:', error);
                toast.error('Error adding data');
            });
    };

    const handleCancel = () => {
        navigate('/customer/online');
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-4">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Customer Online</span>
                </li>
            </ul>
            <div className="panel " id="single_file">
                <form className="space-y-5">
                    <h1 className="text-lg font-bold mb-12">Detail Customer</h1>
                    <div>
                        <input type="text" defaultValue="Trickster" placeholder="Nama Customer" className="form-input" />
                    </div>
                    <div>
                        <input type="text" defaultValue={+628913834124} placeholder="No. Hp" className="form-input" />
                    </div>
                    <div>
                        <input type="text" defaultValue="jalan baru d" placeholder="Alamat" className="form-input" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" onClick={handleAddData} className="btn btn-primary !mt-6 mr-8">
                            <Link to="/customer/online">Back</Link>
                        </button>
                        {/* <button type="submit" onClick={handleCancel} className="btn btn-primary !mt-6">
                            <Link to="/customer/online">Add</Link>
                        </button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DetailCustomerOnline;
