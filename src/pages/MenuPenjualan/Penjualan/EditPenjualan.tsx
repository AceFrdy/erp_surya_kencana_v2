import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setPageTitle } from '../../../store/themeConfigSlice';

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
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

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
                });
            })
            .catch((error) => {
                console.error('Error fetching penjualan data:', error);
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
                console.log('Sale data successfully updated:', response.data);
                navigate('/menupenjualan/penjualan/penjualan');
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
                console.error('Error updating Sale data:', error);
                toast.error('Error updating data');
            });
    };

    const handleCancel = () => {
        navigate('/menupenjualan/penjualan/penjualan');
    };

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or any other UI element.
    }

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
                        <form className="space-y-5">
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
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            <div className="flex">
                                <Link to="/menupenjualan/penjualan/penjualan">
                                    <button type="submit" className="btn btn-primary !mt-6" onClick={handleEditSale}>
                                        Simpan
                                    </button>
                                </Link>
                                <Link to="/menupenjualan/penjualan/penjualan">
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
export default EditPenjualan;
