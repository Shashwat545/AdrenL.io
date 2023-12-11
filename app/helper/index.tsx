"use client";
import { usePathname } from 'next/navigation';
import React from 'react';

interface LayoutHelperProps {
    children: React.ReactNode;
}

const LayoutHelper: React.FC<LayoutHelperProps> = ({ children }) => {
    const pathname = usePathname();
    const isInbox = pathname && pathname.includes('/inbox');

    return (
        <>
            {isInbox ? (
                <>{children}</>
            ) : (
                <div className="pb-20 pt-28">
                    {children}
                </div>
            )}
        </>
    );
}

export default LayoutHelper;