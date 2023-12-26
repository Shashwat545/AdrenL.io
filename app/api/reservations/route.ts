import { NextResponse } from "next/server";

import prisma from  "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST (request: Request) {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice, totalPeople, cancellationPolicy } = body;

    if(!listingId || !startDate || !endDate || !totalPrice || !cancellationPolicy) {
        return NextResponse.error();
    }
    
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                    numberOfPeople: totalPeople,
                    cancellationPolicy
                }
            }
        }
    });

    const newReservation = await prisma.reservation.findMany({
        where: {
            listingId: listingId,
            userId: currentUser.id,
            startDate: startDate,
            endDate: endDate
        }
    });

    return NextResponse.json(newReservation[newReservation.length-1]);
}