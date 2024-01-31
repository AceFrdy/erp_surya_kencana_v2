import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

import { setPageTitle } from '../../../store/themeConfigSlice';

import 'react-toastify/dist/ReactToastify.css';

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
    const dispatch = useDispatch();
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
                setAccountTypes(response.data.data.resource.data);
            })
            .catch((error) => {
                console.error('ERROR_GETTING_ACCOUNT_TYPE:', error);
            });
    }, [akun]);

    // get_data
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
                setAkun(details.detail_acc_type);
            })

            .catch((error) => {
                console.error('Error fetching account details:', error);
            });
    }, [id]);

    // handle_submit
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const data = {
            detail_acc_type: formData.detail_acc_type,
            detail_acc_name: formData.detail_acc_name,
            detail_acc_info: formData.detail_acc_info,
            account_id: formData.account_id,
        };

        axios
            .put(`https://erp.digitalindustryagency.com/api/detail-accounts/${id}`, data, {
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
                navigate(-1);
            })
            .catch((err: any) => {
                // set_old_value
                const oldValueBefore = {
                    detail_acc_type: formData.detail_acc_type,
                    detail_acc_name: formData.detail_acc_name,
                    detail_acc_info: formData.detail_acc_info,
                    account_id: formData.account_id,
                };
                sessionStorage.setItem('old_value', JSON.stringify(oldValueBefore));

                // set_notif
                const notification = {
                    type: 'error',
                    message: 'Detail Akun Gagal Ditambahkan',
                    log: err.message,
                    title: 'ERROR_EDITING_DETAIL_ACCOUNT',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    // handle_change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // handle_title
    useEffect(() => {
        dispatch(setPageTitle('Tambah Detail Akun'));
    }, []);

    // get_notif
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
                            className="form-select"
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
                        <select id="gridState" name="account_id" className="form-select" value={formData.account_id} disabled={!akun} required onChange={handleInputChange}>
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
                        <button onClick={() => navigate(-1)} type="button" className="btn btn-primary !mt-6">
                            Kembali
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDetailAkun;
