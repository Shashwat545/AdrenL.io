'use client';

import { User } from "@prisma/client";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
    host: User | null | undefined;
    user: User | null | undefined;
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({ host, user, price, dateRange, totalPrice, onChangeDate, onSubmit, disabled, disabledDates }) => {
    const compareUserToHost = (JSON.stringify(host) === JSON.stringify(user));

    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    ₹ {price}
                </div>
                <div className="font-light text-neutral-600">
                    per person
                </div>
            </div>
            <hr />
            <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)}/>
            <hr />
            <div className="p-4">
                <Button disabled={(compareUserToHost || disabled)} label="Reserve" onClick={onSubmit}/>
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>
                    Total
                </div>
                <div>
                    ₹ {price}
                </div>
            </div>
        </div>
    );
}

export default ListingReservation;