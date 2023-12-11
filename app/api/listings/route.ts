import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST (request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { title, description, imageSrc, category, guestCount, location, stateValue, cityValue, price } = body;

    const listing = await prisma.listing.create({
        data: {title, description, imageSrc, category, guestCount, locationValue: location.value, stateValue: stateValue.value, cityValue:cityValue.label, coordinates:cityValue.latlng ,price: parseInt(price, 10), userId: currentUser.id, discountCoupons: []}
    });

    return NextResponse.json(listing);
}