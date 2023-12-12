'use client';

import { User, Listing, Reservation } from "@prisma/client";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";

import axios from "axios";
import { toast } from "react-hot-toast";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

interface ListingClientProps {
    currentUser: User | null;
    listing: Listing & {user: User};
    reservations?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({ currentUser, listing, reservations=[]}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    useEffect(() => {
        if(!listing.user?.isTakingReservation){
            toast.error("The adventure is currently not taking reservations!")
        }
    }, [])

   

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            dates = [...dates, reservation.startDate];
        });
        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateValue, setDateValue] = useState<Date>(new Date());

    const onCreateReservation = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateValue,
            endDate: dateValue,
            listingId: listing?.id
        })
        .then(()=>{
            return axios.post('/api/conversations',{userId:listing.userId})
        })
        .then(() => {
            toast.success("Adventure reserved!");
            setDateValue(new Date());
            router.push('/trips');
            router.refresh();
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [totalPrice, dateValue, listing?.id, router, currentUser, loginModal]);

    useEffect(() => {
        if(dateValue) {
            const dayCount = 1;
            if(dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateValue, listing.price]);

    const category = useMemo(() => {
        return categories.find( (item) => item.label === listing.category );
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead listing={listing} title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue}
                    id={listing.id} currentUser={currentUser}/>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo listing={listing} user={listing.user} category={category} description={listing.description} guestCount={listing.guestCount}
                        locationValue={listing.locationValue}/>
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation host={listing.user} user={currentUser} price={listing.price} totalPrice={totalPrice} onChangeDate={(value) => setDateValue(value)}
                            dateValue={dateValue} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates}/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;