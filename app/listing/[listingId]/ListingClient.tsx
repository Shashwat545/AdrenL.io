"use client";

import {
  User,
  Listing,
  PausedDates,
  Review,
  FuturePricing,
} from "@prisma/client";

import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ReviewClient from "@/app/components/Review/ReviewClient";

import axios from "axios";
import qs from "query-string";
import { formatISO, eachDayOfInterval, format } from "date-fns";
import { toast } from "react-hot-toast";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

interface ListingClientProps {
  currentUser: User | null;
  listing: Listing & { user: User };
  pausedDates: PausedDates[];
  reviews: (Review & {user: User})[];
  futurePrices: FuturePricing[];
}

interface DateAndPriceObject {
  date: Date;
  price: number;
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  listing,
  pausedDates,
  reviews,
  futurePrices,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    if (!listing.user?.isTakingReservation) {
      toast.error("The adventure is currently not taking reservations!");
    }
  }, []);

  const dynamicPrices = useMemo(() => {
    let datesAndPrices: DateAndPriceObject[] = [];
    futurePrices.forEach((futurePrice) => {
      const range = eachDayOfInterval({
        start: new Date(futurePrice.startDate),
        end: new Date(futurePrice.endDate),
      });
      range.forEach((date) => {
        datesAndPrices.push({
          date: date,
          price: futurePrice.dynamicPrice,
        });
      });
    });
    return datesAndPrices;
  }, [futurePrices]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    pausedDates.forEach((pausedDate) => {
      if (pausedDate.paused == true) {
        dates = [...dates, pausedDate.startDate];
      }
    });
    return dates;
  }, [pausedDates]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateValue, setDateValue] = useState<Date>(new Date());

  const onCreateEnquiry = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    axios
      .post("/api/conversations", { userId: listing.userId })
      .then(({data}) => {
        console.log(data.id);
        router.push(`/inbox/${data.id}`);
      });
  }, []);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/conversations", { userId: listing.userId })
      .then(() => {
        const query: any = {
          startDate: formatISO(dateValue),
          endDate: formatISO(dateValue),
        };
        setDateValue(new Date());
        const url = qs.stringifyUrl(
          {
            url: `/listing/${listing.id}/payment`,
            query: query,
          },
          { skipNull: true }
        );
        router.push(url);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dateValue, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    const futurePriceObject = dynamicPrices.find(
      (item) =>
        format(item.date, "yyyy-MM-dd") === format(dateValue, "yyyy-MM-dd")
    );
    setTotalPrice(futurePriceObject ? futurePriceObject.price : listing.price);
  }, [listing.user, listing.price, dynamicPrices, dateValue]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalRatings = reviews.length;

  const compareUserToHost = (listing.user.id === currentUser?.id);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            listing={listing}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              listing={listing}
              user={listing.user}
              compareUserToHost={compareUserToHost}
              category={category}
              description={listing.description}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
              onSubmit={onCreateEnquiry}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                host={listing.user}
                user={currentUser}
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateValue(value)}
                dateValue={dateValue}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
            {reviews.length == 0 ? (
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  No Ratings Yet
                </p>
                <p className="text-gray-600 text-sm">
                  Be the first to leave a rating!
                </p>
              </div>
            ) : (
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {averageRating.toFixed(1)}{" "}
                  <span className="text-gray-500">/ 5.0</span>
                </p>
                <p className="text-gray-600 text-sm">Average Rating</p>
                <p className="text-gray-600 text-sm mt-2">
                  Based on {totalRatings} reviews
                </p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10 mt-6">
            <ReviewClient reviews={reviews} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
