import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import DiscountCouponsClient from "./DiscountCouponsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllDiscountCoupons from "@/app/actions/getAllDiscountCoupons";

const CalendarPage = async () => {
    const currentUser = await getCurrentUser();
    const allDiscountCoupons = await getAllDiscountCoupons();
    
    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <DiscountCouponsClient currentUser={currentUser} allDiscountCoupons={allDiscountCoupons}/>
        </ClientOnly>
    )
}

export default CalendarPage;