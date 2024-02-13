import prisma from "@/app/libs/prismadb";

interface IReviewParams {
  hostId: string;
}

export default async function getHostReviews(params: IReviewParams) {
  try {
    const { hostId } = params;
    const reviews = await prisma.review.findMany({
      where: {
        listing: {
          userId: hostId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
    if (!reviews) {
      return [];
    } else {
      return reviews;
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}
