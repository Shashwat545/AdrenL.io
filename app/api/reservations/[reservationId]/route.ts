import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
};

export async function POST(request: Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if(!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID");
    }

    const data = await request.json();

    console.log(data);

    const updateUser = await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
            isConfirmed: data.status,
        },
      })

      console.log(updateUser);

    return NextResponse.json("ok");
}