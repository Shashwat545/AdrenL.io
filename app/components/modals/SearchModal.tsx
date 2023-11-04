'use client';

import Modal from "./Modal";
import Heading from "../Heading";
import LocationSelect from "../inputs/LocationSelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";
import { Range } from "react-date-range";
import { CountrySelectValue, StateSelectValue, CitySelectValue } from "../inputs/LocationSelect";

import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback } from "react";

enum STEPS {
   LOCATION = 0,
   DATE = 1,
   INFO = 2 
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const SearchModalHook = useSearchModal();

    const [step, setStep] = useState(0);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [stateValue, setStateValue] = useState<StateSelectValue>();
    const [cityValue, setCityValue] = useState<CitySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [location, stateValue, cityValue]);

    const onBack = useCallback(() => {
        setStep((value) => value-1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value+1);
    }, []);

    const onSubmit = useCallback(async () => {
        if(step !== STEPS.INFO) {
            return onNext();
        }
        let currentQuery = {};
        if(params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            stateValue: stateValue?.value,
            cityValue: cityValue?.label,
            guestCount
        };
        if(dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if(dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });
        setStep(STEPS.LOCATION);
        SearchModalHook.onClose();
        router.push(url);
    }, [step, SearchModalHook, location, router, guestCount, dateRange, onNext, params]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO) {
            return "Search";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which place do you wanna explore?" subtitle="Find the perfect adventure!"/>
            <LocationSelect value={location} stateValue={stateValue} cityValue={cityValue} onChange={(value) => setLocation(value as CountrySelectValue)}
            onStateChange={(value) => setStateValue(value as StateSelectValue)} onCityChange={(value) => setCityValue(value as CitySelectValue)}/>
            <hr />
            <Map center={cityValue?.latlng || stateValue?.latlng || location?.latlng} zoom={(cityValue && 8) || (stateValue && 6)}/>
        </div>
    );

    if(step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!"/>
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)}/>
            </div>
        );
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="More information" subtitle="Find your perfect adventure!"/>
                <Counter title="Guests" subtitle="How many guests are coming?" value={guestCount} onChange={(value) => setGuestCount(value)}/>
            </div>
        );
    }

    return (
        <Modal isOpen={SearchModalHook.isOpen} onClose={SearchModalHook.onClose} onSubmit={onSubmit} title="Filters" 
        actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.LOCATION? undefined: onBack} body={bodyContent}/>
    );
}

export default SearchModal;