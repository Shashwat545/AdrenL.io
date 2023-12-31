import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST (request: Request) {
    try {
        const body = await request.json();
        const currentDate = new Date();
        const updatedData = {...body, verificationDate: currentDate};
        delete updatedData.id;
        const host = await prisma.host.update({
            where: {
                userId: body.id
            },
            data: updatedData
        });
        return NextResponse.json("ok");
    } catch (error) {
        console.log(error, "ERROR_MESSAGES");
        return new NextResponse("Error", { status: 500 });
    }
}