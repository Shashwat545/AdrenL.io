'use client';

import { Separator } from "@/app/components/shadcn/Separator";
import { CardTitle, CardHeader, CardContent, Card } from "@/app/components/shadcn/Card";
import { Button } from "@/app/components/shadcn/Button";
import { Listing, RefundTransaction, Reservation, Transaction, User } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { differenceInDays } from "date-fns";

interface ReservationClientProps {
    reservation: Reservation & { listing: Listing & { user: User }; transaction: (Transaction & { refund?: RefundTransaction | null }) | null; user: User };
    currentUser: User;
}

const ReservationClient: React.FC<ReservationClientProps> = ({ reservation, currentUser }) => {
    const router = useRouter();
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = () => {
        window.print();
    };

    let statusText = "";
    if(reservation.cancelled) {
      statusText = "Booking cancelled by user.";
    } else {
      if(reservation.isConfirmed == 'confirmed') {
        statusText = "Booking confirmed by host."
      } else if (reservation.isConfirmed == 'pending') {
        statusText = "Waiting for confirmation from host.";
      } else if (reservation.isConfirmed == 'rejected') {
        statusText = "Booking rejected by host."
      }
    }

    const daysDifference: number = differenceInDays(new Date(reservation.startDate), new Date());

    const onCancel = useCallback(() => {
      if(reservation.cancelled) {
        return toast.error("Already cancelled.")
      }
      if(daysDifference <= 0) {
        return toast.error("Cancellation not possible now.")
      }
      
      let refundPercentage = 0;
      switch (reservation.cancellationPolicy) {
        case "Flexible":
          if (daysDifference >= 1) refundPercentage = 100;
          break;
        case "Moderate":
          if (daysDifference >= 2) refundPercentage = 100;
          else if (daysDifference >= 1) refundPercentage = 50;
          break;
        case "Strict":
          if (daysDifference >= 3) refundPercentage = 100;
          else if (daysDifference >= 2) refundPercentage = 50;
          break;
        case "SuperStrict":
          if (daysDifference >= 7) refundPercentage = 100;
          break;
        case "NonRefundable":
          refundPercentage = 0;
          break;
      }
      
      const refundAmount = (reservation.totalPrice * refundPercentage) / 100;
      axios.post(`/api/reservations/${reservation.id}/cancel`,{})
      .then(() => {
          toast.success("Reservation cancelled.");
          if(reservation.transaction) {
            axios.post('/api/payment/refund', {merchantUserId: reservation.transaction.userId ,merchantTransactionId: reservation.transaction.merchantTransactionId, amount: refundAmount})
            .then(() => {
              toast.success(`Refund of ₹${refundAmount} initiated.`);
            })
            .catch(() => {
              toast.error("Something went wrong in initiating refund.");
            })
          }
          router.refresh();
      })
      .catch(() => {
          toast.error("Something went wrong. Cannot process request now.");
      })
    }, [router, reservation]);

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await axios.post('/api/payment/check_status', {merchantTransactionId: reservation?.transaction?.merchantTransactionId});
        } catch (error) {
            console.error('Error checking status of Payment: ', error);
        }
      };
      if(reservation?.transaction?.status == "" || reservation?.transaction?.status == "PAYMENT_PENDING" || reservation?.transaction?.status == "INTERNAL_SERVER_ERROR") {
        fetchData();
        location.reload();
      }
    }, []);

  return (
    <div id="printable" ref={printRef} className="px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center gap-2">
          <PackageIcon className="w-6 h-6" />
          <h1 onClick={() => router.push(`/listing/${reservation.listing.id}`)} className="text-3xl font-bold tracking-tighter no-underline hover:underline cursor-pointer">{reservation.listing.title}</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">Booking Request Date</div>
            <div>{format(reservation.createdAt, 'eee do MMM, yyyy')}</div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
            <div className="flex items-center gap-2">
              <CalendarCheckIcon className="w-4 h-4" />
              <span>{statusText}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">Booking ID</div>
          <div>{reservation.id}</div>
        </div>
        <Separator />
        <Card className="w-full max-w-sm">
          <CardHeader className="bg-gray-100 dark:bg-gray-800">
            <CardTitle className="text-sm font-normal">{reservation.listing.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 grid gap-4">
            <div className="grid gap-0.5">
              <div className="font-semibold">Host Name</div>
              <div>{reservation.listing.user.name}</div>
            </div>
            <div className="grid gap-0.5">
              <div className="font-semibold">Adventure date</div>
              <div>{format(reservation.startDate, 'eee do MMM, yyyy')}</div>
            </div>
            <div className="grid gap-0.5">
              <div className="font-semibold">Number of people</div>
              <div>{reservation.numberOfPeople}</div>
            </div>
            <div className="grid gap-0.5">
              <div className="font-semibold">Location</div>
              <div>{reservation.listing.cityValue}</div>
            </div>
            <div className="grid gap-0.5">
              <div className="font-semibold">Exact Address of Adventure</div>
              <div>{reservation.listing.address}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-gray-100 dark:bg-gray-800">
            <CardTitle className="text-sm font-normal">Transaction details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 grid gap-4">
            <div className="grid gap-0.5">
              <div className="font-semibold">Name</div>
              <div>{reservation.user.name}</div>
            </div>
            <div className="grid gap-0.5">
              <div className="font-semibold">Email</div>
              <div>{reservation.user.email}</div>
            </div>
            <div className="grid gap-0.5">
              <div className="font-semibold">Total price</div>
              <div>₹{reservation.totalPrice}</div>
            </div>
            <div className="grid gap-0.5">
              <div className="font-semibold">Transaction Status</div>
              <div>{reservation?.transaction?.status ?? "No record of transaction found."}</div>
            </div>
            { reservation.transaction?.refundInitiated && (
              <div className="grid gap-0.5">
                <div className="font-semibold">Refund Status</div>
                <div>{reservation?.transaction?.refund?.status ?? "No record of refund found."}</div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button onClick={handlePrint} size="lg">Print details</Button>
          <Button onClick={() => {router.push('/contact-us')}} size="lg" variant="outline">
            Contact support
          </Button>
          <Button onClick={() => onCancel()} size="lg" variant="destructive">
            Cancel booking
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReservationClient;

function CalendarCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
}


function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}
