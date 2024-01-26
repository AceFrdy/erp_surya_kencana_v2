import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken') ?? '';
    const storedId = localStorage.getItem('id');

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const handleFetch = () => {
        if (token && storedId) {
            axios
                .get(`https://erp.digitalindustryagency.com/api/users/${storedId}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const userData = response.data.data.resource;
                    setEmail(userData.email);
                    setUsername(userData.username);
                    setName(userData.name);
                    setContact(userData.contact);
                    setAddress(userData.address);
                })
                .catch((error) => {
                    console.error('Error fetching user data profil:', error);
                });
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-10">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8 ">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel " id="single_file">
                        <div className="flex items-center justify-between text-lg font-semibold mb-5">Profile</div>
                        <form className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" name="name" type="text" placeholder="Enter Name *" className="form-input" value={name} disabled />
                                </div>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input id="username" name="username" type="text" placeholder="Enter Username *" className="form-input" value={username} disabled />
                                </div>
                            </div>
                            <div className="flex w-full space-x-5">
                                <div className="w-full">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" name="email" type="email" placeholder="Enter Email Address *" className="form-input" value={email} disabled />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="contact">Contact</label>
                                    <input id="contact" name="contact" type="number" placeholder="Enter Contact Number *" className="form-input" value={contact} disabled />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <input id="address" name="address" type="text" placeholder="Enter Address" className="form-input" value={address} disabled />
                            </div>
                            <div className="flex gap-4">
                                {/* <button className="btn btn-primary !mt-6">Kembali</button> */}
                                <Link to="/" className="btn btn-primary !mt-6">
                                    Kembali
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
