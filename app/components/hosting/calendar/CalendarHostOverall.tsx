'use client';

import { Range } from "react-date-range";
import CalendarHost from "./CalendarHost";
import Button from "../../Button";
import Input from "../../inputs/Input";
import { FieldValues, UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

interface DateAndPriceObject {
    date: Date;
    price: number;
}

interface CalendarHostOverallProps {
    price: number;
    dateRange: Range;
    onChangeDate: (value: Range) => void;
    onSubmit: (data: any) => void;
    disabled?: boolean;
    futurePrices: DateAndPriceObject[];
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    handleSubmit: UseFormHandleSubmit<FieldValues>
}

const CalendarHostOverall: React.FC<CalendarHostOverallProps> = ({ price, dateRange, onChangeDate, onSubmit, disabled, futurePrices, register, errors, handleSubmit }) => {

    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-5 p-4">
                <div>
                    <Input id="priceBox" label="New Price" formatPrice type="number" disabled={disabled} register={register} errors={errors} required/>
                </div>
                <div className="font-light text-neutral-600">
                    per person
                </div>
            </div>
            <hr />
            <CalendarHost value={dateRange} onChange={(value) => onChangeDate(value.selection)} price={price} futurePrices={futurePrices}/>
            <hr />
            <div className="p-4">
                <Button loading disabled={disabled} label="Update Pricing" onClick={handleSubmit(onSubmit)}/>
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>
                    Base Price
                </div>
                <div>
                    ₹ {price}
                </div>
            </div>
        </div>
    );
}

export default CalendarHostOverall;