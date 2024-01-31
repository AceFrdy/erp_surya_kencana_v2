import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

const DetailCustomerOnline = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const { id } = useParams();
    useEffect(() => {
        dispatch(setPageTitle('Detail Customer Online'));
    });
    const [name, setName] = useState<string>('');
    const [contact, setContact] = useState<number>(0);
    const [address, setAddress] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://erp.digitalindustryagency.com/api/users/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setName(response.data.data.resource.name);
                setContact(response.data.data.resource.contact);
                setAddress(response.data.data.resource.address);
            })
            .catch((err: any) => {
                console.log('GET SALE REPORT', err.message);
            });
    }, []);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-4">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Customer Online</span>
                </li>
            </ul>
            <div className="panel " id="single_file">
                <form className="space-y-5">
                    <h1 className="text-lg font-bold mb-12">Detail Customer</h1>
                    <div>
                        <label htmlFor="gridState">Nama</label>
                        <input className="form-input" value={name} disabled />
                    </div>
                    <div>
                        <label htmlFor="gridState">Contact</label>
                        <input className="form-input" value={contact} disabled />
                    </div>
                    <div>
                        <label htmlFor="gridState">Address</label>
                        <input className="form-input" value={address} disabled />
                    </div>
                </form>
                <button className="btn btn-primary mt-8" type="button" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default DetailCustomerOnline;
