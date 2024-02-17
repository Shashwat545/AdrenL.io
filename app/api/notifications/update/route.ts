import { NextResponse } from "next/server";
import prisma from  "@/app/libs/prismadb";

export async function POST (request: Request) {

    const body = await request.json();
    const { id, readStatus } = body;

    if(!readStatus ) {
        return NextResponse.error();
    }
    
    const newNotification = await prisma.notification.update({
      where:{
        id: id
      },
      data:{
        readStatus: readStatus
      }
    });

    return NextResponse.json("ok");
}
