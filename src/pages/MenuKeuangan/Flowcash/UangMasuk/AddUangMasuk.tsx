import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import axios from 'axios';

interface FormState {
    id: number;
    detail_acc_type: string;
    acc_type: string;
    acc_code: string;
}

interface DetailAccountList {
    id: number;
    detail_acc_code: string;
    detail_acc_type: string;
}

interface AccountList {
    id: number;
    acc_type: string;
    acc_code: string;
}

const AddUangMasuk = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    useEffect(() => {
        dispatch(setPageTitle('Tambah Uang Masuk'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');
    const [cost, setCost] = useState('');
    const [detailAccount, setDetailAccount] = useState<DetailAccountList[]>([]);
    const [account, setAccount] = useState<AccountList[]>([]);
    const [formData, setFormData] = useState<FormState>({
        id: 0,
        detail_acc_type: '',
        acc_type: '',
        acc_code: '',
    });

    const handleCostChange = (e: { target: { value: any } }) => {
        const inputValue = e.target.value;
        let formatValue = '';

        // Remove non-numeric characters
        const numValue = inputValue.replace(/\D/g, '');

        // Format the number with 'Rp.' prefix
        if (numValue !== '') {
            formatValue = `Rp. ${parseInt(numValue, 10).toLocaleString('id-ID')}`;
        }

        setCost(formatValue);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/detail-accounts', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDetailAccount(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('DETAIL ACCOUNT', err.message);
            });

        axios
            .get('https://erp.digitalindustryagency.com/api/accounts', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAccount(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('ACCOUNT', err.message);
            });
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
                    <span>Flow Cash</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Uang Masuk</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Add Uang Masuk</h1>
                <form className="space-y-5">
                    <div>
                        <label htmlFor="Tanggal">Tanggal</label>
                        <Flatpickr
                            id="Tanggal"
                            value={date1}
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                            className="form-input"
                            onChange={(date) => setDate1(date)}
                        />
                    </div>
                    <div>
                        <label htmlFor="gridState">Detail Akun</label>
                        <select id="gridState" className="form-select text-white-dark" name="id" value={formData.id}>
                            {detailAccount.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.detail_acc_type}
                                </option>
                            ))}
                            {/* <option>Choose...</option>
                            <option>Asset/Harta</option>
                            <option>Kewajiban/Hutang</option>
                            <option>Modal</option>
                            <option>Pendapatan</option>
                            <option>Biaya</option> */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gridState">Index</label>
                        <select id="gridState" className="form-select text-white-dark">
                            {account.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.acc_type}
                                </option>
                            ))}
                            {/* <option>Choose...</option>
                            <option>Asset/Harta</option>
                            <option>Kewajiban/Hutang</option>
                            <option>Modal</option>
                            <option>Pendapatan</option>
                            <option>Biaya</option> */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Cost">Cash</label>
                        <input id="Cost" type="text" value={cost} onChange={handleCostChange} placeholder="Rp." className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="Cost">Keterangan</label>
                        <input id="Cost" type="text" placeholder="Keterangan..." className="form-input" />
                    </div>
                    <div className="flex">
                        <Link to="/menukeuangan/flowcash/uangmasuk">
                            <button type="submit" className="btn btn-primary !mt-6 mr-8">
                                Tambah
                            </button>
                        </Link>
                        <Link to="/menukeuangan/flowcash/uangmasuk">
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
export default AddUangMasuk;
