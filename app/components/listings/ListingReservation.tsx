'use client';

import { User } from "@prisma/client";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
    host: User | null | undefined;
    user: User | null | undefined;
    price: number;
    dateValue: Date;
    totalPrice: number;
    onChangeDate: (value: Date) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({ host, user, price, dateValue, totalPrice, onChangeDate, onSubmit, disabled, disabledDates }) => {
    const compareUserToHost = (host?.id === user?.id);
    const isTakingReservation = !(host?.isTakingReservation);
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    ₹ {totalPrice}
                </div>
                <div className="font-light text-neutral-600">
                    per person
                </div>
            </div>
            <hr />
            <Calendar value={dateValue} disabledDates={disabledDates} onChange={(value) => onChangeDate(value)}/>
            <hr />
            <div className="p-4">
                <Button loading={!compareUserToHost} disabled={(isTakingReservation || compareUserToHost || disabled)} label="Reserve" onClick={onSubmit}/>
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>
                    Total
                </div>
                <div>
                    ₹ {totalPrice}
                </div>
            </div>
        </div>
    );
}

export default ListingReservation;