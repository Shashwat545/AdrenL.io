import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import CalendarClient from "./CalendarClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "../../actions/getListings";

const CalendarPage = async () => {
    const currentUser = await getCurrentUser();
    
    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }

    const listings = await getListings({ userId: currentUser.id });

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No listings found" subtitle="Looks like you have no adventures hosted with us."/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <CalendarClient currentUser={currentUser} listings={listings}/>
        </ClientOnly>
    )
}

export default CalendarPage;