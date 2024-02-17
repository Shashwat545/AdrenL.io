import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { differenceInDays } from "date-fns";

interface IParams {
    reservationId: string;
};

export async function POST(request: Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;
    const body = await request.json();
    const { startDate } = body;

    const daysDifference: number = differenceInDays(new Date(startDate), new Date());

    if(daysDifference <= 0) {
        throw new Error("Booking already over");
    }

    if(!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID");
    }

    const updateReservation = await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
            cancelled: true,
        },
      })

    return NextResponse.json(updateReservation);
}