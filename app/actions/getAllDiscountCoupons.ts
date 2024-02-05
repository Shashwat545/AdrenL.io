import prisma from "@/app/libs/prismadb";

export default async function getAllDiscountCoupons() {
    try {

        const coupons = await prisma.discountCoupons.findMany({
        });

        return coupons;
    } catch (error: any) {
        throw new Error(error);
    }
}