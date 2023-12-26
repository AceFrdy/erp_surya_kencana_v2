import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { setPageTitle } from '../../../../store/themeConfigSlice';

interface DataProps {
    id: number;
    detail_account: {
        detail_acc_name: string;
    };
    index: {
        index_info: string;
    };
    cash_outflow_total: number;
    cash_outflow_info: string;
    cash_outflow_date: string;
    photo_struk: string;
    cash_outflow_name: string;
}

const DetailUangKeluar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Uang Keluar'));
    });
    const token = localStorage.getItem('accessToken') ?? '';
    const { id } = useParams();
    const [data, setData] = useState<DataProps>({
        id: 0,
        detail_account: {
            detail_acc_name: '',
        },
        index: {
            index_info: '',
        },
        cash_outflow_total: 0,
        cash_outflow_info: '',
        cash_outflow_date: '',
        photo_struk: '',
        cash_outflow_name: '',
    });

    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/cash-outflows/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data.data.resource);
                console.log(response.data.data.resource);
            });
    }, []);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Uang Keluar</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel" id="single_file">
                        <h1 className="text-lg font-bold mb-12">Detail Uang Keluar</h1>
                        <div className=" mb-5">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="gridState">Name</label>
                                    <input id="gridState" type="text" value={data.cash_outflow_name} disabled placeholder="Index..." className="form-input mb-4" />
                                </div>
                                <div>
                                    <label htmlFor="gridState">Akun</label>
                                    <input id="Cost" type="text" value={data.detail_account.detail_acc_name} disabled placeholder="Index..." className="form-input mb-4" />
                                </div>
                                <div>
                                    <label htmlFor="Cost">Index</label>
                                    <input id="Cost" type="text" value={data.index.index_info} disabled placeholder="Index..." className="form-input mb-4" />
                                </div>
                                <div>
                                    <label htmlFor="Cost">Cash</label>
                                    <input id="Cost" type="text" value={data.cash_outflow_total} disabled placeholder="Rp." className="form-input mb-4" />
                                </div>
                                <div>
                                    <label htmlFor="Cost">Keterangan</label>
                                    <input id="Cost" type="text" value={data.cash_outflow_info} disabled placeholder="Keterangan..." className="form-input mb-4" />
                                </div>
                                <div>
                                    <label htmlFor="tanggal">Tanggal</label>
                                    <input id="tanggal" type="text" value={data.cash_outflow_date} disabled placeholder="Keterangan..." className="form-input mb-4" />
                                </div>
                                <div className="relative">
                                    <img src={data.photo_struk} alt="" />
                                </div>
                                <div className="flex">
                                    <Link to="/menukeuangan/flowcash/uangkeluar">
                                        <button type="button" className="btn btn-primary !mt-6">
                                            Kembali
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailUangKeluar;
