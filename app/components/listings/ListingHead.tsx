'use client';

import { User, Listing } from "@prisma/client";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Carousel from "../Carousel";

import useCountries from "@/app/hooks/useCountries";

interface ListingHeadProps {
    listing: Listing;
    title: string;
    locationValue: string;
    imageSrc: string[];
    id: string;
    currentUser: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ listing, title, locationValue, imageSrc, id, currentUser }) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <>
            <Heading title={title} subtitle={`${listing.cityValue}, ${location?.label}`}/>
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Carousel imageSrc={imageSrc}/>
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser}/>
                </div>
            </div>
        </>
    );
}

export default ListingHead;