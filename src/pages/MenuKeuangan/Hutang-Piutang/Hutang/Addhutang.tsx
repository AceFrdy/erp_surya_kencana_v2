import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
const AddHutang = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');
    const showAlert = async (type: number) => {
        if (type == 20) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Data Berhasil Ditambah',
                padding: '10px 20px',
            });
        }
    };
    const [cost, setCost] = useState('');

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
                <form className="space-y-5">
                    <div>
                        <label htmlFor="Cost">Akun Asal</label>
                        <input id="Cost" type="text" placeholder="Asal..." className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="Cost">Akun Tujuan</label>
                        <input id="Cost" type="text" placeholder="Tujuan..." className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="Cost">Total Nominal</label>
                        <input id="Cost" type="text" value={cost} onChange={handleCostChange} placeholder="Rp." className="form-input" />
                    </div>
                    <div>
                        <label htmlFor="Cost">Kreditur</label>
                        <input id="Cost" type="text" placeholder="Nama Kreditur..." className="form-input" />
                    </div>
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
                    <div className="flex">
                        <Link to="/menukeuangan/hutang-piutang/hutang">
                            <button type="submit" className="btn btn-primary !mt-6 mr-8" onClick={() => showAlert(20)}>
                                Tambah
                            </button>
                        </Link>
                        <Link to="/menukeuangan/hutang-piutang/hutang">
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
export default AddHutang;