'use client';

import { Calendar as ReactCalendar } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
    value: Date;
    onChange: (value: Date) => void;
    disabledDates?: Date[]
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange, disabledDates }) => {
    return (
        <ReactCalendar color="#262626" date={value} onChange={onChange}
        direction="vertical" showDateDisplay={false} minDate={new Date()} disabledDates={disabledDates}/>
    );
}

export default Calendar;