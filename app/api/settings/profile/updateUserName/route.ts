import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

export async function POST (req: Request){
    const {name,currentUserId} = await req.json();
    const res = await prisma.user.update({
        where:{id:currentUserId},
        data:{name}
    })
    console.log(res);
    return NextResponse.json('ok')
}