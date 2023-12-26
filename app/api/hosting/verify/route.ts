import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get("admin-auth");
    if (!cookie) {
      return NextResponse.json({ message: "Please login!" }, { status: 200 });
    }

    const secretOrPublicKey = process.env.JWT_ADMIN_SECRET;
    if (!secretOrPublicKey) {
      return NextResponse.json(
        { message: "Invalid secret key" },
        { status: 500 }
      );
    }

    try {
      const claims = jwt.verify(cookie.value, secretOrPublicKey);

      if (!claims) {
        return NextResponse.json(
          { message: "Unauthenticated" },
          { status: 401 }
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Invalid token" }, { status: 500 });
    }
    const data = await request.json();
    const host = await prisma.host.update({
      where: {
        id: data.hostId,
      },
      data: {
        isVerified: true,
      },
    });

    return NextResponse.json("Host Verified Successfully",{status:200});
  } catch (e) {
    console.log(e);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
