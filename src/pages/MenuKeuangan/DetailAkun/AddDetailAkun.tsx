import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';;

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

// Gunakan tipe ini saat mendefinisikan state untuk accounts

const AddDetailAkun = () => {
    const navigate = useNavigate(); // hook untuk navigasi
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
            .get('https://erp.digitalindustryagency.com/api/accounts', {
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


    // Handle Submit Form
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await axios.post(
                'https://erp.digitalindustryagency.com/api/detail-accounts',
                {
                    detail_acc_type: formData.detail_acc_type,
                    detail_acc_name: formData.detail_acc_name,
                    detail_acc_info: formData.detail_acc_info,
                    account_id: formData.account_id,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Redirect dan menampilkan toast sukses
            toast.success('Data Berhasil Ditambah', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/menukeuangan/akun/detailakun');
        } catch (error) {
            console.error('Error adding account:', error);
            // Menampilkan toast error
            toast.error('Gagal Menambah Data', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
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
                            <option value="">Choose...</option>
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
                            Tambah
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

export default AddDetailAkun;
