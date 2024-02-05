import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST (request: Request) {
    try {
        const body = await request.json();
        const { id } = body;
        const host = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                host: {
                    create: {
                        
                    }
                }   
            }
        });
        return NextResponse.json("ok");
    } catch (error: any) {
        return NextResponse.error();
    }
};