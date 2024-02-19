import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    intensity?: string;
    guestCount?: number,
    startDate?: string,
    endDate?: string,
    locationValue?: string,
    stateValue?: string,
    cityValue?: string,
    category?: string
}

export default async function getListings(params: IListingsParams) {
    try {
        const { userId, intensity, guestCount, startDate, endDate, locationValue, stateValue, cityValue, category } = params;
        let query:any = {};
        
        if(userId) {
            query.userId = userId;
        }
        if(intensity) {
            if(intensity == "Extreme") {
                query.thrillIntensity = "Extreme Intensity";
            } else if(intensity == "Moderate") {
                query.thrillIntensity = "Moderate Intensity";
            } else if(intensity == "Low") {
                query.thrillIntensity = "Low Intensity";
            }
        }
        if(category) {
            query.category = category;
        }
        if(guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        if(locationValue) {
            query.locationValue = locationValue;
        }
        if(stateValue) {
            query.stateValue = stateValue;
        }
        if(cityValue) {
            query.cityValue = cityValue;
        }
        if(startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            include : {
                user: {
                    include: {
                        host: true
                    }
                },
                reviews: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}