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
import InputTextArea from "../inputs/InputTextArea";

import { categories } from "../navbar/Categories";
import { FaWalking } from 'react-icons/fa';
import { GiRunningShoe, GiWingedSword } from 'react-icons/gi';
import { FaHiking, FaUtensils, FaBus, FaUserTie, FaBed, FaTicketAlt, FaShieldAlt, FaUsers, FaBriefcaseMedical } from 'react-icons/fa';

enum STEPS {
    CATEGORY=0,
    THRILL=1,
    LOCATION=2,
    INFO=3,
    IMAGES=4,
    DESCRIPTION=5,
    AMENITIES=6,
    PRICE=7
}

const HostModal = () => {
    const HostModalHook=useHostModal();
    const router = useRouter();
    const [step, setStep]=useState(0);
    const [isLoading, setIsLoading]=useState(false);

    const { register, handleSubmit, setValue, watch, formState: {errors, }, reset} = useForm<FieldValues> ({
        defaultValues: {
            category: '', thrillIntensity: '', address: '', location: null, stateValue: null, cityValue: null, guestCount: 1, imageSrc: [], price: 1500, title: '', description: '',
            amenities: {
                adventureGear: false,
                meals: false,
                transportation: false,
                guide: false,
                accommodation: false,
                entranceFees: false,
                safety: false,
                group: false,
                insurance: false,
            },
        }
    });

    const category = watch("category");
    const thrillIntensity = watch("thrillIntensity");
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

    const toggleAmenity = (amenityName: any) => {
        setValue(`amenities.${amenityName}`, !watch(`amenities.${amenityName}`), { shouldValidate: true });
    };

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

        if(data.price <1500) {
            return toast.error("The listing price needs to be above ₹1500");
        }

        if(data.category == '') {
            return toast.error("Category not selected. Please go back and select one.");
        }
        if(data.thrillIntensity == '') {
            return toast.error("Thrill Intensity not selected. Please go back and select one.");
        }
        if(data.address == '') {
            return toast.error("Exact Address not provided. Please go back and do so.")
        }
        if(data.location == null) {
            return toast.error("Country not selected. Please go back and select one.");
        }
        if(data.stateValue == null) {
            return toast.error("State not selected. Please go back and select one.");
        }
        if(data.cityValue == null) {
            return toast.error("City not selected. Please go back and select one.");
        }
        if(data.imageSrc.length == 0) {
            return toast.error("Please upload atleast one photo of adventure to continue");
        }
        if(data.title == '') {
            return toast.error("Title of adventure not provided. Please go back and do so.");
        }
        if(data.description == '') {
            return toast.error("Description of adventure not provided. Please go back and do so.");
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Listing created!");
            router.refresh();
            reset();
            setStep(0);
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
        if(step === 0) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your adventure?" subtitle="Define Your Adventure&apos;s Domain: Is your adventure rooted in the earth&apos;s diverse landscapes, soaring through the boundless skies, or navigating the captivating waters? Select the right category to showcase your experience in its elemental essence"/>
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

    if(step === STEPS.THRILL) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Select the thrill intensity of your adventure." subtitle="Choose the Thrill Level of Your Adventure: From serene explorations to heart-pounding escapades, accurately categorize your adventure&apos;s intensity to match the spirit of thrill-seekers everywhere."/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    <div className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('thrillIntensity', category)} selected={thrillIntensity === "Low Intensity"}
                        label="Low Intensity" icon={FaWalking}/>
                    </div>
                    <div className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('thrillIntensity', category)} selected={thrillIntensity === "Moderate Intensity"}
                        label="Moderate Intensity" icon={FaHiking}/>
                    </div>
                    <div className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('thrillIntensity', category)} selected={thrillIntensity === "Extreme Intensity"}
                        label="Extreme Intensity" icon={GiWingedSword}/>
                    </div>
                </div>
            </div>
        );
    }

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
                <Heading title="Share some basics about your adventure" subtitle="Tailor Your Adventure&apos;s Capacity: Every adventure has its ideal number of participants for maximizing enjoyment and ensuring personal attention. Consider the nature of your experience, the level of interaction required, and safety guidelines to select the perfect group size for your offering"/>
                <Counter title="Guests" subtitle="Select maximum guests you allow per booking" value={guestCount} onChange={(value) => setCustomValue('guestCount', value)}/>
                <Heading title="Exact address where customers should reach" subtitle="The starting point of any great adventure is finding where it begins. Provide an exact address to ensure adventurers can locate your experience without a hitch. Whether nestled in hidden valleys, perched atop soaring cliffs, or tucked away on a secluded beach, the right directions are the key to unlocking an unforgettable journey. Include landmarks, detailed directions, and any tips that might help adventurers embark smoothly on their experience."/>
                <Input id="address" label="Exact Address" disabled={isLoading} register={register} errors={errors} required/>
            </div>
        );
    }

    if(step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add up to 5 photos of your adventure" subtitle="Bring Your Adventure to Life with Vivid Imagery: A picture is worth a thousand words, and in the world of adventure, it&apos;s the gateway to stirring the wanderlust in every explorer&apos;s heart. Upload photos that capture the essence, excitement, and unique atmosphere of your experiences. From the breathtaking views at the peak of a hike, the exhilarating moments of a rapid descent, to the serene beauty of a sunset paddle, let your photos speak directly to the adventurous spirit of your future guests. Show them not just what they will do, but how they will feel. Your visuals are your invitation to the world – make it irresistible."/>
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
                <Heading title="How would you describe your adventure?" subtitle="Tell the Story of Your Adventure: Every adventure has a tale waiting to be told, from the whisper of ancient forests to the roar of ocean waves. How does yours begin? Share the narrative of your experience, painting a vivid picture that captures the heart, thrills, and soul of your offering. Describe the journey, the landscapes, the challenges, and the triumphs. What makes your adventure unique? How will it transform those who embark on it? Share the essence, the moments of awe, and the spirit of discovery that await your guests. Let your words craft the path that leads adventurers straight to your experience."/>
                <Input id="title" label="Title of your adventure" disabled={isLoading} register={register} errors={errors} required/>
                <hr />
                <InputTextArea id="description" label="Description" disabled={isLoading} register={register} errors={errors} required/>
            </div>
        );
    }

    if (step === STEPS.AMENITIES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="What amenities do you offer?" subtitle={`• Adventure Gear: Choose this icon if you provide essential equipment like helmets, harnesses, or ropes, ensuring your guests are well-equipped for the adventure ahead.
                    • Meals: Select this icon if your adventure includes meals, whether it's energizing packed lunches or delightful cooked meals at a scenic campsite.
                    • Transportation: Opt for this icon if your package includes transportation, offering ease of travel with pick-up and drop-off services.
                    • Guide: Highlight this icon if your adventure is enriched with the expertise of guides or instructors, offering insights and enhancing safety.
                    • Accommodation: Choose this if you offer overnight stays, from camping under the stars to comfortable lodges or cabins.
                    • Entrance Fees: Select this icon if your package covers any fees or permits needed for accessing exclusive areas or attractions.
                    • Safety: Opt for this icon to showcase the safety measures and protocols you have in place, from first aid kits to emergency communication devices.
                    • Group: Highlight this if your adventure fosters camaraderie with group activities or team-building experiences.
                    • Insurance: Choose this icon if you provide insurance coverage, adding an extra layer of reassurance for your adventurers.
                    Your careful selection of amenities will guide adventurers in choosing the experience that best fits their needs and expectations, ensuring a memorable and worry-free adventure.`}/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CategoryInput label="Adventure Gear" icon={FaHiking} onClick={() => toggleAmenity('adventureGear')} selected={watch('amenities.adventureGear')}/>
                    <CategoryInput label="Meals" icon={FaUtensils} onClick={() => toggleAmenity('meals')} selected={watch('amenities.meals')}/>
                    <CategoryInput label="Transportation" icon={FaBus} onClick={() => toggleAmenity('transportation')} selected={watch('amenities.transportation')}/>
                    <CategoryInput label="Guide" icon={FaUserTie} onClick={() => toggleAmenity('guide')} selected={watch('amenities.guide')}/>
                    <CategoryInput label="Accommodation" icon={FaBed} onClick={() => toggleAmenity('accommodation')} selected={watch('amenities.accommodation')}/>
                    <CategoryInput label="Entrance Fees" icon={FaTicketAlt} onClick={() => toggleAmenity('entranceFees')} selected={watch('amenities.entranceFees')}/>
                    <CategoryInput label="Safety" icon={FaShieldAlt} onClick={() => toggleAmenity('safety')} selected={watch('amenities.safety')}/>
                    <CategoryInput label="Group" icon={FaUsers} onClick={() => toggleAmenity('group')} selected={watch('amenities.group')}/>
                    <CategoryInput label="Insurance" icon={FaBriefcaseMedical} onClick={() => toggleAmenity('insurance')} selected={watch('amenities.insurance')}/>
                </div>
            </div>
        );
    }

    if(step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How much will charge per person?" subtitle="Share your pricing details to help adventurers budget for their dream experience with confidence."/>
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