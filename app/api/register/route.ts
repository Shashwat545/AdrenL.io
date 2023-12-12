import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import crypto from "crypto"
import { sendEmail } from "@/app/libs/email";

export async function POST (request: Request) {
    const body=await request.json();
    const { email, name, password } = body;
    const hashedPassword=await bcrypt.hash(password, 12);

    const checkUser = await prisma.user.findUnique({
        where: {email}
    });
    if(checkUser) {
        return NextResponse.json(
            { error : "Email is already registered"},
            { status : 409}
        );
    }

    const user=await prisma.user.create({
        data: { email, name, hashedPassword }
    });

    //Generate a new token for email verification below:
    const token = crypto.randomBytes(36).toString("hex");
    const hashedToken = await bcrypt.hash(token,12);

    const emailVerificationToken = await prisma.emailVerificationToken.create({
        data: {token: hashedToken, userId: user.id}
    });

    const verificationUrl = `http://localhost:3000/verify?token=${token}&userId=${user.id}`;

    const res = await sendEmail({
        profile: { name: user.name || '',email: user.email || ''},
        subject: "verification",
        linkUrl: verificationUrl,
    });

    return NextResponse.json(token);
}
