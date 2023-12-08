import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Unit Berhasil Ditambah',
        padding: '10px 20px',
    });
};

const submitForm4 = Yup.object().shape({
    namaUnit: Yup.string().required('Nama Tidak Boleh Kosong'),
    kapasitasUnit: Yup.string().required('Kapasitas Tidak Boleh Kosong'),
});
const AddUnit = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/menupenjualan/product/unit" className="text-primary hover:underline">
                        Unit
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Unit</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                {/* Single File */}
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel">
                        <h1 className="text-lg font-bold mb-12">Tambah Unit</h1>
                        <div className="flex items-center justify-between mb-2"></div>
                        <Formik
                            initialValues={{
                                namaUnit: '',
                                kapasitasUnit: '',
                            }}
                            validationSchema={submitForm4}
                            onSubmit={() => {}}
                        >
                            {({ errors, submitCount, touched }) => (
                                <Form className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className={submitCount ? (errors.namaUnit ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="namaUnit">Nama Unit </label>
                                            <Field name="namaUnit" type="text" id="firstname" placeholder="Nama Unit..." className="form-input" />
                                            {submitCount ? errors.namaUnit ? <div className="text-danger mt-1">{errors.namaUnit}</div> : <div className="text-success mt-1">Looks Good!</div> : ''}
                                        </div>
                                        <div className={submitCount ? (errors.kapasitasUnit ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="kapasitasUnit">Kapasitas Unit </label>
                                            <Field name="kapasitasUnit" type="text" id="kapasitasUnit" placeholder="Kapasitas Unit..." className="form-input" />
                                            {submitCount ? (
                                                errors.kapasitasUnit ? (
                                                    <div className="text-danger mt-1">{errors.kapasitasUnit}</div>
                                                ) : (
                                                    <div className="text-success mt-1">Looks Good!</div>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6 mr-6"
                                            onClick={() => {
                                                if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                                                    submitForm();
                                                }
                                            }}
                                        >
                                            Simpan
                                        </button>
                                        <Link to="/menupenjualan/product/unit">
                                        <button type="submit" className="btn btn-primary !mt-6">
                                            Batal
                                        </button>
                                        </Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddUnit;
