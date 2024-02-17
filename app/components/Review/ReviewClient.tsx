'use client';

import { useState } from "react";
import { Review, User } from "@prisma/client";
import Button from "../Button";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import { differenceInDays } from "date-fns";

interface ReviewClientProps {
    reviews: (Review & {user: User})[];
}

const ReviewClient: React.FC<ReviewClientProps> = ({ reviews }) => {
    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    const formatPostedTime = (postedDate: Date) => {
        const currentDate: Date = new Date();
        const daysDifference: number = differenceInDays(currentDate, postedDate);
        if (daysDifference == 0) {
            return `today`;
        }
        else if (daysDifference < 30) {
            return `${daysDifference} days ago`;
        } else if (daysDifference < 365) {
            const monthsDifference: number = Math.floor(daysDifference / 30);
            return `${monthsDifference} months ago`;
        } else {
            const yearsDifference: number = Math.floor(daysDifference / 365);
            return `${yearsDifference} years ago`;
        }
    };

    const showMoreButton = reviews.length > 4;

    return (
        <>
            {reviews.slice(0, 4).map((review) => (
                <ReviewCard key={review.id} review={review} formatPostedTime={formatPostedTime} />
            ))}
            {showMoreButton && (
                <div className="col-span-3">
                    <Button label="Show more reviews" onClick={()=>{setReviewModalOpen(true)}}/>
                </div>
            )}
            <ReviewModal isModalOpen={reviewModalOpen} setIsModalOpen={(value: boolean) => setReviewModalOpen(value)}
            reviews={reviews} formatPostedTime={formatPostedTime}/>
        </>
    );
};

export default ReviewClient;