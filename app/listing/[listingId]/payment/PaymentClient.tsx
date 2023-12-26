'use client';

import { User, Listing, FuturePricing } from "@prisma/client";
import Container from "@/app/components/Container";
import PaymentConfirmation from "@/app/components/payment/PaymentConfirmation";

import axios from "axios";
import { toast } from "react-hot-toast";
import { eachDayOfInterval, format } from "date-fns";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

interface PaymentClientProps {
    currentUser: User | null;
    listing: Listing & {user: User};
    futurePrices: FuturePricing[];
}

interface DateAndPriceObject {
    date: Date;
    price: number;
}

const PaymentClient: React.FC<PaymentClientProps> = ({ currentUser, listing, futurePrices}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const params = useSearchParams();

    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');

    const dynamicPrices = useMemo(() => {
        let datesAndPrices: DateAndPriceObject[] = [];
        futurePrices.forEach((futurePrice) => {
            const range = eachDayOfInterval({
                start: new Date(futurePrice.startDate),
                end: new Date(futurePrice.endDate)
            });
            range.forEach((date) => {
                datesAndPrices.push({
                    date: date,
                    price: futurePrice.dynamicPrice
                });
            });
        });
        return datesAndPrices;
    }, [futurePrices]);
    const futurePriceObject = dynamicPrices.find((item) => format(item.date, 'yyyy-MM-dd') === format(new Date(startDate ?? ''), 'yyyy-MM-dd'));
    const price = (futurePriceObject ? futurePriceObject.price : listing.price);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(price);
    const [totalPeople, setTotalPeople] = useState(1);

    const onCreateReservation = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post(`/api/reservations`, {
            listingId: listing.id,
            startDate: new Date(startDate ?? ''),
            endDate: new Date(endDate ?? ''),
            totalPrice: totalPrice,
            totalPeople: totalPeople,
            cancellationPolicy: listing.cancellationPolicy,
        })
        .then((responseReservation) => {
            axios.post('/api/payment', {
                reservationId: responseReservation.data.id,
                priceTotal: totalPrice,
            })
            .then((responsePayment) => {
                router.replace(responsePayment.data.redirectUrl);
            })
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [totalPrice, totalPeople, listing.cancellationPolicy, startDate, endDate, listing.id, router, currentUser, loginModal]);

    useEffect(() => {
        setTotalPrice(totalPeople*price);
    }, [totalPeople, price]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <PaymentConfirmation onSubmit={onCreateReservation} dateValue={new Date(startDate ?? '')} listing={listing} disabled={isLoading} price={price} totalPrice={totalPrice}
                totalPeople={totalPeople} onChangePeople={(value: number) => setTotalPeople(value)}/>
            </div>
        </Container>
    );
}

export default PaymentClient;