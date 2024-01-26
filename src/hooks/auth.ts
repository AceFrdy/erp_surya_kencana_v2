import axios from 'axios';
import { useEffect, useState } from 'react';

interface AuthProps {
    id: number;
}

export const useAuth = () => {
    const token = localStorage.getItem('accessToken') ?? '';
    const [authorize, setAuthorize] = useState<string>('isLoading' || 'isAuthorized' || 'isUnauthorized');
    useEffect(() => {
        setAuthorize('isLoading');
        axios
            .get('https://erp.digitalindustryagency.com/api/user-profile', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } })
            .then((response) => {
                setAuthorize('isAuthorized');
            })
            .catch((err) => {
                setAuthorize('isUnauthorized');
            });
    }, []);
    return authorize;
};
