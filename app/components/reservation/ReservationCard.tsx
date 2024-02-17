'use client';

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/app/components/shadcn/Card";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listing, Reservation, Transaction, User } from "@prisma/client";
import { format } from "date-fns";

interface ReservationCardProps {
  reservation: Reservation;
  currentUser: User;
  listing: Listing & {user: User};
  transaction: Transaction;
}

const ReservationCard: React.FC<ReservationCardProps> = ({reservation, currentUser, listing, transaction}) => {
  const router = useRouter();

  const renderPaymentStatus = () => {
    if (transaction.status === "PAYMENT_SUCCESS") {
      return (
        <div className={`inline-flex items-center rounded-full bg-green-300 border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80`}>
          Payment successful
        </div>
      );
    } else if (transaction.status == "" || transaction.status == "PAYMENT_PENDING" || transaction.status == "INTERNAL_SERVER_ERROR") {
      return (
        <div className={`inline-flex items-center rounded-full bg-yellow-300 border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80`}>
          Payment Processing...
        </div>
      );
    } else {
      return (
        <div className={`inline-flex items-center rounded-full bg-red-400 border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80`}>
          {transaction.status}
        </div>
      );
    }
  };

  return (
    <main className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
          <div className="aspect-square w-12 relative overflow-hidden rounded-xl">
            <Image fill alt="Reservation" src={listing.imageSrc[0]} className="object-cover"/>
          </div>
            <div>
              <CardTitle>{listing.title}</CardTitle>
              <CardDescription>Hosted by: {listing.user.name}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">Reservation Date: {format(reservation.startDate, 'eee do MMM, yyyy')}</p>
          <p className="text-sm">Number of Persons: {reservation.numberOfPeople}</p>
          <p className="text-sm">Total Cost: ₹{reservation.totalPrice}.00</p>
          <p className="text-sm">
            <div className="pt-3">
              {renderPaymentStatus()}
            </div>
          </p>
        </CardContent>
        <CardFooter>
          <div onClick={() => router.push(`/trips/${reservation.id}`)}>
            <Link className="text-blue-500 hover:text-blue-700" href="#">
              View Details
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

export default ReservationCard;