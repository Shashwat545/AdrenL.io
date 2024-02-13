import { NextResponse } from "next/server";

import prisma from  "@/app/libs/prismadb";

export async function POST (request: Request) {

    const body = await request.json();
    const { coupon, userId } = body;

    if(!coupon || !userId) {
        return NextResponse.error();
    }

    const usageCount = await prisma.reservation.count({
        where: {
            userId,
            discountCouponName: coupon,
        },
    });

    const discountCoupon = await prisma.discountCoupons.findUnique({
        where: {
            coupon: coupon
        }
    });

    if (usageCount >= (discountCoupon?.maxPerUser || 10)) {
        return new Response(JSON.stringify({ message: 'Coupon usage limit exceeded for this user.' }), { status: 218, headers: { 'Content-Type': 'application/json' } });
    }

    return NextResponse.json(discountCoupon);
}