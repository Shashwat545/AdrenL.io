'use client';

import { User, Listing, Reservation } from "@prisma/client";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

import { useMemo } from "react";

interface ListingClientProps {
    currentUser?: User | null;
    listing: Listing & {user: User};
    reservation?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser }) => {
    const category = useMemo(() => {
        return categories.find( (item) => item.label === listing.category );
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue}
                    id={listing.id} currentUser={currentUser}/>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo user={listing.user} category={category} description={listing.description} guestCount={listing.guestCount}
                        locationValue={listing.locationValue}/>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;