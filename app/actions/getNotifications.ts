import prisma from "@/app/libs/prismadb";

const getNotifications = async (
  userId: string
) => {
  try {
    const messages = await prisma.notification.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        timestamp: 'asc'
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getNotifications;
