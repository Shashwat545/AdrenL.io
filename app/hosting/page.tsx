import { redirect } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";
import HostingCard from "../components/hosting/card";

const HostingPage = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser?.host) {
        redirect('/hosting/become-a-host');
    }

    return (
        <>
            {currentUser?.host?.isVerified ? "" : 
                <div role="alert" className="relative flex w-full px-4 py-4 text-base text-white bg-red-900 rounded-lg font-regular">
                    <div className="shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z">
                            </path>
                        </svg>
                    </div>
                    <div className="ml-3 mr-12">
                        Your listings will not be public yet. Complete your KYC to make them public.
                    </div>
                </div>
            }

            <div className="flex flex-col h-auto ">
                <div className="text-gray-800 p-8">
                    <h1 className="text-4xl font-bold">Welcome back!</h1>
                    <p className="text-gray-600 text-xl ml-2">
                        Customize your adventures
                    </p>
                </div>

                <div className="pt-24 pb-24 grid justify-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                    <HostingCard
                        heading="My Account"
                        redirectUrl={`/profile/${currentUser.id}`}
                        subtitle="View and manage your profile"
                    />
                    <HostingCard
                        heading="Complete KYC"
                        redirectUrl={`/verification-details`}
                        subtitle="Submit details like PAN Card, Aadhar Card and Bank details for verification"
                    />
                    <HostingCard
                        heading="Calendar"
                        redirectUrl="calendar"
                        subtitle="Manage prices for upcoming dates on your listings"
                    />
                    <HostingCard
                        heading="Accept / Reject Booking Requests"
                        replaceUrl="reservations"
                        subtitle="Accept or reject requests for bookings on your adventures"
                    />
                    <HostingCard
                        heading="Pause / Resume Bookings"
                        redirectUrl="pause"
                        subtitle="Pause booking requests on selected dates"
                    />
                    <HostingCard
                        heading="Cancellation Policy"
                        redirectUrl="cancellationPolicy"
                        subtitle="Choose and change cancellation policies for your listings"
                    />
                    <HostingCard
                        heading="Inbox"
                        replaceUrl="inbox"
                        subtitle="Check and reply to your messages"
                    />
                    <HostingCard
                        heading="Listing Status"
                        redirectUrl="instant-switch"
                        subtitle="Start / Stop taking reservations for your listings"
                    />
                    <HostingCard
                        heading="Remove Listing"
                        replaceUrl="adventures"
                        subtitle="Delete your listing from AdrenL"
                    />
                </div>
            </div>
        </>
    );
};

export default HostingPage;