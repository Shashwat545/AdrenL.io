'use client';

import { Listing, User } from "@prisma/client";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

import useCountries from "@/app/hooks/useCountries";

const Map = dynamic(() => import("../Map"), {ssr: false});

interface ListingInfoProps {
    listing: Listing;
    user?: User;
    description: string;
    guestCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ listing, user, description, guestCount, category, locationValue }) => {
    const { getByValue } = useCountries();
    const coordinates = [parseFloat(listing.coordinates[0]), parseFloat(listing.coordinates[1])];

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image}/>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        {guestCount} persons at max
                    </div>
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
            <Map center={coordinates} zoom={8} scrollZoom/>
        </div>
    );
}

export default ListingInfo;