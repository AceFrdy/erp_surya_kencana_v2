import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

const AddSupplier = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Supplier'));
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';

    const [formData, setFormData] = useState({
        suplier_name: '',
        suplier_address: '',
        suplier_contact: '',
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
            suplier_name: formData.suplier_name,
            suplier_address: formData.suplier_address,
            suplier_contact: formData.suplier_contact,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/supliers', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Suplier Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                handleCancel();
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    suplier_name: formData.suplier_name,
                    suplier_address: formData.suplier_address,
                    suplier_contact: formData.suplier_contact,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Suplier Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_ADDING_SUPLIER',
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
                    <Link to="/menupenjualan/supplier" className="text-primary hover:underline">
                        Supplier
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Supplier</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between mb-5"></div>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <h1 className="text-lg font-bold mb-12">Tambah Supplier</h1>
                            <div>
                                <input type="text" placeholder="Nama Supplier..." className="form-input" name="suplier_name" value={formData.suplier_name} onChange={handleChange} />
                            </div>
                            <div>
                                <input type="text" placeholder="Alamat Supplier..." className="form-input" name="suplier_address" value={formData.suplier_address} onChange={handleChange} />
                            </div>
                            <div>
                                <input type="text" placeholder="No Handphone..." className="form-input" name="suplier_contact" value={formData.suplier_contact} onChange={handleChange} />
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
export default AddSupplier;
