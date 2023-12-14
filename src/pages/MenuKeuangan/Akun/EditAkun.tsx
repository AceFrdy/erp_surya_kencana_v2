import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../../store/themeConfigSlice';
const EditAkun = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Edit Akun'));
    });
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
                title: 'Data Berhasil Diubah',
                padding: '10px 20px',
            });
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
                <form className="space-y-5">
                    <div>
                        <label htmlFor="gridState">Jenis Akun</label>
                        <select id="gridState" className="form-select text-white-dark">
                            <option>Modal</option>
                            <option>Choose...</option>
                            <option>Asset/Harta</option>
                            <option>Kewajiban/Hutang</option>
                            <option>Pendapatan</option>
                            <option>Biaya</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="actionEmail">Group:</label>
                        <div className="flex flex-1">
                            {/* <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                @
                            </div> */}
                            <input id="actionEmail" type="text" defaultValue="Bank BRI" placeholder="Group..." className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="actionWeb">Keterangan</label>
                        <input id="actionWeb" type="text" placeholder="Keterangan..." defaultValue="Akun Pribadi" className="form-input" />
                    </div>
                    <div className="flex">
                        <Link to="/menukeuangan/akun/akun">
                        <button type="submit" className="btn btn-primary !mt-6 mr-8" onClick={() => showAlert(20)}>
                            Update
                        </button>
                        </Link>
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
export default EditAkun;
