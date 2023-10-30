import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

export async function POST (req: Request){
    const {address,currentUserId} = await req.json();
    const res = await prisma.user.update({
        where:{id:currentUserId},
        data:{address}
    })
    return NextResponse.json('ok')
}