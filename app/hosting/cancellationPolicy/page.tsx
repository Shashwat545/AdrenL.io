import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getListings from "@/app/actions/getListings";
import CancellationPolicyClient from "./cancellationPolicyClient";


const CancellationPolicyPage = async () => {
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
            <CancellationPolicyClient listings={listings} currentUser={currentUser}/>
        </ClientOnly>
    );
};

export default CancellationPolicyPage;