import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
// import IconPencil from '../../../../components/Icon/IconPencil';
import { Link } from 'react-router-dom';
import { IRootState } from '../../../store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const DetailLaporan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail Laporan'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Menu Keuangan</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Detail Laporan </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                {/* <h1 className="text-lg font-bold">Detail Piutang</h1> */}
                <div className="flex mb-4 justify-end">
                    <Link to="/menukeuangan/laporan/laporan">
                        <button type="button" className="btn btn-outline-primary">
                            <IconArrowBackward className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                            Kembali
                        </button>
                    </Link>
                </div>
                <div className="panel">
                    <h1 className="text-xl font-bold mb-6">Detail Data Laporan</h1>
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="Cost">Kode</label>
                            <input id="Cost" disabled type="text" defaultValue="Iya Cuy" placeholder="Keterangan..." className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Cost">Nama Akun</label>
                            <input id="Cost" disabled type="text" defaultValue="Ke Bank" placeholder="Keterangan..." className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Cost">Index</label>
                            <input id="Cost" disabled type="text" defaultValue="Iya Bang" placeholder="Keterangan..." className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Cost">Nominal</label>
                            <input id="Cost" disabled type="text" defaultValue={1203944} placeholder="Rp." className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Cost">keterangan</label>
                            <input id="Cost" disabled type="text" defaultValue="Trickster" placeholder="Keterangan..." className="form-input" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailLaporan;
