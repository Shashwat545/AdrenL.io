import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListing";

const FavoritesPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings."/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient listings={listings} currentUser={currentUser}/>
        </ClientOnly>
    );
}

export default FavoritesPage;