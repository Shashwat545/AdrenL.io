import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ReviewForm from "@/app/components/Review/ReviewForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface IParams {
  listingId: string;
}

export default async function Review({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/");
  }
  const listing = await getListingById(params);

  return (
    <>
      <div className="mx-auto max-w-2xl max-h-6xl p-4 bg-white rounded-md shadow-md mt-5">
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={listing?.imageSrc[0]}
              alt={listing?.title}
              width={50}
              height={50}
              className="rounded"
            />
            <h3 className="font-semibold">{listing?.title}</h3>
          </div>
          <ReviewForm listingId={listing?.id} />
        </div>
      </div>
      <div className="w-full h-80"></div>
    </>
  );
}
