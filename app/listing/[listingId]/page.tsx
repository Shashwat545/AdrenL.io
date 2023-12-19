import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReview from "@/app/actions/getReview";
import getPayload from "@/app/actions/payment/getPayload";
import getPausedDates from "@/app/actions/getPausedDates";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: {params: IParams}) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reviews = await getReview(listing?.id as string);
    
    const pausedDates = await getPausedDates(params);
    const { data, payloadMain, checksum } = getPayload({ currentUser });
        
    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient listing={listing} pausedDates={pausedDates} currentUser={currentUser} reviews={reviews} data={data} payloadMain={payloadMain} checksum={checksum}/>
        </ClientOnly>
    );
}

export default ListingPage;