import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request){
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser || !currentUser?.email){
            return new NextResponse("Unauthorized", {status:401})
        }

        const body = await request.json();
        const {listingId, rating, comment} = body;

        console.log(rating,comment);

        const newReview = await prisma.review.create({
            data:{
                rating: rating,
                comment: comment,
                user: {
                    connect: {id: currentUser.id}
                },
                listing: {
                    connect: {id: listingId}
                }
            }
        })

        return NextResponse.json({newReview});
         

    }catch(e){
        console.log("Error in review API: ",e);
        return new NextResponse("Error", {status:500})
    }
}