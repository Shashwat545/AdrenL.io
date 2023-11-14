"use client"
import React from "react";
import HostingCard from "../components/hosting/card";

interface SellerPageProps {
  heading: string;
}

export default function SellerPage() {
  return (
    
    <div className="flex flex-col h-screen ">
    <div className="text-gray-800 p-8">
      <h1 className="text-4xl font-bold">Welcome back!</h1>
      <p className="text-gray-600 text-xl ml-2">Customize your adventures</p>
    </div>

    <div className="flex flex-col justify-evenly items-center md:flex-row h-64 md:h-96 lg:h-128 bg-cover bg-center bg-no-repeat justify-content  bg-[url('https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <HostingCard heading="Instant Switch" redirectUrl="instant-switch" />
      <HostingCard heading="Cancellation Policy" redirectUrl="cancellationPolicy" />
      <HostingCard heading="Promotions" redirectUrl="" />
      <HostingCard heading="Calendar Settings" redirectUrl="" />
    </div>
  </div>
  );
}
