'use client';

import { User, Listing, Reservation, Review } from "@prisma/client";
import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip } from "@material-tailwind/react";
import Carousel from "./ListingCardCarousel";
import HeartButton from "../HeartButton";

import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";

import { format } from "date-fns";
import { FaBed, FaBriefcaseMedical, FaBus, FaHiking, FaShieldAlt, FaTicketAlt, FaUserTie, FaUsers, FaUtensils } from "react-icons/fa";

const amenitiesMapping: any = {
  adventureGear: { icon: <FaHiking />, label: 'Adventure Gear' },
  meals: { icon: <FaUtensils />, label: 'Meals' },
  transportation: { icon: <FaBus />, label: 'Transportation' },
  guide: { icon: <FaUserTie />, label: 'Guide' },
  accommodation: { icon: <FaBed />, label: 'Accommodation' },
  entranceFees: { icon: <FaTicketAlt />, label: 'Entrance Fees' },
  safety: { icon: <FaShieldAlt />, label: 'Safety' },
  group: { icon: <FaUsers />, label: 'Group' },
  insurance: { icon: <FaBriefcaseMedical />, label: 'Insurance' },
};

interface ListingCardHomeProps {
    data: Listing & {reviews: Review[]};
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: User | null | undefined;
}
   
const ListingCardHome: React.FC<ListingCardHomeProps> = ({data, reservation, onAction, disabled, actionLabel, actionId = "", currentUser}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const averageRating = (data.reviews).reduce((sum, review) => sum + review.rating, 0) / data.reviews.length;

    const price = useMemo(() => {
      if(reservation) {
          return reservation.totalPrice;
      }
      return data.price;
    }, [reservation, data.price]);

    const renderAmenityTooltips = () => {
      const displayedAmenities = data.amenities.slice(0, 4);
      const additionalCount = data.amenities.length - 4;

      return (
          <>
              {displayedAmenities.map((amenity, index) => {
                  if (amenitiesMapping[amenity]) {
                      const { icon, label } = amenitiesMapping[amenity];
                      return (
                          <Tooltip content={label} key={index}>
                              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                                  {icon}
                              </span>
                          </Tooltip>
                      );
                  }
                  return null;
              })}
              {additionalCount > 0 && (
                  <Tooltip content={`And +${additionalCount} more`}>
                      <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                          +{additionalCount}
                      </span>
                  </Tooltip>
              )}
          </>
      );
  };
    
    return (
      <Card onClick={() => router.push(`/listing/${data.id}`)} className="w-full max-w-[40rem] cursor-pointer shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <Carousel imageSrc={data.imageSrc}/>
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser}/>
          </div>
        </CardHeader>

        <CardBody className="pb-1">
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {data.title}
            </Typography>
            <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-0.5 h-5 w-5 text-yellow-700">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"/>
              </svg>
              {averageRating ? averageRating.toFixed(2) : "N/A"}
            </Typography>
          </div>
          <div className="">
            <Typography color="gray">
              {data?.cityValue}, {location?.label}
            </Typography>
          </div>
          <Typography color="black">
            {data.thrillIntensity}, {data.category}
          </Typography>
          <div className="group mt-3 inline-flex flex-wrap items-center gap-1">
            {renderAmenityTooltips()}
          </div>
        </CardBody>

        <CardFooter className="pt-1">
          <div className="flex flex-row items-end">
            <Typography  color="black" className="font-medium" variant="h4">
            ₹ {price}&nbsp;
            </Typography>
            <Typography color="gray" variant="small">
                per person
            </Typography>
          </div>
        </CardFooter>
      </Card>
    );
}

export default ListingCardHome;