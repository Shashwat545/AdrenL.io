import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import CalendarClient from "././CalendarClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getFuturePricings from "@/app/actions/getFuturePricings";

interface IParams {
    listingId?: string;
}

const CalendarPage = async ({ params }: {params: IParams}) => {
    const currentUser = await getCurrentUser();
    const futurePrices = await getFuturePricings(params);
    
    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }

    const listing = await getListingById(params);

    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <CalendarClient currentUser={currentUser} listing={listing} futurePrices={futurePrices}/>
        </ClientOnly>
    )
}

export default CalendarPage;