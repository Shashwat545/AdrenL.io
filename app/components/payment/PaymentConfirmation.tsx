'use client';

import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/app/components/shadcn/Card";
import Button from "@/app/components/Button";

export default function Component() {
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
                <span>Item Name:</span>
                <span className="font-medium">Item 1</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Quantity:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Price:</span>
                <span className="font-medium">$100.00</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-medium">$200.00</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Tax:</span>
                <span className="font-medium">$40.00</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Total:</span>
                <span className="font-medium">$240.00</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Select Number of People</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <input className="p-2 border border-gray-300 rounded" min="1" type="number" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enter Discount Coupon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <input className="p-2 border border-gray-300 rounded" placeholder="Enter coupon code" type="text" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Button label="Proceed to payment" onClick={() => {}}/>
        </div>
      </main>
    </>
  )
}