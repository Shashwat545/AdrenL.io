import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReview from "@/app/actions/getReview";
import getPausedDates from "@/app/actions/getPausedDates";
import getFuturePricings from "@/app/actions/getFuturePricings";

interface IParams {
    listingId: string;
}

const ListingPage = async ({ params }: {params: IParams}) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reviews = await getReview(params);
    const pausedDates = await getPausedDates(params);
    const futurePrices = await getFuturePricings(params);
        
    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient listing={listing} pausedDates={pausedDates} currentUser={currentUser} reviews={reviews} futurePrices={futurePrices}/>
        </ClientOnly>
    );
}

export default ListingPage;