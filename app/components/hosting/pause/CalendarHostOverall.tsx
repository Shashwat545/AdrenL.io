'use client';

import CalendarHost from "./CalendarHost";
import Button from "../../Button";
import Heading from "@/app/components/Heading";

interface DateAndPausedObject {
    date: Date;
    paused: boolean;
}

interface CalendarHostOverallProps {
    value: Date;
    disabled?: boolean;
    onChangeDate: (value: Date) => void;
    onSubmit: () => void;
    pausedDates: DateAndPausedObject[];
}

const CalendarHostOverall: React.FC<CalendarHostOverallProps> = ({ value, disabled, onChangeDate, onSubmit, pausedDates}) => {

    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <Heading center title="Pause / Resume Booking Requests"/>
            <hr />
            <CalendarHost value={value} onChange={(value) => onChangeDate(value)} pausedDates={pausedDates}/>
            <hr />
            <div className="p-4">
                <Button loading disabled={disabled} label="Pause / Resume" onClick={onSubmit}/>
            </div>
        </div>
    );
}

export default CalendarHostOverall;