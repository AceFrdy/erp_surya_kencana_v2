import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

interface DetailAkunDataProps {

    detail_acc_type: string;
    detail_acc_name: string;
    detail_acc_info: string;
    account_id: string;
    // branch_address: string;
}
interface AccountType {
    acc_group_name: string;
    id: number;
    // Tambahkan properti lain jika ada
}


const EditDetailAkun = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') || '';
    const [accounts, setAccountTypes] = useState<AccountType[]>([]);

    const [formData, setFormData] = useState<DetailAkunDataProps>({
        detail_acc_type: '',
        detail_acc_name: '',
        detail_acc_info: '',
        account_id: ''
    });

    useEffect(() => {
        // Fetch account types from the API
        axios
            .get(`https://erp.digitalindustryagency.com/api/accounts/`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAccountTypes(response.data.data.resource.data);
            })
            .catch((error) => {
                console.error('Error fetching account types:', error);
            });
    }, [token]);

    useEffect(() => {
        if (id) {
            axios
                .get(`https://erp.digitalindustryagency.com/api/detail-accounts/${id}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const accountData = response.data.data.resource;
                    setFormData((prev) => ({
                        ...prev,
                        detail_acc_type: accountData.detail_acc_type,
                        detail_acc_name: accountData.detail_acc_name,
                        detail_acc_info: accountData.detail_acc_info,
                        account_id: accountData.account_id
                        // Set data lainnya sesuai dengan respons
                    }));
                    console.log('dataForm :', response);
                })
                .catch((error) => {
                    console.error('Error fetching account data:', error);
                    toast.error('Error fetching data');
                });
        }
    }, [id, token]); // Tambahkan `id` ke dependency array

    const showAlert = async (type: number) => {
        if (type == 20) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Data Berhasil Diubah',
                padding: '10px 20px',
            });
        }
    };
    // Update the state for each input field
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log('Submitting the following data:', formData); // Log data yang akan dikirim
        const data = {
            detail_acc_type: formData.detail_acc_type,
            detail_acc_name: formData.detail_acc_name,
            detail_acc_info: formData.detail_acc_info,
            account_id: formData.account_id,

        };
        try {
            const response = await axios.put(`https://erp.digitalindustryagency.com/api/detail-accounts/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('Response from server:', response.data); // Log response dari server
            toast.success('Data berhasil diubah');
            navigate('/menukeuangan/akun/detailakun');
        } catch (error: any) {
            console.error('Error updating account:', error); // Log error yang terjadi
            toast.error('Gagal mengubah data');
            if (error.response) {
                console.error('Error response data:', error.response.data); // Log error response dari server
            }
        }
    };


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Akun</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit Detail Akun</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Edit Detail Akun</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="gridState">Akun</label>
                        <select id="gridState"
                            className="form-select text-white-dark"
                            name='detail_acc_type'
                            value={formData.detail_acc_type}
                            onChange={handleInputChange}
                        >
                            <option>Choose...</option>
                            <option>Asset/Harta</option>
                            <option>Kewajiban/Hutang</option>
                            <option>Modal</option>
                            <option>Pendapatan</option>
                            <option>Biaya</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gridState">Group:</label>
                        <select
                            id="gridState"
                            name='account_id'
                            className="form-select text-white-dark"
                            value={formData.account_id}
                            onChange={handleInputChange}
                        >
                            {/* Render the options dynamically from the accounts state */}
                            {accounts.map((account) => (
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
                            name='detail_acc_name'
                            value={formData.detail_acc_name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="actionWeb">Keterangan</label>
                        <input
                            id="actionWeb"
                            type="text"
                            placeholder="Keterangan..."
                            className="form-input"
                            name='detail_acc_info'
                            value={formData.detail_acc_info}
                            onChange={handleInputChange} // Modified to use the general handler
                        />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Edit
                        </button>
                        <Link to="/menukeuangan/akun/detailakun">
                            <button type="submit" className="btn btn-primary !mt-6">
                                Kembali
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDetailAkun;
