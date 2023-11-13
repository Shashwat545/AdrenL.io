import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    value: string;
}

export async function POST (request: Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.error();
    }

    const {value} = params;
    var booleanVal = false;
    booleanVal = value == "true";
   
    console.log(booleanVal)

    const user = await prisma.user.update({
        where:{
            id: currentUser.id
        },
        data: {
            isTakingReservation: booleanVal
        }
    })


    return NextResponse.json("ok");
}
