'use client';

import { Listing, User } from "@prisma/client";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { IoArrowForwardCircle } from "react-icons/io5";

import useCountries from "@/app/hooks/useCountries";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
    listing: Listing;
    user?: User;
    compareUserToHost: boolean;
    description: string;
    guestCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    locationValue: string;
    onSubmit: () => void;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ listing, user, compareUserToHost, description, guestCount, category, onSubmit }) => {
    const { getByValue } = useCountries();
    const coordinates = [parseFloat(listing.coordinates[0]), parseFloat(listing.coordinates[1])];

    const [isButtonClicked, setButtonClicked] = useState(false);

    const onSubmitButton = () => {
        if(compareUserToHost) {
            return toast.error("You're the host!")
        }
        onSubmit();
        setButtonClicked(true);
    };
    const router = useRouter();

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2 hover:cursor-pointer" onClick={()=>{
                    router.push(`/hosting/profile/${listing.userId}`)
                }}>
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} persons at max</div>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <div className="text-bold text-xl flex items-center">
                        <span className="mr-2">Send an enquiry</span> <IoArrowForwardCircle />
                    </div>
                    <a onClick={() => { if (!isButtonClicked) { onSubmitButton(); }}}
                    className={`relative inline-block text-lg group ${isButtonClicked ? 'disabled' : ''}`}
                    style={{ cursor: isButtonClicked ? 'not-allowed' : 'pointer' }} >
                        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                            <span className="relative">Contact host</span>
                        </span>
                        <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                    </a>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory icon={category.icon} label={category.label} description={category.description}/>
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates} zoom={8} scrollZoom />
        </div>
    );
};

export default ListingInfo;