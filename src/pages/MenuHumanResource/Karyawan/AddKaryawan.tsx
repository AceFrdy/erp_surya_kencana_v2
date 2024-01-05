import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useModal } from '../../../hooks/use-modal';
import IconSearch from '../../../components/Icon/IconSearch';

import 'react-toastify/dist/ReactToastify.css';

interface BranchProps {
    id: number;
    branch_name: string;
}
interface PrevilagesProps {
    id: number;
    privilage_name: string;
}

interface DataProps {
    privilage_id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    contact: number;
    address: string;
    confirmPassword: string;
}

const AddKaryawan = () => {
    const { onOpen } = useModal();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [branches, setBranches] = useState<BranchProps[]>([]);
    const [cabang, setCabang] = useState<string>('Pilih cabang...');
    const [previlages, setPrevilages] = useState<PrevilagesProps[]>([]);

    const [formData, setFormData] = useState<DataProps>({
        privilage_id: 0,
        name: '',
        username: '',
        email: '',
        password: '',
        contact: 0,
        address: '',
        confirmPassword: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();

        const { name, value, type } = e.target;
        if (type === 'number') {
            setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCancel = () => {
        navigate('/menuhumanresource/karyawan');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (formData.confirmPassword !== formData.password) {
            console.log('gagal');
            const notification = {
                type: 'error',
                message: 'Confirm password salah.',
            };
            localStorage.setItem('notification', JSON.stringify(notification));
            const oldValueBefore = {
                privilage_id: formData.privilage_id ?? '',
                name: formData.name ?? '',
                username: formData.username ?? '',
                email: formData.email ?? '',
                password: formData.password ?? '',
                contact: formData.contact ?? '',
                address: formData.address ?? '',
                branch_id: cabang ?? '',
            };
            sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));
            navigate(0);
        } else {
            const data = {
                privilage_id: formData.privilage_id,
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                contact: formData.contact,
                address: formData.address,
                branch_id: branches.find((item) => item.branch_name === cabang)?.id,
                password_confirmation: formData.confirmPassword,
            };

            axios
                .post('https://erp.digitalindustryagency.com/api/users', data, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const notification = {
                        type: 'success',
                        message: 'Karyawan berhasil ditambahkan.',
                    };
                    localStorage.setItem('notification', JSON.stringify(notification));
                    navigate('/menuhumanresource/karyawan');
                })
                .catch((err: any) => {
                    const notification = {
                        type: 'error',
                        message: 'Uang Keluar Gagal Ditambahkan',
                        log: err.message,
                        title: 'ERROR_ADDING_UANG_KELUAR',
                    };
                    localStorage.setItem('notification', JSON.stringify(notification));
                    navigate(0);
                });
        }
    };

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/dropDownAddKaryawan', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPrevilages(response.data.data.resource);
            })
            .catch((err: any) => {
                console.log('ERROR_GETTING_DROPDOWN', err.message);
            });
        axios
            .get('https://erp.digitalindustryagency.com/api/branches', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setBranches(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('ERROR_GETTING_BRANCHES', err.message);
            });
    }, []);

    useEffect(() => {
        const isOldValue = sessionStorage.getItem('old_value');
        if (isOldValue) {
            const oldValue = JSON.parse(isOldValue);
            setFormData(oldValue);
        }
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { title, log, type, message } = JSON.parse(notificationMessage);
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
                console.log(title, log);
            }
        }
        return () => {
            localStorage.removeItem('notification');
            sessionStorage.removeItem('old_value');
        };
    }, []);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/menuhumanresoure/karyawan" className="text-primary hover:underline">
                        Karyawan
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Karyawan</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between text-lg font-semibold mb-5">Tambah Karyawan</div>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" name="name" type="text" placeholder="Enter Name *" className="form-input" onChange={handleChange} value={formData.name} />
                                </div>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input id="username" name="username" type="text" placeholder="Enter Username *" className="form-input" onChange={handleChange} value={formData.username} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="privilage_id">Jabatan</label>
                                    <select id="privilage_id" name="privilage_id" className="form-select mr-2" onChange={handleChange} value={formData.privilage_id}>
                                        <option>Choose...</option>
                                        {previlages.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.privilage_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="cabang">Cabang</label>
                                    <button
                                        id="cabang"
                                        className="h-10 border rounded-md w-full justify-between px-4 flex items-center"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onOpen('search-cabang', undefined, [], undefined, [], branches, [], setCabang);
                                        }}
                                    >
                                        <span>{cabang}</span>
                                        <IconSearch />
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-full space-x-5">
                                <div className="w-full">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" name="email" type="email" placeholder="Enter Email Address *" className="form-input" onChange={handleChange} value={formData.email} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="contact">Contact</label>
                                    <input id="contact" name="contact" type="number" placeholder="Enter Contact Number *" className="form-input" onChange={handleChange} value={formData.contact} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <input id="address" name="address" type="text" placeholder="Enter Address" className="form-input" onChange={handleChange} value={formData.address} />
                            </div>
                            <div className=" grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input id="password" name="password" type="password" placeholder="Enter Password *" className="form-input" onChange={handleChange} value={formData.password} />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Enter Confirm Password *"
                                        className="form-input"
                                        onChange={handleChange}
                                        value={formData.confirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="btn btn-primary !mt-6">
                                    Submit
                                </button>
                                <button className="btn btn-primary !mt-6" onClick={handleCancel}>
                                    Kembali
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddKaryawan;
