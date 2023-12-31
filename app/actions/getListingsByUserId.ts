import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

export default async function getListingsByUserId( params: IParams ) {
    try {
        const { userId } = params;
        const listings = await prisma.listing.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
};