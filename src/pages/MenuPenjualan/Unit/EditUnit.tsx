import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { setPageTitle } from '../../../store/themeConfigSlice';

const EditUnit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Unit'));
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        unit_stock_name: '',
        number_of_units: '',
    });

    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/unit-stock/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const unitData = response.data.data.resource;
                setFormData(unitData);
            })
            .catch((error) => {
                console.error('Error fetching unit data:', error);
                toast.error('Error fetching data');
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
                const notification = {
                    type: 'success',
                    message: 'Unit Berhasil Diperbarui',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                handleCancel();
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    unit_stock_name: formData.unit_stock_name,
                    number_of_units: formData.number_of_units,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Unit Gagal Diperbarui',
                    log: err.message,
                    title: 'ERROR_UPDATING_UNIT',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    const handleCancel = () => {
        // Instead of using a Link, directly use the navigate function
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
