import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setPageTitle } from '../../../store/themeConfigSlice';

const EditSupplier = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Supplier'));
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        suplier_name: '',
        suplier_address: '',
        suplier_contact: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/suplier/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('API Response:', response.data);
                const suplierData = response.data.data.resource;
                setFormData({
                    suplier_name: suplierData.suplier_name,
                    suplier_address: suplierData.suplier_address,
                    suplier_contact: suplierData.suplier_contact,
                });
            })
            .catch((error) => {
                console.error('Error fetching suplier data:', error);
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

    const handleEditSuplier = () => {
        axios
            .put(`https://erp.digitalindustryagency.com/api/suplier/${id}`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('suplier data successfully updated:', response.data);
                navigate('/menupenjualan/supplier');
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
                console.error('Error updating suplier data:', error);
                toast.error('Error updating data');
            });
    };

    const handleCancel = () => {
        navigate('/menupenjualan/supplier');
    };

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or any other UI element.
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/menupenjualan/supplier" className="text-primary hover:underline">
                        Supplier
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit Supplier</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between mb-5"></div>
                        <form className="space-y-5">
                            <h1 className="text-lg font-bold mb-12">Edit Supplier</h1>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nama Supplier..."
                                    className="form-input"
name='suplier_name'
                                    value={formData.suplier_name}
                                    onChange={(e) => handleInputChange('suplier_name', e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Alamat Supplier..."
                                    className="form-input"
name='suplier_address'
                                    value={formData.suplier_address}
                                    onChange={(e) => handleInputChange('suplier_address', e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="No Handphone..."
                                    className="form-input"
name='suplier_contact'
                                    value={formData.suplier_contact}
                                    onChange={(e) => handleInputChange('suplier_contact', e.target.value)}
                                />
                            </div>
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            <div className="flex">
                                <Link to="/menupenjualan/supplier">
                                    <button type="submit" className="btn btn-primary !mt-6" onClick={handleEditSuplier}>
                                        Simpan
                                    </button>
                                </Link>
                                <Link to="/menupenjualan/supplier">
                                    <button type="submit" className="btn btn-primary !mt-6 ml-6" onClick={handleCancel}>
                                        Batal
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditSupplier;
