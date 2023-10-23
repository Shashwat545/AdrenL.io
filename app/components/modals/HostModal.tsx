'use client';

import { useState, useMemo } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import useHostModal from "@/app/hooks/useHostModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import LocationSelect from "../inputs/LocationSelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input";

import { categories } from "../navbar/Categories";

enum STEPS {
    CATEGORY=0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5
}

const HostModal = () => {
    const HostModalHook=useHostModal();
    const router = useRouter();
    const [step, setStep]=useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading]=useState(false);

    const { register, handleSubmit, setValue, watch, formState: {errors, }, reset} = useForm<FieldValues> ({
        defaultValues: {
            category: '', location: null, stateValue: null, cityValue: null, guestCount: 1, imageSrc: [], price: 1, title: '', description: ''
        }
    })

    const category = watch("category");
    const location = watch("location");
    const stateValue = watch("stateValue");
    const cityValue = watch("cityValue");
    const guestCount = watch("guestCount");
    const imageSrc = watch("imageSrc");

    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr:false}), [location, stateValue, cityValue]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value-1);
    };

    const onNext = () => {
        setStep((value) => value+1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Listing created!");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            HostModalHook.onClose();
        })
        .catch(() => {
            toast.error("Something went wrong.");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE) {
            return "Create";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your adventure?" subtitle="Pick a category"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label}
                        label={item.label} icon={item.icon}/>
                    </div>
                ))}
            </div>
        </div>
    );

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your adventure located?" subtitle="Help customers find you!"/>
                <LocationSelect value={location} stateValue={stateValue} cityValue={cityValue} onChange={(value) => setCustomValue('location', value)} onStateChange={(value) => setCustomValue('stateValue', value)} onCityChange={(value) => setCustomValue('cityValue', value)}/>
                <Map center={cityValue?.latlng || stateValue?.latlng || location?.latlng} zoom={(cityValue && 8) || (stateValue && 6)}/>
            </div>
        );
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your adventure" subtitle="What do you offer?"/>
                <Counter title="Guests" subtitle="How many guests do you allow?" value={guestCount} onChange={(value) => setCustomValue('guestCount', value)}/>
            </div>
        );
    }

    if(step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add up to 5 photos of your adventure" subtitle="Show guests what your adventure looks like!"/>
                <ImageUpload value={imageSrc[0]} onChange={(value) => setCustomValue('imageSrc[0]', value)}/>
                {imageSrc[0] && <ImageUpload value={imageSrc[1]} onChange={(value) => setCustomValue('imageSrc[1]', value)}/>}
                {imageSrc[1] && <ImageUpload value={imageSrc[2]} onChange={(value) => setCustomValue('imageSrc[2]', value)}/>}
                {imageSrc[2] && <ImageUpload value={imageSrc[3]} onChange={(value) => setCustomValue('imageSrc[3]', value)}/>}
                {imageSrc[3] && <ImageUpload value={imageSrc[4]} onChange={(value) => setCustomValue('imageSrc[4]', value)}/>}
            </div>
        );
    }

    if(step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How would you describe your adventure?" subtitle="Short and crisp works best!"/>
                <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required/>
                <hr />
                <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required/>
            </div>
        );
    }

    if(step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Now, set your price" subtitle="How much do you charge per person?"/>
                <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required/>
            </div>
        );
    }

    return (
        <Modal isOpen={HostModalHook.isOpen} onClose={HostModalHook.onClose} onSubmit={handleSubmit(onSubmit)} actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel} secondaryAction={step===STEPS.CATEGORY ? undefined : onBack} title="Host your adventure!"
        body={bodyContent}/>
    )
};

export default HostModal;