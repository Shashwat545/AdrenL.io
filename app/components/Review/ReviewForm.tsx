"use client";

import { Button, Rating } from "@material-tailwind/react";
import { StarIcon as RatedIcon } from "@heroicons/react/24/solid";
import { StarIcon as UnratedIcon } from "@heroicons/react/24/outline";
import React, { useState, FormEventHandler} from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  listingId: string;
}

export default function ReviewForm({ listingId }: Props) {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  const submitReview: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { comment, rating } = review;
    if (!rating) {
      return toast.error("Rating is missing!");
    }
    setIsPending(true);
    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({ comment, rating, listingId }),
    });

    const { error } = await res.json();

    setIsPending(false);

    if (!res.ok) {
      return toast.error(error);
    }else {
      toast.success("Review submitted successfully!");
      router.push(`/listing/${listingId}`);
    }
  };

  return (

    <form onSubmit={submitReview} className="space-y-2">
      <div className="">
        <h3 className="font-semibold text-lg mb-1">Overall Rating</h3>
        
        <Rating
          ratedIcon={<RatedIcon className="h-8 w-8" />}
          unratedIcon={<UnratedIcon className="h-8 w-8" />}
          value={review.rating}
          onChange={(rating) => setReview({ ...review, rating })}
        />
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-1">Write a written review</h3>
        <textarea
          placeholder="Write what you like or dislike about the adventure activity."
          className="w-full resize-none border p-2 rounded border-blue-gray-500 outline-blue-400 transition"
          rows={4}
          value={review.comment}
          onChange={({ target }) =>
            setReview({ ...review, comment: target.value })
          }
        />
      </div>
      <div className="text-right">
        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
