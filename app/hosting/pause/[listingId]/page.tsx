import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import PauseClient from "./PauseClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getPausedDates from "@/app/actions/getPausedDates";

interface IParams {
    listingId?: string;
}

const PausePage = async ({ params }: {params: IParams}) => {
    const currentUser = await getCurrentUser();
    const pausedDates = await getPausedDates(params);
    
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
            <PauseClient currentUser={currentUser} listing={listing} pausedDates={pausedDates}/>
        </ClientOnly>
    )
}

export default PausePage;