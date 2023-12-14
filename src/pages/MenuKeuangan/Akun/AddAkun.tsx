import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'; 


const AddAkun = () => {
    const navigate = useNavigate(); // hook untuk navigasi
    const [accType, setAccType] = useState('');
    const [accGroupName, setAccGroupName] = useState('');
    const [accInfo, setAccInfo] = useState('');
    const token = localStorage.getItem('accessToken') || '';


        // Handle Submit Form
        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                await axios.post(
                    'https://erp.digitalindustryagency.com/api/accounts',
                    {
                        acc_type: accType,
                        acc_group_name: accGroupName,
                        acc_info: accInfo,
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
                navigate('/menukeuangan/akun/akun');
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
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'gridState':
                setAccType(value);
                break;
            case 'actionWeb':
                setAccInfo(value);
                break;
            case 'actionGroup':
                setAccGroupName(value);
                break;
            default:
                break;
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
                            value={accType}
                            onChange={handleInputChange} // Modified to use the general handler
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
                        <label htmlFor="actionGroup">Group:</label>
                        <input
                            id="actionGroup"
                            type="text"
                            placeholder="Group..."
                            className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                            value={accGroupName}
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
                            value={accInfo}
                            onChange={handleInputChange} // Modified to use the general handler
                        />
                    </div>
                    <div className="flex">
                    <button type="submit" className="btn btn-primary !mt-6 mr-8">
                        Tambah
                    </button>
                        <Link to="/menukeuangan/akun/akun">
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
export default AddAkun;
