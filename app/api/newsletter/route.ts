import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST (request: Request) {
    const body=await request.json();
    const { email } = body;

    if(email==="") {
        return NextResponse.json(
            { error: "No email entered"},
            { status: 408}
        );
    }

    const checkUser = await prisma.newsLetter.findUnique({
        where: {email}
    });

    if(checkUser) {
        return NextResponse.json(
            { error : "Email is already registered"},
            { status : 409}
        );
    }

    const user=await prisma.newsLetter.create({
        data: { email }
    });

    return NextResponse.json(user);
}