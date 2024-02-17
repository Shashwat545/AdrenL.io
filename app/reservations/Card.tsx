"use client";

import { User, Listing, Reservation } from "@prisma/client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";

import { format } from "date-fns";
import Button from "../components/Button";
import HeartButton from "../components/HeartButton";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation & {user: User};
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  disabled?: boolean;
  confirmActionLabel?: string;
  cancelActionLabel?: string;
  actionId?: string;
  currentUser?: User | null | undefined;
}

const ReservationCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onConfirm,
  onCancel,
  disabled,
  confirmActionLabel,
  cancelActionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onCancel?.(actionId);
    },
    [onCancel, actionId, disabled]
  );

  const handleConfirm = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onConfirm?.(actionId);
    },
    [onConfirm, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    return `${format(start, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => {}}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc[0]}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          
        </div>
        <div className="font-semibold">{data.title}</div>
        <div className="font-light text-neutral-500">
          {reservationDate}
        </div>
        <div className="font-semibold ">
          {reservation?.user?.name}
        </div>
        <div className="font-semibold">
          {reservation?.numberOfPeople} {reservation?.numberOfPeople==1 ? "person" : "people"}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">₹ {price}/-</div>
          {!reservation && <div className="font-light">per person</div>}
        </div>
        {reservation?.isConfirmed === "pending" && (
          <>
            {onConfirm && confirmActionLabel && (
              <Button
                disabled={disabled}
                small
                label={confirmActionLabel}
                onClick={handleConfirm}
                outline
              />
            )}
            {onCancel && cancelActionLabel && (
              <Button
                disabled={disabled}
                small
                label={cancelActionLabel}
                onClick={handleCancel}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
