import axios from 'axios';
import { useEffect, useState } from 'react';

interface AksesProps {
    has_access: boolean;
    menu_title: string;
}

const token = localStorage.getItem('accessToken') ?? '';

export const useAuth = () => {
    const [authorize, setAuthorize] = useState<string>('isLoading' || 'isAuthorized' || 'isUnauthorized');
    useEffect(() => {
        setAuthorize('isLoading');
        const token = localStorage.getItem('accessToken');
        if (token) {
            axios
                .get('https://erp.digitalindustryagency.com/api/user-profile', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setAuthorize('isAuthorized');
                })
                .catch((err) => {
                    setAuthorize('isUnauthorized');
                });
        } else {
            setAuthorize('isUnauthorized');
        }
    }, []);
    return authorize;
};

export const useAkses = ({ menu }: { menu: string }) => {
    const [akses, setAkses] = useState<string>('isLoading' || 'hasAkses' || 'notAkses');
    useEffect(() => {
        setAkses('isLoading');
        axios.get('https://erp.digitalindustryagency.com/api/user-profile', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } }).then((response) => {
            const data: AksesProps[] = response.data.data.resource[1];
            const isAkses = data.find((item) => item.menu_title.toLowerCase() === menu)?.has_access;

            setAkses(isAkses ? 'hasAkses' : 'notAkses');
        });
    }, []);
    return akses;
};
