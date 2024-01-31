import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { setPageTitle } from '../../../store/themeConfigSlice';

import 'react-toastify/dist/ReactToastify.css';

const EditPenjualan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Penjualan'));
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('accessToken') ?? '';

    const [formData, setFormData] = useState({
        sale_order_qty: 0,
        sale_order_discount: 0,
        unit_stock_id: 0,
    });

    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/sale-orders/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('API Response:', response.data);
                const saleData = response.data.data.resource;
                setFormData({
                    sale_order_qty: saleData.sale_order_qty,
                    sale_order_discount: saleData.sale_order_discount,
                    unit_stock_id: saleData.unit_stock_id,
                });
            })
            .catch((error) => {
                console.error('Error fetching penjualan data:', error);
                toast.error('Error fetching data');
            });
    }, [id, token]);

    const handleInputChange = (label: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [label]: value,
        }));
    };

    const handleEditSale = () => {
        axios
            .put(`https://erp.digitalindustryagency.com/api/sale-orders/${id}`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Penjualan Berhasil Diperbarui',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                handleCancel();
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    sale_order_qty: formData.sale_order_qty,
                    sale_order_discount: formData.sale_order_discount,
                    unit_stock_id: formData.unit_stock_id,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Penjualan Gagal Diperbarui',
                    log: err.message,
                    title: 'ERROR_UPDATING_SALE',
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
                    <Link to="/menupenjualan/penjualan/penjualan" className="text-primary hover:underline">
                        Penjualan
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit Penjualan</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between mb-5"></div>
                        <form className="space-y-5" onSubmit={handleEditSale}>
                            <h1 className="text-lg font-bold mb-12">Edit Penjualan</h1>
                            <div>
                                <label htmlFor="qtyPenjualan"> Qty Penjualan </label>
                                <input
                                    type="text"
                                    placeholder="Qty Penjualan..."
                                    className="form-input"
                                    value={formData.sale_order_qty}
                                    onChange={(e) => handleInputChange('sale_order_qty', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="diskonPenjualan"> Diskon Penjualan </label>
                                <input
                                    type="text"
                                    placeholder="Diskon Penjualan..."
                                    className="form-input"
                                    value={formData.sale_order_discount}
                                    onChange={(e) => handleInputChange('sale_order_discount', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="diskonPenjualan"> Unit Stok </label>
                                <input
                                    type="text"
                                    placeholder="Unit stock..."
                                    className="form-input"
                                    value={formData.unit_stock_id}
                                    onChange={(e) => handleInputChange('unit_stock_id', e.target.value)}
                                />
                            </div>
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            <div className="flex">
                                <button type="submit" className="btn btn-primary !mt-6">
                                    Simpan
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
export default EditPenjualan;
