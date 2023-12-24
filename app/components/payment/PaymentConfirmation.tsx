'use client';

import { Listing, User } from "@prisma/client";
import { CardTitle, CardHeader, CardContent, Card } from "@/app/components/shadcn/Card";
import Button from "@/app/components/Button";

import { format } from "date-fns";

interface PaymentConfirmationProps {
  onSubmit: () => void;
  dateValue: Date;
  listing: Listing & {user: User};
  disabled: boolean;
  price: number;
  totalPrice: number;
  totalPeople: number;
  onChangePeople: (value: number) => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({onSubmit, dateValue, listing, disabled, price, totalPrice, totalPeople, onChangePeople}) => {
  return (
    <>
      <main className="p-6 md:p-12">
        <h1 className="text-2xl font-semibold mb-6">Booking Confirmation</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Selected Adventure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span>Name:</span>
                <span className="font-medium">{listing.title}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Hosted By:</span>
                <span className="font-medium">{listing.user.name}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Price per person:</span>
                <span className="font-medium">₹{price}.00</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Booking Date:</span>
                <span className="font-medium">{format(dateValue, 'eee do MMM, yyyy')}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Number of Persons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <input className="p-2 border border-gray-300 rounded" min="1" type="number" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span>Price per person (after discount):</span>
                <span className="font-medium">₹{price}.00</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Number of persons:</span>
                <span className="font-medium">{totalPeople}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Total:</span>
                <span className="font-medium">₹{totalPrice}.00</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Apply Coupon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <input className="p-2 border border-gray-300 rounded" placeholder="Enter coupon code" type="text" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Button disabled={disabled} label="Proceed to payment" onClick={onSubmit}/>
        </div>
      </main>
    </>
  )
}

export default PaymentConfirmation;