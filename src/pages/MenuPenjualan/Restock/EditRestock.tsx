import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
const EditRestock = () => {
    const [operasionalCost, setOperasionalCost] = useState('');
    const [cost, setCost] = useState('');

    const handleOperasioanalCostChange = (e: { target: { value: any } }) => {
        const inputValue = e.target.value;
        let formattedValue = '';

        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, '');

        // Format the number with 'Rp.' prefix
        if (numericValue !== '') {
            formattedValue = `Rp. ${parseInt(numericValue, 10).toLocaleString('id-ID')}`;
        }

        setOperasionalCost(formattedValue);
    };

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
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Menu Penjualan</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/menupenjualan/restock/restock" className="text-primary hover:underline">
                        Restock
                    </Link>
                </li>
            </ul>
            <div className="panel mt-6">
                <h1 className="text-xl font-bold mb-4">Edit Data</h1>
                <form className="space-y-5">
                    <div>
                        <label htmlFor="gridState">Supplier</label>
                        <select id="gridState" className="form-select text-white-dark">
                            <option>Trickster</option>
                            <option>Chose...</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Opcost">Operasional Cost</label>
                        <input id="Opcost" type="text" value={1028237} onChange={handleOperasioanalCostChange} placeholder="Rp." className="form-input" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="Produk">Produk</label>
                            <input id="Produk" type="Text" placeholder="Produk..." value="Baju" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Qty">Qty</label>
                            <input id="Qty" type="Text" placeholder="Qty..." value="224" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="Cost">Harga</label>
                            <input id="Cost" type="text" value={224456} onChange={handleCostChange} placeholder="Rp." className="form-input" />
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center mt-1 cursor-pointer">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="text-white-dark">Check me out</span>
                        </label>
                    </div>
                    <div className="flex">
                        <Link to="/menupenjualan/restock/listrestock">
                            <button type="submit" className="btn btn-outline-primary !mt-6" onClick={() => showAlert(20)}>
                                Update
                            </button>
                        </Link>
                        <Link to="/menupenjualan/restock/listrestock">
                            <button type="submit" className="btn btn-outline-danger !mt-6 ml-6">
                                Kembali
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditRestock;
