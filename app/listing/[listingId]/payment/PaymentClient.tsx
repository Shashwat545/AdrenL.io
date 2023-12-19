'use client';

import { User, Listing, Reservation } from "@prisma/client";
import Container from "@/app/components/Container";
import PaymentConfirmation from "@/app/components/payment/PaymentConfirmation";

import axios from "axios";
import { toast } from "react-hot-toast";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

interface PaymentClientProps {
    currentUser: User | null;
    listing: Listing & {user: User};
    reservations?: Reservation[];
    data: any;
    payloadMain: string;
    checksum: string;
}

const ListingClient: React.FC<PaymentClientProps> = ({ currentUser, listing, reservations=[], data, payloadMain, checksum}) => {
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
    const [totalPeople, setTotalPeople] = useState(1);
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
            const options = {
                method: 'POST',
                url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum
                },
                data: {
                    request: payloadMain
                }
            };
        
            axios.request(options)
            .then((response) => {
                console.log(response.data);
                router.replace(response.data.data.instrumentResponse.redirectInfo.url);
            })
            .catch((error) => {
                toast.error("Something went wrong in processing the payment. Please try again.")
                console.error(error);
            });
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [totalPrice, dateValue, listing?.id, router, currentUser, loginModal, data, payloadMain, checksum]);

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

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <PaymentConfirmation />
            </div>
        </Container>
    );
}

export default ListingClient;