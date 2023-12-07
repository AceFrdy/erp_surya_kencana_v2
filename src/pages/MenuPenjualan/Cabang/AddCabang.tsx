import { Link } from 'react-router-dom';

const AddCabang = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/menupenjualan/cabang/listcabang" className="text-primary hover:underline">
                        Cabang
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Cabang</span>
                </li>
            </ul>
            <form className="space-y-5">
                <h1 className="text-lg font-bold mb-12">Tambah Cabang</h1>
                <div>
                    <input type="text" placeholder="Nama Cabang..." className="form-input" />
                </div>
                <div>
                    <input type="text" placeholder="Alamat Cabang..." className="form-input" />
                </div>
                <div>
                    <input type="text" placeholder="No Handphone..." className="form-input" />
                </div>
                <div className="!mt-2">
                    <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                </div>
                <div className="flex">
                    <Link to="/menupenjualan/cabang/listcabang">
                        <button type="submit" className="btn btn-primary !mt-6">
                            Submit
                        </button>
                    </Link>
                    <Link to="/menupenjualan/cabang/listcabang">
                        <button type="submit" className="btn btn-primary !mt-6 ml-6">
                            Cencel
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default AddCabang;
