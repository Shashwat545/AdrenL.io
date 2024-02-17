import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import AdventuresClient from "./AdventuresClient";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

const AdventuresPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }

    const listings = await getListings({ userId: currentUser.id });

    return (
        <EmptyState />
    )

    // if(listings.length === 0) {
    //     return (
    //         <ClientOnly>
    //             <EmptyState title="No listings found" subtitle="Looks like you have no adventures hosted with us."/>
    //         </ClientOnly>
    //     );
    // }

    // return (
    //     <ClientOnly>
    //         <AdventuresClient listings={listings} currentUser={currentUser}/>
    //     </ClientOnly>
    // );
};

export default AdventuresPage;