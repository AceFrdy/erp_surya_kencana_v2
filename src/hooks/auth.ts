import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AksesProps {
    has_access: boolean;
    menu_title: string;
}
interface HasAksesProps {
    has_access: boolean;
}

export const useAuth = () => {
    const [authorize, setAuthorize] = useState<string>('isLoading' || 'isAuthorized' || 'isUnauthorized');
    const [akses, setAkses] = useState<boolean[]>([]);

    const token = localStorage.getItem('accessToken');
    const getData = async () => {
        try {
            const response = await axios.get('https://erp.digitalindustryagency.com/api/user-profile', { headers: { Accept: 'application/json', Authorization: `Bearer ${token}` } });
            setAuthorize('isAuthorized');
            const data: HasAksesProps[] = response.data.data.resource[1].menu_access;
            setAkses(data.map((item) => item.has_access));
        } catch (error: any) {
            console.clear();
            setAuthorize('isUnauthorized');
        }
    };
    useEffect(() => {
        setAuthorize('isLoading');
        if (token) {
            getData();
        } else {
            console.clear();
            setAuthorize('isUnauthorized');
        }
    }, [token]);
    return { authorize, akses };
};
