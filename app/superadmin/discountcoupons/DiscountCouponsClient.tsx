'use client';

import { User, DiscountCoupons } from "@prisma/client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Button from "@/app/components/Button";

interface CalendarClientProps {
    currentUser?: User | null;
    allDiscountCoupons?: DiscountCoupons[];
}

const CalendarClient: React.FC<CalendarClientProps> = ({ currentUser, allDiscountCoupons }) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {errors, }, reset} = useForm<FieldValues> ({
        defaultValues: {
            couponCode: "", percentageOff: 0, trackingInfo: "", maxUsability: 1
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        if(data.percentageOff <= 0 || data.percentageOff >=100) {
            return toast.error("The discount percentage needs to be within valid limits");
        }
        setIsLoading(true);
        axios.post('/api/superadmin/discountcoupons', {
            ...data
        })
        .then(() => {
            toast.success("Discount Coupon added to system");
            reset();
            router.refresh();
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [router, currentUser, loginModal]);
    
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto my-20">
            <div className="flex flex-col gap-8">
                <Heading title="Add a new coupon code to the system" subtitle="Tip: Use all capitals for coupon code, example - 'SUMMER_10'"/>
                <div className="flex flex-row gap-8">
                    <Input id="couponCode" label="Coupon Code" disabled={isLoading} register={register} errors={errors} required/>
                    <Input id="percentageOff" label="Percentage discount" formatPercentage type="number" disabled={isLoading} register={register} errors={errors} required/>
                </div>
                <div className="flex flex-row gap-8">
                    <Input id="trackingInfo" label="Tracking Information (Can be collaborator name)" disabled={isLoading} register={register} errors={errors} required/>
                    <Input id="maxUsability" label="Max number of uses by a user" type="number" disabled={isLoading} register={register} errors={errors} required/>
                </div>
                <div className="p-4">
                    <Button disabled={isLoading} label="Add coupon code" onClick={handleSubmit(onSubmit)}/>
                </div>
                <hr />
                <div className="mt-4">
                    <Heading title="Currently active coupons" subtitle="Find the list of active coupons in the system below:"/>
                    {(allDiscountCoupons?.length == 0) ? 
                    <div className="pt-20 flex flex-row justify-center">No active coupons right now</div> :
                        allDiscountCoupons?.map((coupon, index) => {
                        return (
                            <div key={index} className="flex flex-row">
                            <div className="flex flex-col p-4">
                                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                                    <div>{index+1}.</div>
                                    <div className="text-red-400">{coupon.coupon}</div>
                                    <div className="font-light" >({coupon.percentageOff}% off)</div>
                                </div>
                                <div className="flex flex-row items-center gap-4 font-light text-neutral-500 pl-5">
                                    <div>
                                        {coupon.maxPerUser} uses at max by a single user
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 pl-10 text-orange-500">
                                Used {coupon.totalTimesUsed} times 
                            </div>
                            </div>
                        );
                        })
                    }
                </div>
            </div>
            </div>
        </Container>
    );
};

export default CalendarClient;