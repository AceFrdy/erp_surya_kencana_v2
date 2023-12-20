import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface DetailAkunDataProps {
    detail_acc_type: string;
    detail_acc_name: string;
    detail_acc_info: string;
    account_id: number;
}

interface AccountTypeProps {
    acc_group_name: string;
    id: number;
}

const typeAccount = ['Asset/Harta', 'Kewajiban/Hutang', 'Modal', 'Pendapatan', 'Biaya'];

const EditDetailAkun = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const [akun, setAkun] = useState<string>('');

    const [accountTypes, setAccountTypes] = useState<AccountTypeProps[]>([]);

    const [formData, setFormData] = useState<DetailAkunDataProps>({
        detail_acc_type: '',
        detail_acc_name: '',
        detail_acc_info: '',
        account_id: 0,
    });

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

    useEffect(() => {
        // Fetch account details from the API
        axios
            .get(`https://erp.digitalindustryagency.com/api/detail-accounts/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // Assuming response.data is the object with the details
                const details = response.data.data.resource;
                setFormData(details);
            })

            .catch((error) => {
                console.error('Error fetching account details:', error);
            });
    }, [id, token]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // Konversi `account_id` ke tipe data number
        const data = {
            detail_acc_type: formData.detail_acc_type,
            detail_acc_name: formData.detail_acc_name,
            detail_acc_info: formData.detail_acc_info,
            account_id: formData.account_id, // Convert to number if necessary
        };

        try {
            // Sebelum melakukan PUT request di handleSubmit:
            console.log('Data yang akan dikirim:', data);
            const response = await axios.put(`https://erp.digitalindustryagency.com/api/detail-accounts/${id}`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            toast.success('Data Berhasil Diedit');
            navigate('/menukeuangan/akun/detailakun');
        } catch (error: any) {
            console.error('Error updating account:', error);
            toast.error('Gagal Mengedit Data');
            // Tampilkan pesan error dari response jika ada
            if (error.response && error.response.data) {
                const errors = error.response.data.errors;
                for (const key in errors) {
                    errors[key].forEach((message: any) => {
                        toast.error(message);
                    });
                }
            }
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
                <h1 className="text-xl font-bold mb-6">Edit Detail Akun</h1>
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
                        <select id="gridState" name="account_id" className="form-select text-white-dark" value={formData.account_id} onChange={handleInputChange}>
                            <option value=""> silahkan pilih</option>
                            {accountTypes.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.acc_group_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="actionWeb">Nama Detail</label>
                        <input id="actionWeb" type="text" placeholder="Nama Detail..." className="form-input" name="detail_acc_name" value={formData.detail_acc_name} onChange={handleInputChange} />
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
                        />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Edit
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

export default EditDetailAkun;
