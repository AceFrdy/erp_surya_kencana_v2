import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface DetailAkunDataProps {
    detail_acc_type: string;
    detail_acc_name: string;
    detail_acc_info: string;
    account_id: string;
}
interface AccountType {
    acc_group_name: string;
    id: number;
}

const typeAccount = ['Asset/Harta', 'Kewajiban/Hutang', 'Modal', 'Pendapatan', 'Biaya'];

// Gunakan tipe ini saat mendefinisikan state untuk accounts

const AddDetailAkun = () => {
    const navigate = useNavigate(); // hook untuk navigasi
    const token = localStorage.getItem('accessToken') ?? '';
    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
    const [akun, setAkun] = useState<string>('');

    const [formData, setFormData] = useState<DetailAkunDataProps>({
        detail_acc_type: '',
        detail_acc_name: '',
        detail_acc_info: '',
        account_id: '',
    });

    // get account type
    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/accounts?acc_type=${akun}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // setAccountTypes(response.data.data.resource.data);
                setAccountTypes(response.data.data.resource.data);
                console.log(response.data.data.resource);
            })
            .catch((error) => {
                console.error('Error fetching account types:', error);
            });
    }, [akun]);

    // Handle Submit Form
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            detail_acc_type: formData.detail_acc_type,
            detail_acc_name: formData.detail_acc_name,
            detail_acc_info: formData.detail_acc_info,
            account_id: formData.account_id,
        };
        console.log(data);

        axios
            .post('https://erp.digitalindustryagency.com/api/detail-accounts', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Detail Akun Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate('/menukeuangan/akun/detailakun');
            })
            .catch((err: any) => {
                console.error('ERROR ADD DETAIL ACCOUNT', err);
                const notification = {
                    type: 'error',
                    message: 'Detail Akun Gagal Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                // navigate(0);
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
                    <span>Add Detail Akun</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Add Detail Akun</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="gridState">Akun</label>
                        <select
                            id="gridState"
                            className="form-select text-white-dark"
                            name="detail_acc_type"
                            value={formData.detail_acc_type}
                            onChange={(e) => {
                                handleInputChange(e);
                                setAkun(e.target.value);
                            }}
                            required
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
                        <label htmlFor="gridState">Group:</label>
                        <select id="gridState" name="account_id" className="form-select text-white-dark" value={formData.account_id} onChange={handleInputChange} disabled={!akun} required>
                            <option value="">Choose...</option>
                            {accountTypes.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.acc_group_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="actionWeb">Nama Detail</label>
                        <input
                            id="actionWeb"
                            type="text"
                            placeholder="Nama Detail..."
                            className="form-input"
                            name="detail_acc_name"
                            value={formData.detail_acc_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="actionWeb">Keterangan</label>
                        <input
                            id="actionWeb"
                            type="text"
                            placeholder="Keterangan..."
                            className="form-input"
                            name="detail_acc_info"
                            value={formData.detail_acc_info}
                            onChange={handleInputChange} // Modified to use the general handler
                            minLength={5}
                        />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Tambah
                        </button>
                        <Link to="/menukeuangan/akun/detailakun">
                            <button className="btn btn-primary !mt-6">Kembali</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDetailAkun;
