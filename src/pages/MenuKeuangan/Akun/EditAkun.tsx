import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AkunDataProps {
 
    acc_type: string;
    acc_group_name: string;
    acc_info: string;
    // branch_address: string;
}

const EditAkun = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') || '';

    const [formData, setFormData] = useState<AkunDataProps>({
        acc_type: '',
        acc_group_name: '',
        acc_info: '',
    });

    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/accounts/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const accountData = response.data.data.resource;
                setFormData((prev) => ({
                    ...prev,
                    acc_type: accountData.acc_type,
                    acc_group_name: accountData.acc_group_name,
                    acc_info: accountData.acc_info,
                    // Set data lainnya sesuai dengan respons
                }));
                console.log('dataForm :', response.data.data.resource);
            })
            .catch((error) => {
                console.error('Error fetching account data:', error);
                toast.error('Error fetching data');
            });
    }, []);

  // Update the state for each input field
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target ;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

    const handleSubmit = async (event:FormEvent) => {
        event.preventDefault();
        console.log('Submitting the following data:', formData); // Log data yang akan dikirim
        const data = {
            acc_type: formData.acc_type,
            acc_group_name: formData.acc_group_name,
            acc_info: formData.acc_info
        };
        
        try {
            const response = await axios.put(`https://erp.digitalindustryagency.com/api/accounts/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('Response from server:', response.data); // Log response dari server
            toast.success('Data berhasil diubah');
            navigate('/menukeuangan/akun/akun');
        } catch (error:any) {
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
                    <span>Akun</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit Akun</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Edit Akun</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="gridState">Jenis Akun</label>
                        <select id="gridState" name="acc_type" value={formData.acc_type} onChange={handleInputChange} className="form-select text-white-dark">
                            <option>Modal</option>
                            <option>Choose...</option>
                            <option>Asset/Harta</option>
                            <option>Kewajiban/Hutang</option>
                            <option>Pendapatan</option>
                            <option>Biaya</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="actionWeb">Group:</label>
                        <div className="flex flex-1">
                            <input
                                id="actionWeb"
                                name="acc_group_name"
                                value={formData.acc_group_name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Group..."
                                className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="actionWeb">Keterangan</label>
                        <input id="actionWeb" name="acc_info" value={formData.acc_info} onChange={handleInputChange} type="text" placeholder="Keterangan..." className="form-input" />
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Update
                        </button>
                        <Link to="/menukeuangan/akun/akun">
                            <button type="button" className="btn btn-primary !mt-6">
                                Kembali
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditAkun;
