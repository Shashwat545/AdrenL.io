import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const host = await prisma.host.create({
      data: {
        userId: data.id,
      },
    });
    return NextResponse.json("ok");
  } catch (e) {
    return NextResponse.error(e);
  }
}
