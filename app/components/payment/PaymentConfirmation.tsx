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
  couponApplied: boolean;
  coupon: string;
  onChangeCoupon: (value: string) => void;
  onCouponSubmit: () => void;
  percentageOff: number;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({onSubmit, dateValue, listing, disabled, price, totalPrice, totalPeople, onChangePeople, 
couponApplied, coupon, onChangeCoupon, onCouponSubmit, percentageOff }) => {
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
              <CardTitle>Number of People</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 mr-4">
                  <input type="range" id="numberSlider" name="numberSlider" min="1" max={listing.guestCount} value={totalPeople}
                  onChange={(e) => onChangePeople(Number(e.target.value))} className="" />
                </div>
                <span className="font-medium">{totalPeople} {totalPeople > 1 ? 'People' : 'Person'}</span>
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
                <span className="font-medium">₹{price*(1-(percentageOff/100))}.00</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Number of people:</span>
                <span className="font-medium">{totalPeople}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Total:</span>
                <span className="font-bold">₹{totalPrice}.00</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Apply Coupon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
              <input className="p-2 border border-gray-300 rounded mr-2" placeholder="Enter coupon code" type="text"
              value={coupon} onChange={(e) => onChangeCoupon(e.target.value)} />
              <Button label="Apply" onClick={onCouponSubmit} disabled={couponApplied || !coupon}/>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Button loading disabled={disabled} label="Proceed to payment" onClick={onSubmit}/>
        </div>
      </main>
    </>
  )
}

export default PaymentConfirmation;