import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getPausedDates(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;
        const query: any = {};

        if(listingId) {
            query.listingId = listingId;
        }
        if(userId) {
            query.userId = userId;
        }
        if(authorId) {
            query.listing = { userId: authorId };
        }

        const pausedDates = await prisma.pausedDates.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if (pausedDates && pausedDates.length > 0) {
            return pausedDates;
        } else {
            return [];
        }

    } catch (error: any) {
        throw new Error(error);
    }
    
}