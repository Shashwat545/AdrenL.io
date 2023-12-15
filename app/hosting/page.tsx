'use client'

import HostingCard from "../components/hosting/card";

const SellerPage = () => {
  return (
    
    <div className="flex flex-col h-auto ">
      <div className="text-gray-800 p-8">
        <h1 className="text-4xl font-bold">Welcome back!</h1>
        <p className="text-gray-600 text-xl ml-2">Customize your adventures</p>
      </div>

      <div className="pt-24 grid justify-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <HostingCard heading="My Account" redirectUrl="" subtitle="View and manage your profile"/>
        <HostingCard heading="Calendar" redirectUrl="calendar" subtitle="Manage prices for upcoming dates on your listings"/>
        <HostingCard heading="Listing Status" redirectUrl="instant-switch" subtitle="Start / Stop taking reservations for your listings"/>
        <HostingCard heading="Cancellation Policy" redirectUrl="cancellationPolicy" subtitle="Change cancellation policies for your listings"/>
        <HostingCard heading="Inbox" replaceUrl="inbox" subtitle="Check and reply to your messages"/>
        <HostingCard heading="Remove Listing" replaceUrl="adventures" subtitle="Delete your listing from AdrenL"/>
        <HostingCard heading="Accept / Reject Booking Requests" redirectUrl="" subtitle="Accept or reject requests for bookings on your adventures"/>
      </div>
    </div>
  );
}

export default SellerPage;