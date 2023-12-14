import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
// const submitForm = () => {
//     const toast = Swal.mixin({
//         toast: true,
//         position: 'top',
//         showConfirmButton: false,
//         timer: 3000,
//     });
//     toast.fire({
//         icon: 'success',
//         title: 'Unit Berhasil Ditambah',
//         padding: '10px 20px',
//     });
// };

// const submitForm4 = Yup.object().shape({
//     namaUnit: Yup.string().required('Nama Tidak Boleh Kosong'),
//     kapasitasUnit: Yup.string().required('Kapasitas Tidak Boleh Kosong'),
// });

const AddUnit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Unit'));
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        unit_stock_name: '',
        number_of_units: '',
        errors: {},
    });
    console.log('FORM DATA', formData.unit_stock_name);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            unit_stock_name: formData.unit_stock_name,
            number_of_units: formData.number_of_units,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/unit-stock', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Data Unit berhasil ditambahkan:', response.data);
                navigate('/menupenjualan/product/unit');
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
                console.error('Error adding product data:', error);
                toast.error('Error adding data');
            });
    };

    const handleCancel = () => {
        // Instead of using a Link, directly use the navigate function
        navigate('/menupenjualan/product/unit');
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/menupenjualan/product/unit" className="text-primary hover:underline">
                        Unit
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Unit</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between mb-5"></div>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <h1 className="text-lg font-bold mb-12">Tambah Unit</h1>
                            <div>
                                <label htmlFor="unit_stock_name">Nama Unit </label>
                                <input type="text" placeholder="Nama Unit" className="form-input" name="unit_stock_name" value={formData.unit_stock_name} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="unit_stock_name">Kapasitas Unit </label>
                                <input type="text" placeholder="Kapasitas Unit" className="form-input" name="number_of_units" value={formData.number_of_units} onChange={handleChange} />
                            </div>
                            <div className="flex">
                                <button type="submit" className="btn btn-primary !mt-6">
                                    Simpan
                                </button>
                                <button type="submit" className="btn btn-primary !mt-6 ml-6" onClick={handleCancel}>
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
export default AddUnit;
