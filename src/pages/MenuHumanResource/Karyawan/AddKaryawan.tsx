import { Link } from 'react-router-dom';

const AddKaryawan = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/menuhumanresoure/karyawan" className="text-primary hover:underline">
                        Karyawan
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Karyawan</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between text-lg font-semibold mb-5">Tambah Karyawan</div>
                        <form className="space-y-5">
                            <div className="flex grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridName">Name</label>
                                    <input id="gridName" type="text" placeholder="Enter Name *" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridUsername">Username</label>
                                    <input id="gridUsername" type="text" placeholder="Enter Username *" className="form-input" />
                                </div>
                            </div>
                            <div className="flex grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridJabatan">Jabatan</label>
                                    <select id="gridJabatan" className="form-select text-white-dark mr-2">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="gridJabatan">Jabatan</label>
                                    <select id="gridJabatan" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="gridEmail">Email</label>
                                <input id="gridEmail" type="email" placeholder="Enter Email Address *" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridContact">Contact</label>
                                <input id="gridContact" type="text" placeholder="Enter Contact Number *" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridAddress">Address</label>
                                <input id="gridAddress" type="text" placeholder="Enter Address" defaultValue="1234 Main St" className="form-input" />
                            </div>
                            <div className="flex grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gridPassword">Password</label>
                                    <input id="gridPassword" type="password" placeholder="Enter Password *" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridConfirmPassword">Confirm Password</label>
                                    <input id="girdConformPassword" type="password" placeholder="Enter Confirm Password *" className="form-input" />
                                </div>
                            </div>
                            <div className="!mt-2">
                                <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
                            </div>
                            {/* <div>
                                <label className="inline-flex cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                </label>
                            </div> */}
                            <div className='flex gap-4'>
                                <Link to="/menuhumanresource/karyawan">
                                    <button type="submit" className="btn btn-primary !mt-6">
                                        Submit
                                    </button>
                                </Link>
                                <Link to="/menuhumanresource/karyawan">
                                    <button className="btn btn-primary !mt-6">Kembali</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddKaryawan;
