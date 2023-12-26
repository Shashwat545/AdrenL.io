'use client';

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/app/components/shadcn/Card";
import Link from "next/link";
import Image from "next/image";
import { Listing, Reservation, Transaction, User } from "@prisma/client";
import { format } from "date-fns";

interface ReservationCardProps {
  reservation: Reservation;
  currentUser: User;
  listing: Listing & {user: User};
  transaction: Transaction;
}

const ReservationCard: React.FC<ReservationCardProps> = ({reservation, currentUser, listing, transaction}) => {
  let colorClass = "";
  if(transaction?.callback_triggered) {
    if(transaction?.status == "Payment Successful") {
      colorClass = "bg-green-300"
    } else {
      colorClass = "bg-red-400"
    }
  }

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
              {transaction?.callback_triggered && 
                <div className={`inline-flex items-center rounded-full ${colorClass} border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80`}>
                  {transaction?.status}
                </div>
              }
              {!transaction?.callback_triggered && 
                <div className={`inline-flex items-center rounded-full bg-yellow-300 border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80`}>
                  Payment Processing...
                </div>
              }
            </div>
          </p>
        </CardContent>
        <CardFooter>
          <Link className="text-blue-500 hover:text-blue-700" href="#">
            View Details
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

export default ReservationCard;