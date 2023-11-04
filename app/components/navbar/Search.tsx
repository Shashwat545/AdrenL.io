'use client';

import {BiSearch} from "react-icons/bi";
import { format } from "date-fns";

import useSearchModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/useCountries";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Search = () => {
    const SearchModalHook = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const stateValue = params?.get('stateValue');
    const cityValue = params?.get('cityValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    const locationLabel = useMemo(() => {
        if(cityValue) {
            return cityValue;
        }
        if(locationValue) {
            return getByValue(locationValue as string)?.label;
        }
        return "Anywhere";
    }, [getByValue, cityValue, stateValue, locationValue]);

    const dateLabel = useMemo(() => {
        if(startDate) {
            const start = new Date(startDate);
            return `${format(start, "d")} ${format(start, "MMM")}`;
        }
        return "Any Day";
    }, [startDate]);

    const guestLabel = useMemo(() => {
        if(guestCount) {
            return `${guestCount} Persons`;
        }
        return "Add People";
    }, [guestCount]);

    return (
        <div onClick={SearchModalHook.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-sm transition cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {dateLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">
                        {guestLabel}
                    </div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;