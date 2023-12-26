import prisma from "@/app/libs/prismadb";

export default async function getUserById(userId ) {
    try{
       const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    return user;
    } catch(error: any) {
        console.log(error)
        return null;
    }
}