import prisma from "@/app/libs/prismadb";

export default async function getListingsByHostId(params: any) {
  try {
    console.log(params);
    const listings = await prisma.listing.findMany({
      where: {
        userId: params,
      },
    });
    return listings;
  } catch (error) {
    throw error;
  }
}
