import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import ListingSelectorClient from "./ListingSelectorClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "../../actions/getListings";

const ListingSelectorPage = async () => {
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
            <ListingSelectorClient currentUser={currentUser} listings={listings}/>
        </ClientOnly>
    )
}

export default ListingSelectorPage;