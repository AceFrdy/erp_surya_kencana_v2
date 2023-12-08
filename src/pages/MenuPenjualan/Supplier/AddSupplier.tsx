import { Link } from 'react-router-dom';

const AddSupplier = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/menupenjualan/supplier" className="text-primary hover:underline">
                        Supplier
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Supplier</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between mb-5"></div>
                        <form className="space-y-5">
                            <h1 className="text-lg font-bold mb-12">Tambah Supplier</h1>
                            <div>
                                <input type="text" placeholder="Nama Supplier..." className="form-input" />
                            </div>
                            <div>
                                <input type="text" placeholder="Alamat Supplier..." className="form-input" />
                            </div>
                            <div>
                                <input type="text" placeholder="No Handphone..." className="form-input" />
                            </div>
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            <div className="flex">
                                <Link to="/menupenjualan/supplier">
                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Simpan
                                    </button>
                                </Link>
                                <Link to="/menupenjualan/supplier">
                                    <button type="submit" className="btn btn-primary !mt-6 ml-6">
                                        Batal
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddSupplier;
