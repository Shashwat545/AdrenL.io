import { NextResponse } from "next/server";

import prisma from  "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST (request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { listingId, startDate, endDate, priceBox } = body;

    if(!listingId || !startDate || !endDate || !priceBox) {
        return NextResponse.error();
    }
    
    const listingAndFuturePricing = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            futurePricings: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    dynamicPrice: parseInt(priceBox, 10)
                }
            }
        }
    });

    return NextResponse.json(listingAndFuturePricing);
}