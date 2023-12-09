'use client';

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { format } from 'date-fns'; 

import { useEffect, useState } from 'react';

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateAndPriceObject {
    date: Date;
    price: number;
}

interface CalendarHostProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    price: number;
    futurePrices: DateAndPriceObject[];
}

const CalendarHost: React.FC<CalendarHostProps> = ({ value, onChange, price, futurePrices }) => {
    const NinetyDaysFromNow = new Date();
    NinetyDaysFromNow.setDate(new Date().getDate() + 90);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const extraDotClasses = `text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl ${isMobile? 'relative' : 'absolute'}`;

    const customDayContent = (day: Date) => {
        let extraDot = null;
        const futurePriceObject = futurePrices.find((item) => format(item.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));

        extraDot = (
            <div className={extraDotClasses} style={{ fontSize: 10, top: 2, right: 2, fontWeight: "bold"}}> 
                ₹ {futurePriceObject ? futurePriceObject.price : price} /-
            </div>
        );
            
        return (
            <div>
            {extraDot}
            <span>{format(day, "d")}</span>
            </div>
        )
    };

    return (
        <DateRange rangeColors={["#262626"]} ranges={[value]} date={new Date()} onChange={onChange}
        direction="vertical" showDateDisplay={false} minDate={new Date()} disabledDay={(date) => date > NinetyDaysFromNow}
        dayContentRenderer={customDayContent}/>
    );
}

export default CalendarHost;