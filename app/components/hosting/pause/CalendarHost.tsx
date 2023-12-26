'use client';

import { Calendar as ReactCalendar } from "react-date-range";
import { format } from 'date-fns'; 

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateAndPausedObject {
    date: Date;
    paused: boolean;
}

interface CalendarHostProps {
    value: Date;
    onChange: (value: Date) => void;
    pausedDates: DateAndPausedObject[];
}

const CalendarHost: React.FC<CalendarHostProps> = ({ value, onChange, pausedDates}) => {
    const OneFiftyDaysFromNow = new Date();
    OneFiftyDaysFromNow.setDate(new Date().getDate() + 150);

    const customDayContent = (day: Date) => {
        const pausedDateObject = pausedDates.find((item) => format(item.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));

        const pausedValue = pausedDateObject?.paused || false;
            
        return (
            <div className="px-2 py-1 rounded-full flex flex-col">
              <span className={`text-xs ml-1`}>
                {format(day, 'dd')}
              </span>
              <span className={`text-xs`} style={{color: "red"}}>
                {pausedValue ? ' (Paused)' : ''}
              </span>
              <span className={"text-xs"} style={{color: "green"}}>
                {pausedValue ? '' : ' (Live)'}
              </span>
            </div>
          );
    };

    return (
        <ReactCalendar color="#262626" date={value} onChange={onChange}
        direction="vertical" showDateDisplay={false} minDate={new Date()} disabledDay={(date) => date > OneFiftyDaysFromNow} 
        dayContentRenderer={customDayContent}/>
    );
}

export default CalendarHost;