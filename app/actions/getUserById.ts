import prisma from "@/app/libs/prismadb";

interface IParams {
    userId: string;
}

export default async function getUserById( params: IParams ) {
    try{
        const { userId } = params;

        if (!userId) {
            throw new Error("userId must be provided.");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user) {
            throw new Error(`User with id ${userId} not found.`);
        }
        
        return user;
    } catch(error: any) {
        throw new Error(error);
    }
};