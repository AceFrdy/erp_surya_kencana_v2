import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditUnit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        unit_stock_name: '',
        number_of_units: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/unit-stock/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('API Response:', response.data);
                const unitData = response.data.data.resource;
                setFormData({
                    unit_stock_name: unitData.unit_stock_name,
                    number_of_units: unitData.number_of_units,
                });
            })
            .catch((error) => {
                console.error('Error fetching unit data:', error);
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

    const handleEditunit = () => {
        axios
            .put(`https://erp.digitalindustryagency.com/api/unit-stock/${id}`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('unit data successfully updated:', response.data);
                navigate('/menupenjualan/product/unit');
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
                console.error('Error updating unit data:', error);
                toast.error('Error updating data');
            });
    };

    const handleCancel = () => {
        navigate('/menupenjualan/product/unit');
    };

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or any other UI element.
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/menupenjualan/product/unit" className="text-primary hover:underline">
                        Unit
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit Unit</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between mb-5"></div>
                        <form className="space-y-5">
                            <h1 className="text-lg font-bold mb-12">Edit Unit</h1>
                            <div>
                                <label htmlFor="namaUnit">Nama Unit </label>
                                <input
                                    type="text"
                                    placeholder="Nama Cabang..."
                                    className="form-input"
                                    name="unit_stock_name"
                                    value={formData.unit_stock_name}
                                    onChange={(e) => handleInputChange('unit_stock_name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="namaUnit">Kapasitas Unit </label>
                                <input
                                    type="text"
                                    placeholder="Alamat Cabang..."
                                    className="form-input"
                                    name="number_of_units"
                                    value={formData.number_of_units}
                                    onChange={(e) => handleInputChange('number_of_units', e.target.value)}
                                />
                            </div>
                            <div className="flex">
                                <button type="button" className="btn btn-primary !mt-6" onClick={handleEditunit}>
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

export default EditUnit;
