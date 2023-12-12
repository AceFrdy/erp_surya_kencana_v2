import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormState {
    name: string;
    contact: string;
    address: string;
}

const EditCustomerOffline = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const { id } = useParams();

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
            .put(`https://erp.digitalindustryagency.com/api/customers/${id}`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                navigate('/customer/offline');
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
        axios
            .get(`https://erp.digitalindustryagency.com/api/users/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setFormData({ name: response.data.data.resource.name, contact: response.data.data.resource.contact, address: response.data.data.resource.address });
            })
            .catch((err) => {
                console.log(err);
            });
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
                    <span>Edit Customer Offline</span>
                </li>
            </ul>
            <div className="panel " id="single_file">
                <form onSubmit={handleAddData} className="space-y-5">
                    <h1 className="text-lg font-bold mb-12">Edit Customer</h1>
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerOffline;
