import EmptyState from "../../components/EmptyState";
import ClientOnly from "../../components/ClientOnly";
import ReservationClient from "./ReservationClient";

import getCurrentUser from "../../actions/getCurrentUser";
import getReservationById from "../../actions/getReservationById";

interface IParams {
    reservationId: string;
}

const ReservationPage = async ({ params }: {params: IParams}) => {
    const reservation = await getReservationById(params);
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login"/>
            </ClientOnly>
        );
    }

    if(!reservation) {
        return (
            <ClientOnly>
                <EmptyState title="Reservation not found" subtitle="Looks like this reservation does not exist."/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationClient reservation={reservation} currentUser={currentUser}/>
        </ClientOnly>
    );
};

export default ReservationPage;