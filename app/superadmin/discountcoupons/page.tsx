import ClientOnly from "@/app/components/ClientOnly";
import DiscountCouponsClient from "./DiscountCouponsClient";

import getAllDiscountCoupons from "@/app/actions/getAllDiscountCoupons";
import { redirect } from "next/navigation";
import isAdminAuthenticated from "@/app/actions/isAdminAuthenticated";

const CalendarPage = async () => {
    const isAdmin = await isAdminAuthenticated();
    if(!isAdmin){
        return redirect("/superadmin/login");
    }

    const allDiscountCoupons = await getAllDiscountCoupons();

    return (
        <ClientOnly>
            <DiscountCouponsClient allDiscountCoupons={allDiscountCoupons}/>
        </ClientOnly>
    );
};

export default CalendarPage;