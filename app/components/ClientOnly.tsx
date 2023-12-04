'use client';

import { usePathname } from 'next/navigation';
import {useState, useEffect} from 'react';

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
    const pathName = usePathname();

    const excludePath = ['/hosting','/chat'];

    if (excludePath.includes(pathName)) {
        return (
            <>
            </>
        );
    }

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

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