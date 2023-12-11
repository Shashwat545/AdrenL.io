'use client';

import { User, Listing, FuturePricing } from "@prisma/client";
import { Range } from "react-date-range";
import Container from "@/app/components/Container";
import CalendarHostOverall from "@/app/components/hosting/calendar/CalendarHostOverall";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface CalendarClientProps {
    currentUser?: User | null;
    listing: Listing & {user: User};
    futurePrices: FuturePricing[];
}

interface DateAndPriceObject {
    date: Date;
    price: number;
}

const CalendarClient: React.FC<CalendarClientProps> = ({ currentUser, listing, futurePrices }) => {
    const loginModal = useLoginModal();
    const router = useRouter();

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

    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const { register, handleSubmit, formState: {errors, }, reset} = useForm<FieldValues> ({
        defaultValues: {
            priceBox: listing.price
        }
    });

    const onUpdateFuturePricing: SubmitHandler<FieldValues> = useCallback((data) => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/hosting/calendar', {
            ...data,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success("Pricing updated!");
            setDateRange(initialDateRange);
            reset();
            router.refresh();
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [dateRange, listing?.id, router, currentUser, loginModal]);
    
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <CalendarHostOverall price={listing.price} onChangeDate={(value) => setDateRange(value)}
                    dateRange={dateRange} onSubmit={onUpdateFuturePricing} disabled={isLoading} futurePrices={dynamicPrices}
                    register={register} errors={errors} handleSubmit={handleSubmit}/>
                </div>
            </div>
        </Container>
    );
};

export default CalendarClient;