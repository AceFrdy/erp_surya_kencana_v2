import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { setPageTitle } from '../../../../store/themeConfigSlice';
// import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IRootState } from '../../../../store';
import Swal from 'sweetalert2';
import 'flatpickr/dist/flatpickr.css';
import Flatpickr from 'react-flatpickr';

const AddUangKeluar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tambah Uang Keluar'));
    });
    const navigate = useNavigate();

    const [dataFlow, setDataFlow] = useState({});

    const handleCancel = () => {
        // Instead of using a Link, directly use the navigate function
        navigate('/menupenjualan/product/produk');
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Uang Keluar</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel" id="single_file">
                        <h1 className="text-lg font-bold mb-12">Add Uang Keluar</h1>
                        <div className=" mb-5">
                            <form className="space-y-5">
                                <div>
                                    <div>
                                        <label htmlFor="gridState">Pilih Akun</label>
                                        <select id="gridState" className="form-select text-white-dark w-full mb-4">
                                            <option>Choose...</option>
                                            <option>Asset/Harta</option>
                                            <option>Kewajiban/Hutang</option>
                                            <option>Modal</option>
                                            <option>Pendapatan</option>
                                            <option>Biaya</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="Cost">Index</label>
                                        <input id="Cost" type="text" placeholder="Index..." className="form-input mb-4" />
                                    </div>
                                    <div>
                                        <label htmlFor="Cost">Cash</label>
                                        <input id="Cost" type="text" value={cost} onChange={handleCostChange} placeholder="Rp." className="form-input mb-4" />
                                    </div>
                                    <div>
                                        <label htmlFor="Cost">Keterangan</label>
                                        <input id="Cost" type="text" placeholder="Keterangan..." className="form-input mb-4" />
                                    </div>
                                    <label htmlFor="Tanggal">Tanggal</label>
                                    <Flatpickr
                                        id="Tanggal"
                                        value={date1}
                                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                        className="form-input mb-4"
                                        onChange={(date) => setDate1(date)}
                                    />
                                    <div>
                                        <label htmlFor="gridState">Index</label>
                                        <select id="gridState" className="form-select text-white-dark mb-4">
                                            <option>Choose...</option>
                                            <option>Asset/Harta</option>
                                            <option>Kewajiban/Hutang</option>
                                            <option>Modal</option>
                                            <option>Pendapatan</option>
                                            <option>Biaya</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="Cost">Keterangan</label>
                                        <input id="Cost" type="text" placeholder="Keterangan..." className="form-input" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="myFirstImage">
                                <div className="label-container">
                                    <label>Upload Foto </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setImages([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <label className="custom-file-container__custom-file"></label>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </button>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                                <div key={index} className="custom-file-container__image-preview relative">
                                                    <img src={image.dataURL} alt="img" className="m-auto" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                                {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" /> : ''}
                                <div className="flex">
                                    <Link to="/menukeuangan/flowcash/uangkeluar">
                                        <button type="submit" className="btn btn-primary !mt-6" onClick={() => showAlert(20)}>
                                            Submit
                                        </button>
                                    </Link>
                                    <Link to="/menukeuangan/flowcash/uangkeluar">
                                        <button type="submit" className="btn btn-primary !mt-6 ml-6" onClick={handleCancel}>
                                            Cancel
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

export default AddUangKeluar;
