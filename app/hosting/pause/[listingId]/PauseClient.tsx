'use client';

import { User, Listing, PausedDates } from "@prisma/client";
import Container from "@/app/components/Container";
import CalendarHostOverall from "@/app/components/hosting/pause/CalendarHostOverall";
import axios from "axios";
import toast from "react-hot-toast";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";

interface PauseClientProps {
    currentUser?: User | null;
    listing: Listing & {user: User};
    pausedDates: PausedDates[];
}

interface DateAndPausedObject {
    date: Date;
    paused: boolean;
}

const PauseClient: React.FC<PauseClientProps> = ({ currentUser, listing, pausedDates }) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const pausedFutureDates = useMemo(() => {
        let datesAndPaused: DateAndPausedObject[] = [];
        pausedDates.forEach((pausedDate) => {
                datesAndPaused.push({
                    date: pausedDate.startDate,
                    paused: pausedDate.paused
                });
        });
        return datesAndPaused;
    }, [pausedDates]);

    const [isLoading, setIsLoading] = useState(false);
    const [dateValue, setDateValue] = useState<Date>(new Date());

    const onSubmit = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/hosting/pause', {
            startDate: dateValue,
            listingId: listing?.id
        })
        .then(() => {
            toast.success("Listing status updated on selected date.");
            setDateValue(new Date());
            router.refresh();
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [dateValue, listing?.id, router, currentUser, loginModal]);
    
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <CalendarHostOverall value={dateValue} onChangeDate={(value) => setDateValue(value)}
                     onSubmit={onSubmit} disabled={isLoading} pausedDates={pausedFutureDates}/>
                </div>
            </div>
        </Container>
    );
};

export default PauseClient;