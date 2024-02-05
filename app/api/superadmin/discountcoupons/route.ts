import { NextResponse } from "next/server";

import prisma from  "@/app/libs/prismadb";

export async function POST (request: Request) {

    const body = await request.json();
    const { couponCode, percentageOff, trackingInfo, maxUsability} = body;

    if(!couponCode || !percentageOff || !trackingInfo || !maxUsability) {
        return NextResponse.error();
    }

    const discountCoupon = await prisma.discountCoupons.create({
        data: {coupon: couponCode, percentageOff: parseInt(percentageOff, 10), totalTimesUsed: 0, maxPerUser: parseInt(maxUsability, 10), trackingInfo: trackingInfo}
    });

    return NextResponse.json(discountCoupon);
}