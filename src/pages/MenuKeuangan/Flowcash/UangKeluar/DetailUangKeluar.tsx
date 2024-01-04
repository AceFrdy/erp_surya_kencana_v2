import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { formatPrice } from '../../../../utils';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconNoImage from '../../../../components/Icon/icon-no-image';

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

    // get_data
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
            })
            .catch((err: any) => {
                console.log('ERROR_GETTING_DETAIL:', err.message);
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
                            <div className="flex w-full sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5">
                                <div className="flex flex-col space-y-5 w-full">
                                    <div>
                                        <label htmlFor="cash_outflow_name">Nama</label>
                                        <input id="cash_outflow_name" name="cash_outflow_name" disabled type="text" placeholder="Nama..." className="form-input" value={data.cash_outflow_name} />
                                    </div>
                                    <div>
                                        <label htmlFor="detail_account">Pilih Akun</label>
                                        <input id="detail_account" name="detail_account" className="form-input" disabled type="text" value={data.detail_account.detail_acc_name} />
                                    </div>
                                    <div>
                                        <label htmlFor="cash_outflow_date">Tanggal</label>
                                        <input id="cash_outflow_date" name="cash_outflow_date" className="form-input" disabled type="date" value={data.cash_outflow_date} />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full space-y-5">
                                    <div className="relative">
                                        <label htmlFor="cash_outflow_total">Cash</label>
                                        <input
                                            id="cash_outflow_total"
                                            name="cash_outflow_total"
                                            disabled
                                            type="text"
                                            placeholder="Cash..."
                                            className="form-input"
                                            value={formatPrice(data.cash_outflow_total)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="index_info">Pilih Index</label>
                                        <input id="index_info" name="index_info" className="form-input" disabled type="text" value={data.index.index_info} />
                                    </div>
                                    <div>
                                        <label htmlFor="cash_outflow_info">Keterangan</label>
                                        <input id="cash_outflow_info" name="cash_outflow_info" disabled type="text" placeholder="Keterangan..." value={data.cash_outflow_info} className="form-input" />
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-8">
                                {data.photo_struk && (
                                    <div className="absolute sm:h-60 h-40 w-full sm:w-60 top-0 overflow-hidden rounded-md">
                                        <img className="object-cover bg-white" src={data.photo_struk} alt="" />
                                    </div>
                                )}
                                <div className="sm:h-60 h-40 w-full flex items-center bg-zinc-50 justify-center flex-col space-y-2 sm:w-60 top-0 overflow-hidden rounded-md">
                                    <IconNoImage className="sm:w-16 sm:h-16 w-10 h-10" />
                                    <p className="font-semibold sm:text-lg text-sm">Image not found.</p>
                                </div>
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
    );
};

export default DetailUangKeluar;
