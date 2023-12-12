'use client';

import { usePathname } from 'next/navigation';
import {useState, useEffect} from 'react';
import AuthContext from '@/app/providers/AuthProvider';

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
    const pathName = usePathname() || '';
    const excludePath = ['/inbox'];

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (excludePath.some(substring => pathName.includes(substring))) {
        return (
            <></>
        );
    }

    if(!hasMounted) {
        return null;
    }
    return (
        <>
            {children}
        </>
    );
}

export default ClientOnly;