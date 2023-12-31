'use client';

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { BsArrowUpRightCircleFill } from "react-icons/bs";

interface CardProps{
    heading : string,
    redirectUrl?: string,
    replaceUrl?: string,
    subtitle?: string
}

const HostingCard: React.FC<CardProps> = ({heading, redirectUrl, replaceUrl, subtitle}) => {
    const router = useRouter();
    const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
        if(replaceUrl) {
            router.replace(`/${replaceUrl}`);
        } else {
            router.push(`hosting/${redirectUrl}`);
        }
    }, [replaceUrl, redirectUrl]);

    return (
        <div className="cursor-pointer m-6 w-64 max-w-xl p-6 bg-white rounded-lg shadow hover:bg-gray-200" onClick={handleClick}>
            <BsArrowUpRightCircleFill className="text-2xl mb-4"/>
            <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900"> {heading} </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500">{subtitle || "Secondary Heading"}</p>
        </div>
    );
};

export const SuperAdminCard: React.FC<CardProps> = ({heading, redirectUrl, replaceUrl, subtitle}) => {
    const router = useRouter();
    const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
        if(replaceUrl) {
            router.replace(`/${replaceUrl}`);
        } else {
            router.push(`superadmin/${redirectUrl}`);
        }
    }, [replaceUrl, redirectUrl]);

    return (
        <div className="cursor-pointer m-6 w-64 max-w-xl p-6 bg-white rounded-lg shadow hover:bg-gray-200" onClick={handleClick}>
            <BsArrowUpRightCircleFill className="text-2xl mb-4"/>
            <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900"> {heading} </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500">{subtitle || "Secondary Heading"}</p>
        </div>
    );
};

export default HostingCard;