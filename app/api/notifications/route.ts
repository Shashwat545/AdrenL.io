import { NextResponse } from "next/server";
import prisma from  "@/app/libs/prismadb";

export async function POST (request: Request) {

    const body = await request.json();
    const { userId, message, redirectURL } = body;

    if(!userId || !message ) {
        return NextResponse.error();
    }
    
    const newNotification = await prisma.notification.create({
        data: {
            userId: userId,
            message: message,
            redirectURL: redirectURL
        }
    });

    return NextResponse.json("ok");
}
