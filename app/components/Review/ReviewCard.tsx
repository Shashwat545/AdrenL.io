"use client";

import { Review, User } from "@prisma/client";
import Avatar from "../Avatar";
import { Rating } from "@material-tailwind/react";

interface ReviewIncludesUserProps extends Review{
  user: User
}

interface Props {
    review : ReviewIncludesUserProps;
    formatPostedTime: Function;
}

export default function ReviewCard({review, formatPostedTime}:Props){
 return (
    <div className="col-span-6" key={review.id}>
          <div className="max-w-lg bg-white p-2 rounded-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full mr-4">
                <Avatar src={review.user.image} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{review.user.name}</h2>
                <p className="text-gray-500">
                  <Rating value={review.rating} readonly />
                </p>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-800 mb-4">{review.comment}</p>

            {/* Time of Review */}
            <p className="text-gray-500 text-sm">
              Posted {formatPostedTime(review.createdAt)}
            </p>
          </div>
          <hr />
        </div>
 )
}