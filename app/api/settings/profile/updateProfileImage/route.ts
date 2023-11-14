import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

export async function POST (req: Request){
    const {image, currentUserId} = await req.json();
    const res = await prisma.user.update({
        where:{id:currentUserId},
        data:{image}
    })
    return NextResponse.json('ok')
}