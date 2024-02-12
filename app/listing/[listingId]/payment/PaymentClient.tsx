'use client';

import { User, Listing, FuturePricing, DiscountCoupons } from "@prisma/client";
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
    allDiscountCoupons: DiscountCoupons[];
}

interface DateAndPriceObject {
    date: Date;
    price: number;
}

const PaymentClient: React.FC<PaymentClientProps> = ({ currentUser, listing, futurePrices, allDiscountCoupons }) => {
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
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [percentageOff, setPercentageOff] = useState(0);

    const handleCouponSubmit = async () => {
        const couponExists = allDiscountCoupons.some(c => c.coupon === coupon);
        if (!couponExists) {
            toast.error("Coupon code is invalid or does not exist.");
            return;
        }
        try {
            const response = await axios.post('/api/coupon', { coupon, userId: currentUser?.id });
            if (response.status === 200) {
                toast.success(`Coupon Applied: ${response.data.percentageOff} % off`);
                setCouponApplied(true);
                setPercentageOff(response.data.percentageOff);
            } else if (response.status === 218) {
                toast.error('This coupon has reached its maximum usage limit.');
            } else {
                
                toast.error(`Failed to Apply Coupon`);
            }
        } catch (error: any) {
            toast.error(`Error applying coupon ${error}`);
        }
    };

    const onCreateReservation = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post(`/api/reservations`, {
            listingId: listing.id,
            discountApplied: couponApplied,
            discountCoupon: couponApplied ? coupon : "NA",
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
    }, [totalPrice, totalPeople, couponApplied, coupon, listing.cancellationPolicy, startDate, endDate, listing.id, router, currentUser, loginModal]);

    useEffect(() => {
        setTotalPrice(totalPeople*price*(1 - (percentageOff/100)));
    }, [totalPeople, price, percentageOff]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <PaymentConfirmation onSubmit={onCreateReservation} dateValue={new Date(startDate ?? '')} listing={listing} disabled={isLoading} price={price} totalPrice={totalPrice}
                totalPeople={totalPeople} onChangePeople={(value: number) => setTotalPeople(value)} couponApplied={couponApplied}
                coupon={coupon} onChangeCoupon={(value: string) => setCoupon(value)} onCouponSubmit={handleCouponSubmit}
                percentageOff={percentageOff}/>
            </div>
        </Container>
    );
}

export default PaymentClient;