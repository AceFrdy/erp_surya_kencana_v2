import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import IconMail from '../../components/Icon/IconMail';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconLockDots from '../../components/Icon/IconLockDots';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        setCredentials({
            ...credentials,
            [field]: e.target.value,
        });

        setErrorMessages({
            ...errorMessages,
            [field]: '',
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            if (!credentials.email && !credentials.password) {
                setErrorMessages({
                    ...errorMessages,
                    email: 'Email is required.',
                    password: 'Password is required.',
                });
            } else if (!credentials.email) {
                setErrorMessages({
                    ...errorMessages,
                    email: 'Email is required.',
                });
            } else if (!credentials.password) {
                setErrorMessages({
                    ...errorMessages,
                    password: 'Password is required.',
                });
            }
            return;
        }

        axios
            .post('https://erp.digitalindustryagency.com/api/login', credentials)
            .then((response) => {
                if (response.data.data.status) {
                    localStorage.setItem('accessToken', response.data.data.resource.token);
                    localStorage.setItem('id', response.data.data.resource.id);
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    toast.error('Email or Password invalid, Please try again');
                } else {
                    toast.error('Something went wrong');
                }
            });
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="absolute top-6 end-6">
                            <div className="dropdown"></div>
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="email"
                                            placeholder="Enter Email"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={credentials.email}
                                            onChange={(e) => handleChange(e, 'email')}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                    {errorMessages.email && <p className="text-sm text-red-500 mt-2">* {errorMessages.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={credentials.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                    {errorMessages.password && <p className="text-sm text-red-500 mt-2">* {errorMessages.password}</p>}
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
