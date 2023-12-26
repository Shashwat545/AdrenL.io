"use client"
import React, { useState } from "react";
import { Review, User } from "@prisma/client";
import Avatar from "../Avatar";
import { Rating } from "@material-tailwind/react";
import Button from "../Button";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";

interface ReviewIncludesUserProps extends Review{
  user: User
}

interface Props {
  reviews: ReviewIncludesUserProps[];
}

const ReviewClient: React.FC<Props> = ({ reviews }) => {

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const formatPostedTime = (postedTime: Date) => {
    const postedDate: Date = new Date(postedTime);
    const currentDate: Date = new Date();

    const timeDifference: number = currentDate.getTime() - postedDate.getTime();
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );

    if (daysDifference < 30) {
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
        <ReviewModal isModalOpen={reviewModalOpen} setIsModalOpen={setReviewModalOpen} reviews={reviews} formatPostedTime={formatPostedTime}/>
    </>
  );
};

export default ReviewClient;
