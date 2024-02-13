import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PaymentClient from "./PaymentClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getFuturePricings from "@/app/actions/getFuturePricings";
import getAllDiscountCoupons from "@/app/actions/getAllDiscountCoupons";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: {params: IParams}) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const futurePrices = await getFuturePricings(params);
    const allDiscountCoupons = await getAllDiscountCoupons();

    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PaymentClient currentUser={currentUser} listing={listing} futurePrices={futurePrices}
            allDiscountCoupons={allDiscountCoupons}/>
        </ClientOnly>
    );
}

export default ListingPage;