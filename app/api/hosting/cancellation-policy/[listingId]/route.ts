import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
    listingId?: string;
}

export async function POST (req: Request,{params}:{params:IParams}) {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await req.json();
    const {data} = body;

    const { listingId } = params;
    if(!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            cancellationPolicy:data
        }
    });

    return NextResponse.json("ok");
}
