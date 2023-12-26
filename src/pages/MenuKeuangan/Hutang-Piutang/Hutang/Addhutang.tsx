import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

interface FormState {
    // id: number;
    location_acc: number;
    direction_acc: number;
    debt_date: string;
    debt_balance: number;
    creditur_name: string;
}

interface DataDetailAccLocationProps {
    id: number;
    detail_acc_code: string;
    detail_acc_name: string;
}

interface DataDetailAcc {
    id: number;
    detail_acc_code: string;
    detail_acc_name: string;
}

const AddHutang = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Hutang'));
    });
    const [detailAccLocation, setDetailAccLocation] = useState<DataDetailAccLocationProps[]>([]);
    const [detailAcc, setDetailAcc] = useState<DataDetailAcc[]>([]);
    const [formData, setFormData] = useState<FormState>({
        // id: 0,
        debt_balance: 0,
        location_acc: 0,
        direction_acc: 0,
        debt_date: '',
        creditur_name: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checkboxValue = (e.target as HTMLInputElement).checked ? 'yes' : '';
            setFormData((prevData) => ({
                ...prevData,
                [name]: checkboxValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/debt-dropdown', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDetailAccLocation(response.data.data.resource.dataDetailAccLocation);
                setDetailAcc(response.data.data.resource.dataDetailAcc);
            })
            .catch((err: any) => {
                console.log('DETAIL ACCOUNT', err.message);
            });
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            location_acc: formData.location_acc,
            direction_acc: formData.direction_acc,
            debt_date: formData.debt_date,
            debt_balance: formData.debt_balance,
            creditur_name: formData.creditur_name,
        };

        axios
            .post('https://erp.digitalindustryagency.com/api/debts', data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Data Hutang berhasil ditambahkan:', response.data);
                navigate('/menukeuangan/hutang-piutang/hutang');
                toast.success('Data berhasil ditambahkan', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const apiErrors = error.response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        errors: apiErrors,
                    }));
                }
                console.error('Error adding debt data:', error);
                console.log(formData);
                toast.error('Error adding data');
            });
    };

    const handleCancel = () => {
        navigate('/menukeuangan/hutang-piutang/hutang');
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
                    <span>Hutang - Piutang</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Hutang</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Add Hutang</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label>Akun Asal</label>
                        <select className="form-select text-white-dark" name="location_acc" value={formData.location_acc} onChange={handleChange}>
                            <option value="">Choose...</option>
                            {detailAccLocation.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.detail_acc_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Akun Tujuan</label>
                        <select className="form-select text-white-dark" name="direction_acc" value={formData.direction_acc} onChange={handleChange}>
                            <option value="">Choose...</option>
                            {detailAcc.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.detail_acc_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Total Nominal</label>
                        <input type="text" placeholder="Rp." className="form-input" name="debt_balance" value={formData.debt_balance} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Kreditur</label>
                        <input type="text" placeholder="Nama Kreditur..." className="form-input" name="creditur_name" value={formData.creditur_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Tanggal</label>
                        <input type="date" placeholder="Tanggal..." className="form-input" name="debt_date" value={formData.debt_date} onChange={handleChange} />
                        {/* <Flatpickr
                            id="Tanggal"
                            value={date1}
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                            className="form-input"
                            onChange={(date) => setDate1(date)}
                        /> */}
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8">
                            Tambah
                        </button>
                        <button type="button" className="btn btn-primary !mt-6" onClick={handleCancel}>
                            Kembali
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddHutang;
