import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { endpoint } from '../../../../utils';

const DetailUangMasuk = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Detail Uang Masuk'));
    });
    const [cashInflowDate, setCashInflowDate] = useState<string>('');
    const [cashInflowAmount, setCashInflowAmount] = useState<number>(0);
    const [cashInflowInfo, setCashInflowInfo] = useState<string>('');
    const [cashInflowIndexInfo, setCashInflowIndexInfo] = useState<string>('');
    const [cashInflowDetailAccount, setCashInflowDetailAccount] = useState<string>('');

    useEffect(() => {
        axios
            .get(`${endpoint}/api/cash-inflows/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCashInflowDate(response.data.data.resource.cash_inflow_date);
                setCashInflowAmount(response.data.data.resource.cash_inflow_amount);
                setCashInflowInfo(response.data.data.resource.cash_inflow_info);
                setCashInflowIndexInfo(response.data.data.resource.index.index_info);
                setCashInflowDetailAccount(response.data.data.resource.detail_account.detail_acc_name);
            })
            .catch((err: any) => {
                console.log('GET SALE REPORT', err.message);
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
                    <span>Detail Uang Masuk</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-xl font-bold mb-6">Detail Uang Masuk</h1>
                <form className="space-y-5">
                    <div>
                        <label htmlFor="Tanggal">Tanggal</label>
                        <input className="form-input" value={cashInflowDate} disabled />
                    </div>
                    <div>
                        <label htmlFor="gridState">Detail Akun</label>
                        <input className="form-input" value={cashInflowDetailAccount} disabled />
                    </div>
                    <div>
                        <label htmlFor="gridState">Index</label>
                        <input className="form-input" value={cashInflowIndexInfo} disabled />
                    </div>
                    <div>
                        <label htmlFor="Cost">Cash</label>
                        <input className="form-input" value={cashInflowAmount} disabled />
                    </div>
                    <div>
                        <label htmlFor="gridState">Keterangan</label>
                        <input className="form-input" value={cashInflowInfo} disabled />
                    </div>
                    <div className="flex">
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-primary !mt-6">
                            Kembali
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default DetailUangMasuk;
