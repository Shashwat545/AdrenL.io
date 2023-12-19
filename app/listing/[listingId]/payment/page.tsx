import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PaymentClient from "./PaymentClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import getPayload from "@/app/actions/payment/getPayload";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: {params: IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();
    const { data, payloadMain, checksum } = getPayload({ currentUser });

    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PaymentClient listing={listing} reservations={reservations} currentUser={currentUser} data={data} payloadMain={payloadMain} checksum={checksum}/>
        </ClientOnly>
    );
}

export default ListingPage;