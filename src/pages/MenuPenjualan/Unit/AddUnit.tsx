import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Unit Berhasil Ditambah',
        padding: '10px 20px',
    });
};

const submitForm4 = Yup.object().shape({
    namaUnit: Yup.string().required('Nama Tidak Boleh Kosong'),
    kapasitasUnit: Yup.string().required('Kapasitas Tidak Boleh Kosong'),
});

const AddUnit = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState({
        unit_stock_name: '',
        number_of_units: '',
        errors: {},
    });

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
            .post('https://erp.digitalindustryagency.com/api/supliers', data, {
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
                console.error('Error adding supplier data:', error);
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
                    <div className="panel">
                        <h1 className="text-lg font-bold mb-12">Tambah Unit</h1>
                        <div className="flex items-center justify-between mb-2"></div>
                        <Formik
                            initialValues={{
                                namaUnit: '',
                                kapasitasUnit: '',
                            }}
                            validationSchema={submitForm4}
                            onSubmit={() => {}}
                        >
                            {({ errors, submitCount, touched }) => (
                                <Form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className={submitCount ? (errors.namaUnit ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="namaUnit">Nama Unit </label>
                                            <Field
                                                name="namaUnit"
                                                type="text"
                                                id="firstname"
                                                placeholder="Nama Unit..."
                                                className="form-input"
                                                value={formData.unit_stock_name}
                                                onChange={handleChange}
                                            />
                                            {submitCount ? errors.namaUnit ? <div className="text-danger mt-1">{errors.namaUnit}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>
                                        <div className={submitCount ? (errors.kapasitasUnit ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="kapasitasUnit">Kapasitas Unit </label>
                                            <Field
                                                name="kapasitasUnit"
                                                type="text"
                                                id="kapasitasUnit"
                                                placeholder="Kapasitas Unit..."
                                                className="form-input"
                                                value={formData.number_of_units}
                                                onChange={handleChange}
                                            />
                                            {submitCount ? (
                                                errors.kapasitasUnit ? (
                                                    <div className="text-danger mt-1">{errors.kapasitasUnit}</div>
                                                ) : (
                                                    <div className="text-success mt-1">Looks Good!</div>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6 mr-6"
                                            onClick={() => {
                                                if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                                                    submitForm();
                                                }
                                            }}
                                        >
                                            Simpan
                                        </button>
                                        <Link to="/menupenjualan/product/unit">
                                            <button type="submit" className="btn btn-primary !mt-6">
                                                Batal
                                            </button>
                                        </Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddUnit;
