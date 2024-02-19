'use client';

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";
import { State, City } from 'country-state-city';

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

export type StateSelectValue = {
    label: string;
    value: string;
    latlng: any;
}

export type CitySelectValue = {
    label: string;
    latlng: any;
}

interface LocationSelectProps {
    value?: CountrySelectValue;
    stateValue?: StateSelectValue;
    cityValue?: CitySelectValue;
    onChange: (value: CountrySelectValue) => void;
    onStateChange: (value: StateSelectValue) => void;
    onCityChange: (value: CitySelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({value, stateValue, cityValue, onChange, onStateChange, onCityChange}) => {
    const { getAll } = useCountries();

    return (
        <div>
            <Select placeholder="Select Country"
            isClearable
            options={getAll()}
            value={value}
            onChange={(value) => onChange(value as CountrySelectValue)}
            formatOptionLabel={(option: any) => (
                <div className="flex flex-row items-center gap-3">
                    <div>{option.flag}</div>
                    <div>
                        {option.label},
                        <span className="text-neutral-500 ml-1">
                            {option.region}
                        </span>
                    </div>
                </div>
            )}
            classNames={{
                control: () => "p-3 border-2",
                input: () => "text-lg",
                option: () => "text-lg"
            }}
            theme={( theme ) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffe4e6'
                }
            })}
            />
            <br />
            {value && (
                <Select
                placeholder="Select State"
                isClearable
                options={State.getStatesOfCountry(value.value).map((state) => ({
                    value: state.isoCode,
                    label: state.name,
                    latlng: [state.latitude, state.longitude]
                }))}
                value={stateValue}
                onChange={(value) => onStateChange(value as StateSelectValue)}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg"
                }}
                theme={( theme ) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
                />
            )}
            <br />
            {value && stateValue && (
            <Select
                placeholder="Select City"
                isClearable
                options={City.getCitiesOfState(value?.value, stateValue.value).map((city) => ({
                    label: city.name,
                    latlng: [city.latitude, city.longitude]
                }))}
                value={cityValue}
                onChange={(value) => onCityChange(value as CitySelectValue)}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg"
                }}
                theme={( theme ) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
      )}
        </div>
    );
}

export default LocationSelect;