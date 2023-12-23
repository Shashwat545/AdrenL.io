import { NextResponse } from "next/server";

import prisma from  "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getPausedDates from "@/app/actions/getPausedDates";
import { format, parseISO } from "date-fns";

interface DateAndPausedObject {
    id: string;
    date: Date;
    paused: boolean;
}

export async function POST (request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { listingId, startDate } = body;

    if(!listingId || !startDate ) {
        return NextResponse.error();
    }

    const pausedDates = await getPausedDates({listingId: listingId});
    const pausedFutureDates = () => {
        let datesAndPaused: DateAndPausedObject[] = [];
        pausedDates.forEach((pausedDate) => {
                datesAndPaused.push({
                    id: pausedDate.id,
                    date: pausedDate.startDate,
                    paused: pausedDate.paused
                });
        });
        return datesAndPaused;
    };

    const pausedDateObject = pausedFutureDates().find((item) => format(item.date, 'yyyy-MM-dd') === format(parseISO(startDate), 'yyyy-MM-dd'));
    const newValue = pausedDateObject ? !pausedDateObject.paused : true;
    
    let listingAndPausedDates;

    if(!pausedDateObject) {
        listingAndPausedDates = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                pausedDates: {
                    create: {
                        userId: currentUser.id,
                        startDate,
                        paused: newValue
                    }
                }
            }
        });
    } else {
        listingAndPausedDates = await prisma.pausedDates.update({
            where: {
                id: pausedDateObject.id
            },
            data: {
                paused: newValue
            }
        })
    }

    return NextResponse.json(listingAndPausedDates);
}