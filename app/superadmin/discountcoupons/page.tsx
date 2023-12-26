import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import DiscountCouponsClient from "./DiscountCouponsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllDiscountCoupons from "@/app/actions/getAllDiscountCoupons";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import isAdminAuthenticated from "@/app/actions/isAdminAuthenticated";


const CalendarPage = async () => {
    const isAdmin = await isAdminAuthenticated();
    if(!isAdmin){
        return redirect("/superadmin/login");
    }
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