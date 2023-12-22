import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { setPageTitle } from '../../../store/themeConfigSlice';

interface ProductListProps {
    id: number;
    product_barcode: string;
    product_name: string;
}

interface FormDataProps {
    product_name: string;
    distribution_qty: number;
    product_price: number;
}

const EditRestock = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Restock'));
    });
    const [formData, setFormData] = useState<FormDataProps>({
        product_name: '',
        distribution_qty: 0,
        product_price: 0,
    });
    const { id } = useParams();
    const token = localStorage.getItem('accessToken') ?? '';
    const navigate = useNavigate();

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            product_name: formData.product_name,
            distribution_qty: formData.distribution_qty,
            product_price: formData.product_price,
        };

        axios
            .put(`https://erp.digitalindustryagency.com/api/distribution-restok/${id}`, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const notification = {
                    type: 'success',
                    message: 'Detail Restock Berhasil Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate('/menupenjualan/restock/restock');
            })
            .catch((err: any) => {
                const notification = {
                    type: 'error',
                    message: 'Detail Restock Gagal Ditambahkan',
                };
                localStorage.setItem('notification', JSON.stringify(notification));
                navigate(0);
            });
    };

    // get data by id
    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/distribution-restok/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setFormData(response.data.data.resource);
                handleProductClick(response.data.data.resource.product_name);
            })
            .catch((err: any) => {
                console.log('data show error', err.message);
            });
    }, []);

    const [productList, setProductList] = useState<ProductListProps[]>([]);
    const [filteredProduct, setFilteredProduct] = useState<ProductListProps[]>(productList);
    const [showProduct, setShowProduct] = useState<boolean>(false);
    const ProductRef = useRef<HTMLInputElement>(null);

    const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = productList.filter((item) => item.product_name.toLowerCase().includes(inputValue));
        setFilteredProduct(filtered);
        setShowProduct(true);
    };

    const handleProductClick = (option: string) => {
        setShowProduct(false);
        if (ProductRef.current) {
            ProductRef.current.value = option;
        }
    };

    // get product
    useEffect(() => {
        axios
            .get('https://erp.digitalindustryagency.com/api/products', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setProductList(response.data.data.resource.data);
            })
            .catch((err: any) => {
                console.log('DISTRIBUTION', err.message);
            });
    }, []);

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
                <h1 className="text-xl font-bold mb-8">Edit Data</h1>
                <form className="space-y-5" onSubmit={handleUpdate}>
                    <div className="relative">
                        <label htmlFor="nama">Nama Produk</label>
                        <input id="nama" ref={ProductRef} type="text" className="form-input" placeholder="Nama Produk" onChange={handleProductChange} autoComplete="off" />
                        {showProduct && (
                            <div className="w-full flex absolute top-[70px] p-1 bg-white z-20 border border-zinc-100 rounded-md">
                                <div className="h-40 overflow-y-scroll w-full">
                                    <div className="h-auto flex flex-col w-full pb-[120px]">
                                        {filteredProduct.map((item) => (
                                            <button
                                                className="h-10 w-full hover:bg-green-100 text-start flex px-5 items-center rounded-md"
                                                key={item.id}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleProductClick(item.product_name);
                                                    setFormData((prev) => ({ ...prev, product_name: item.product_name }));
                                                }}
                                            >
                                                {item.product_name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-x-8 w-full">
                        <div className="w-full">
                            <label htmlFor="distribution_qty">Qty</label>
                            <input
                                id="distribution_qty"
                                type="number"
                                placeholder=""
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault();
                                    setFormData((prev) => ({ ...prev, distribution_qty: parseFloat(e.target.value) }));
                                }}
                                value={formData.distribution_qty}
                                className="form-input"
                            />
                        </div>
                        <div className="relative w-full">
                            <label htmlFor="product_price">Harga</label>
                            <input
                                id="product_price"
                                type="number"
                                value={formData.product_price}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault();
                                    setFormData((prev) => ({ ...prev, product_price: parseFloat(e.target.value) }));
                                }}
                                placeholder="Harga"
                                className="form-input pl-10"
                            />
                            <p className="absolute top-9 left-3">Rp.</p>
                        </div>
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-outline-primary !mt-6">
                            Update
                        </button>
                        <Link to="/menupenjualan/restock/restock">
                            <button type="button" className="btn btn-outline-danger !mt-6 ml-6">
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
