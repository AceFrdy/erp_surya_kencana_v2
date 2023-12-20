import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';

interface AkunDataProps {
    acc_type: string;
    acc_group_name: string;
    acc_info: string;
}

const typeAccount = ['Asset/Harta', 'Kewajiban/Hutang', 'Modal', 'Pendapatan', 'Biaya'];

const AddAkun = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [formData, setFormData] = useState<AkunDataProps>({
        acc_type: '',
        acc_group_name: '',
        acc_info: '',
    });

    // Handle Submit Form
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data = {
            acc_type: formData.acc_type,
            acc_group_name: formData.acc_group_name,
            acc_info: formData.acc_info,
        };
        console.log(data);

        await axios
            .post('https://erp.digitalindustryagency.com/api/accounts', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Akun Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate('/menukeuangan/akun/akun');
            })
            .catch((err: any) => {
                console.error('Error adding account:', err);
                const notification = {
                    type: 'error',
                    message: 'Akun Gagal Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    // Update the state for each input field
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(() => {
        const notificationMessage = localStorage.getItem('notification');
        if (notificationMessage) {
            const { type, message } = JSON.parse(notificationMessage);
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            }
        }
        return localStorage.removeItem('notification');
    }, []);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Akun</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Akun</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Add Akun</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="gridState">Jenis Akun</label>
                        <select
                            id="gridState"
                            className="form-select text-white-dark"
                            name="acc_type"
                            value={formData.acc_type}
                            onChange={handleInputChange} // Modified to use the general handler
                        >
                            <option>Choose...</option>
                            {typeAccount.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="actionGroup">Group</label>
                        <input
                            id="actionGroup"
                            type="text"
                            placeholder="Group..."
                            name="acc_group_name"
                            className="form-input"
                            value={formData.acc_group_name}
                            onChange={handleInputChange} // Modified to use the general handler
                        />
                    </div>
                    <div>
                        <label htmlFor="actionWeb">Keterangan</label>
                        <input
                            id="actionWeb"
                            type="text"
                            placeholder="Keterangan..."
                            className="form-input"
                            name="acc_info"
                            value={formData.acc_info}
                            onChange={handleInputChange} // Modified to use the general handler
                            minLength={5}
                        />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Tambah
                        </button>
                        <Link to="/menukeuangan/akun/akun">
                            <button className="btn btn-primary !mt-6">Kembali</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddAkun;
