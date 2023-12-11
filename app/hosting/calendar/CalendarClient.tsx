'use client';

import { User, Listing } from "@prisma/client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

import { useRouter } from "next/navigation";

interface CalendarClientProps {
    currentUser?: User | null;
    listings: Listing[];
}

const CalendarClient: React.FC<CalendarClientProps> = ({ currentUser, listings }) => {
    const router = useRouter();

    const onUpdate = (id:string) => {
        router.push(`/hosting/calendar/${id}`)
    }
    
    return (
        <Container>
               <button
              type="button"
              onClick={()=>router.push('/hosting')}
              className="w-full flex items-center justify-center mb-6 mt-6 w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <div className="text-black">Go back</div>
            </button>
            <Heading title="Your hosted Adventures" subtitle="All your listings are displayed below. Select the listing for which you want to update the pricing for upcoming dates." />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings?.map((listing) => (
                    <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={onUpdate} 
                    disabled={false} actionLabel="Update future pricings" currentUser={currentUser}/>
                ))}
            </div>
        </Container>
    );
};

export default CalendarClient;