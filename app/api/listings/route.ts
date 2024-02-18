import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST (request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    console.log(body);
    const { title, description, imageSrc, category, thrillIntensity, address, amenities, guestCount, location, stateValue, cityValue, price } = body;
    const trueAmenities = Object.keys(amenities).filter(key => amenities[key]);

    const listing = await prisma.listing.create({
        data: {
            title, 
            description, 
            imageSrc, 
            category, 
            guestCount, 
            locationValue: location.value, 
            stateValue: stateValue.value, 
            cityValue:cityValue.label, 
            coordinates:cityValue.latlng ,
            price: parseInt(price, 10), 
            userId: currentUser.id,
            thrillIntensity,
            address,
            amenities: trueAmenities
        }
    });

    return NextResponse.json(listing);
}