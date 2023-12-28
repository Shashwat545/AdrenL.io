import prisma from "@/app/libs/prismadb";

interface IReviewParams {
    listingId: string;
}

export default async function getReview (params: IReviewParams){
    try {
        const { listingId } = params;
        const reviews = await prisma.review.findMany({
            where:{
                listingId: listingId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include:{
                user:true
            }
        });
        if(!reviews) {
            return [];
        } else {
            return reviews;
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};