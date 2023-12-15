'use client'

import HostingCard from "../components/hosting/card";

const SuperAdminPage = () => {
  return (
    
    <div className="flex flex-col h-auto ">
      <div className="text-gray-800 p-8">
        <h1 className="text-4xl font-bold">Hey there!</h1>
        <p className="text-gray-600 text-xl ml-2">You can manage almost everything that's happening on AdrenL from over here.</p>
      </div>

      <div className="pt-24 grid justify-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 bg-cover bg-center bg-no-repeat bg-[url('https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
        <HostingCard heading="Discount Coupons" redirectUrl="" subtitle="Add and remove discount coupons"/>
        <HostingCard heading="Discount Coupon Statistics" redirectUrl="" subtitle="View the usage statistics"/>
        {/* <HostingCard heading="Inbox" replaceUrl="inbox" subtitle="Check and reply to your messages"/> */}
        <HostingCard heading="Remove Listing" replaceUrl="" subtitle="Delete a listing from AdrenL"/>
      </div>
    </div>
  );
}

export default SuperAdminPage;