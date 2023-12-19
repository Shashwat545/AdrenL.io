import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser";


export default async function getReview (listingId : string){
    try{
    const currentUser = await getCurrentUser();
        if(!currentUser) {
            return [];
        }

    const reviews = await prisma.review.findMany({
        where:{
            listingId: listingId
        },
        include:{
            user:true
        }
    })

    return reviews;
}catch(e){
    console.log(e);
    return [];
}
}